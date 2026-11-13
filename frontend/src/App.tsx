import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { api } from './services/api';
import { ActiveTab, DailyGroupedActivity, Goal, OverallSummary, Task, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { GoalDetailView } from './components/GoalDetailView';
import { DailyActivityView } from './components/DailyActivityView';
import { AuthModal } from './components/AuthModal';
import { LoginPage } from './components/LoginPage';
import { calculateStreak, getLocalDateString } from './utils/dateUtils';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('goals');
  const [user, setUser] = useState<UserProfile | null>(() => api.getCurrentUser());
  const [isGuest, setIsGuest] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isServerOnline, setIsServerOnline] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('goal-dsa');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [summary, setSummary] = useState<OverallSummary | null>(null);
  const [activityList, setActivityList] = useState<DailyGroupedActivity[]>([]);

  const loadData = useCallback(async () => {
    try {
      const online = await api.checkServer();
      setIsServerOnline(online);

      const fetchedGoals = await api.getGoals();
      setGoals(fetchedGoals);

      if (fetchedGoals.length > 0 && (!selectedGoalId || !fetchedGoals.some(g => g.id === selectedGoalId))) {
        setSelectedGoalId(fetchedGoals[0].id);
      }

      const fetchedTasks = await api.getTasks();
      setTasks(fetchedTasks);

      const fetchedSummary = await api.getSummary();
      setSummary(fetchedSummary);

      const fetchedActivity = await api.getDailyActivity();
      setActivityList(fetchedActivity);
    } catch (err) {
      console.warn('API fetch notice:', err);
    }
  }, [selectedGoalId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleTask = async (id: string) => {
    await api.toggleTask(id);
    loadData();
  };

  const handleDeleteTask = async (id: string) => {
    await api.deleteTask(id);
    loadData();
  };

  const handleAuthSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    setIsGuest(false);
    loadData();
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    setIsGuest(false);
    loadData();
  };

  // Accurate local calendar streak & today's count calculated directly from tasks state
  const todayStr = useMemo(() => getLocalDateString(new Date()), []);
  const accurateStreak = useMemo(() => {
    const completedDates = tasks.filter(t => t.completed && t.completedDate).map(t => t.completedDate);
    return calculateStreak(completedDates);
  }, [tasks]);

  const completedTodayCount = useMemo(() => {
    return tasks.filter(t => t.completed && t.completedDate === todayStr).length;
  }, [tasks, todayStr]);

  // If user is not logged in and hasn't chosen to explore as guest, show the dedicated LoginPage
  if (!user && !isGuest) {
    return (
      <LoginPage
        onLoginSuccess={handleAuthSuccess}
        onContinueGuest={() => setIsGuest(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        streakDays={accurateStreak}
        completedTodayCount={completedTodayCount}
        user={user}
        isServerOnline={isServerOnline}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'goals' && (
          <GoalDetailView
            goals={goals}
            selectedGoalId={selectedGoalId}
            onSelectGoal={setSelectedGoalId}
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {activeTab === 'daily-tracker' && (
          <DailyActivityView
            activityList={activityList}
            streakDays={accurateStreak}
          />
        )}
      </main>

      {/* Auth Modal (For in-dashboard quick sign in / register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>CareerPulse • Master DSA (Grind 169) & Career Roadmap Tracker</p>
      </footer>
    </div>
  );
};

export default App;
