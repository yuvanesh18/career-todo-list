import React, { useState, useEffect, useCallback } from 'react';
import { api } from './services/api';
import { ActiveTab, DailyGroupedActivity, Goal, OverallSummary, Task } from './types';
import { Navbar } from './components/Navbar';
import { GoalDetailView } from './components/GoalDetailView';
import { DailyActivityView } from './components/DailyActivityView';
import { NewGoalModal } from './components/NewGoalModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('goals');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('goal-dsa');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [summary, setSummary] = useState<OverallSummary | null>(null);
  const [activityList, setActivityList] = useState<DailyGroupedActivity[]>([]);
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);

  const loadData = useCallback(async () => {
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
  }, [selectedGoalId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleTask = async (id: string) => {
    await api.toggleTask(id);
    loadData();
  };

  const handleAddTask = async (taskData: Partial<Task>) => {
    await api.createTask(taskData);
    loadData();
  };

  const handleDeleteTask = async (id: string) => {
    await api.deleteTask(id);
    loadData();
  };

  const handleCreateGoal = async (goalData: Partial<Goal>) => {
    const newGoal = await api.createGoal(goalData);
    setSelectedGoalId(newGoal.id);
    loadData();
  };

  const handleExportBackup = async () => {
    const data = await api.backupDatabase();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career_pulse_db_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = async (jsonContent: string) => {
    try {
      const parsed = JSON.parse(jsonContent);
      await api.restoreDatabase(parsed);
      alert('Database successfully restored from backup!');
      loadData();
    } catch (err: any) {
      alert(`Failed to restore database: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        streakDays={summary?.streakDays || 0}
        completedTodayCount={summary?.completedTodayCount || 0}
        onOpenNewGoalModal={() => setIsNewGoalModalOpen(true)}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'goals' && (
          <GoalDetailView
            goals={goals}
            selectedGoalId={selectedGoalId}
            onSelectGoal={setSelectedGoalId}
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onOpenNewGoalModal={() => setIsNewGoalModalOpen(true)}
          />
        )}

        {activeTab === 'daily-tracker' && (
          <DailyActivityView
            activityList={activityList}
            streakDays={summary?.streakDays || 0}
          />
        )}
      </main>

      {/* Create New Goal Modal */}
      <NewGoalModal
        isOpen={isNewGoalModalOpen}
        onClose={() => setIsNewGoalModalOpen(false)}
        onCreateGoal={handleCreateGoal}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>CareerPulse • Master DSA (Grind 169) & Multi-Goal Daily Progress Tracker</p>
      </footer>
    </div>
  );
};

export default App;
