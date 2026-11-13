import React, { useState, useEffect, useCallback } from 'react';
import { api } from './services/api';
import { DailyLog, DashboardSummary, Goal, Task, ViewTab } from './types';
import { Navbar } from './components/Navbar';
import { GoalBanner } from './components/GoalBanner';
import { DailyTodoList } from './components/DailyTodoList';
import { DailyStatusTimeline } from './components/DailyStatusTimeline';
import { DailyStatusModal } from './components/DailyStatusModal';
import { GoalsModal } from './components/GoalsModal';

export const App: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [currentTab, setCurrentTab] = useState<ViewTab>('tasks');

  // Modals
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);

  const loadData = useCallback(async () => {
    const dash = await api.getDashboard();
    setSummary(dash);

    const allGoals = await api.getGoals();
    setGoals(allGoals);

    const activeGoalId = dash.activeGoal?.id;
    const allTasks = await api.getTasks(activeGoalId);
    setTasks(allTasks);

    const logs = await api.getDailyLogs();
    setDailyLogs(logs);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Task actions
  const handleAddTask = async (taskData: Partial<Task>) => {
    await api.createTask(taskData);
    loadData();
  };

  const handleToggleTask = async (id: string, currentCompleted: boolean) => {
    await api.updateTask(id, { completed: !currentCompleted });
    loadData();
  };

  const handleDeleteTask = async (id: string) => {
    await api.deleteTask(id);
    loadData();
  };

  // Status actions
  const handleSaveStatus = async (logData: Partial<DailyLog>) => {
    await api.recordDailyStatus(logData);
    loadData();
  };

  // Goal actions
  const handleSelectActiveGoal = async (goalId: string) => {
    await api.createGoal({ id: goalId, status: 'Active' });
    loadData();
  };

  const handleCreateGoal = async (goalData: Partial<Goal>) => {
    await api.createGoal(goalData);
    loadData();
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const existingTodayLog = dailyLogs.find(l => l.date === todayStr);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        streakDays={summary?.streakDays || 0}
        totalHours={summary?.totalHoursSpent || 0}
        todayLogged={summary?.todayLoggedStatus || false}
        onOpenStatusModal={() => setIsStatusModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Short-Term Goal Banner (Months Countdown & Status) */}
        {summary && (
          <GoalBanner
            summary={summary}
            onOpenStatusModal={() => setIsStatusModalOpen(true)}
            onOpenGoalsModal={() => setIsGoalsModalOpen(true)}
          />
        )}

        {/* Tab 1: Daily To-Do List */}
        {currentTab === 'tasks' && (
          <DailyTodoList
            tasks={tasks}
            activeGoal={summary?.activeGoal || null}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {/* Tab 2: Daily Status Journal */}
        {currentTab === 'journal' && (
          <DailyStatusTimeline
            logs={dailyLogs}
            onOpenStatusModal={() => setIsStatusModalOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <DailyStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        activeGoal={summary?.activeGoal || null}
        onSaveStatus={handleSaveStatus}
        existingTodayLog={existingTodayLog}
      />

      <GoalsModal
        isOpen={isGoalsModalOpen}
        onClose={() => setIsGoalsModalOpen(false)}
        goals={goals}
        onSelectActiveGoal={handleSelectActiveGoal}
        onCreateGoal={handleCreateGoal}
      />

      {/* Clean Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>CareerPulse • Short-Term Goal & Daily Status Tracker</p>
      </footer>
    </div>
  );
};

export default App;
