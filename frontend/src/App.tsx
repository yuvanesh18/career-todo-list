import React, { useState, useEffect, useCallback } from 'react';
import { api } from './services/api';
import { AnalyticsSummary, FilterState, Task, TaskStatus, ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { StatsOverview } from './components/StatsOverview';
import { KanbanBoard } from './components/KanbanBoard';
import { TaskList } from './components/TaskList';
import { AnalyticsView } from './components/AnalyticsView';
import { TaskModal } from './components/TaskModal';
import { PomodoroTimer } from './components/PomodoroTimer';
import { DailyStandupModal } from './components/DailyStandupModal';

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [currentView, setCurrentView] = useState<ViewMode>('kanban');
  const [isServerConnected, setIsServerConnected] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    priority: '',
    status: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [pomodoroTask, setPomodoroTask] = useState<Task | null>(null);
  const [isStandupOpen, setIsStandupOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = useCallback(async () => {
    const connected = await api.checkServerConnection();
    setIsServerConnected(connected);

    const fetchedTasks = await api.getTasks(filters);
    setTasks(fetchedTasks);

    const fetchedAnalytics = await api.getAnalytics();
    setAnalytics(fetchedAnalytics);
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Task actions
  const handleSaveTask = async (taskData: Partial<Task>) => {
    if (editingTask) {
      await api.updateTask(editingTask.id, taskData);
      showToast('Career goal updated successfully');
    } else {
      await api.createTask(taskData);
      showToast('New career goal added to roadmap');
    }
    setEditingTask(null);
    loadData();
  };

  const handleUpdateStatus = async (id: string, newStatus: TaskStatus) => {
    await api.updateTask(id, { status: newStatus });
    loadData();
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this career goal?')) {
      await api.deleteTask(id);
      showToast('Goal deleted');
      loadData();
    }
  };

  const handleStartPomodoro = (task: Task) => {
    setPomodoroTask(task);
    setIsPomodoroOpen(true);
  };

  const handlePomodoroSessionComplete = async (taskId: string, durationMinutes: number) => {
    await api.logPomodoro(taskId, durationMinutes);
    showToast(`Logged ${durationMinutes}m focus session! Actual hours updated.`);
    loadData();
  };

  const handleResetSeed = async () => {
    if (window.confirm('Reset database to the standard high-impact career roadmap?')) {
      await api.resetSeed();
      showToast('Restored default career development goals');
      loadData();
    }
  };

  const handleExport = () => {
    const data = api.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career-pulse-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Career data exported as JSON');
  };

  const handleImport = (jsonData: string) => {
    try {
      const count = api.importData(jsonData);
      showToast(`Successfully imported ${count} career tasks`);
      loadData();
    } catch (err: any) {
      alert(`Import failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 border border-indigo-500/40 text-indigo-300 text-xs font-semibold shadow-2xl shadow-indigo-500/20 flex items-center gap-2 animate-bounce">
          <span>✨</span> {toastMessage}
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        streakDays={analytics?.currentStreakDays || 0}
        totalActualHours={analytics?.totalActualHours || 0}
        isServerConnected={isServerConnected}
        onOpenNewTaskModal={() => {
          setEditingTask(null);
          setIsTaskModalOpen(true);
        }}
        onOpenPomodoroModal={() => {
          setPomodoroTask(null);
          setIsPomodoroOpen(true);
        }}
        onOpenStandupModal={() => setIsStandupOpen(true)}
        onResetSeed={handleResetSeed}
        onExport={handleExport}
        onImport={handleImport}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* High-level Stats bar */}
        {analytics && <StatsOverview analytics={analytics} />}

        {/* View Content */}
        {currentView === 'kanban' && (
          <KanbanBoard
            tasks={tasks}
            onUpdateStatus={handleUpdateStatus}
            onEditTask={task => {
              setEditingTask(task);
              setIsTaskModalOpen(true);
            }}
            onDeleteTask={handleDeleteTask}
            onStartPomodoroForTask={handleStartPomodoro}
          />
        )}

        {currentView === 'list' && (
          <TaskList
            tasks={tasks}
            filters={filters}
            onFilterChange={setFilters}
            onUpdateStatus={handleUpdateStatus}
            onEditTask={task => {
              setEditingTask(task);
              setIsTaskModalOpen(true);
            }}
            onDeleteTask={handleDeleteTask}
            onStartPomodoroForTask={handleStartPomodoro}
          />
        )}

        {currentView === 'analytics' && analytics && (
          <AnalyticsView analytics={analytics} tasks={tasks} />
        )}
      </main>

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />

      <PomodoroTimer
        isOpen={isPomodoroOpen}
        onClose={() => {
          setIsPomodoroOpen(false);
          setPomodoroTask(null);
        }}
        tasks={tasks}
        initialTask={pomodoroTask}
        onSessionComplete={handlePomodoroSessionComplete}
      />

      <DailyStandupModal
        isOpen={isStandupOpen}
        onClose={() => setIsStandupOpen(false)}
        tasks={tasks}
        streakDays={analytics?.currentStreakDays || 0}
        totalHours={analytics?.totalActualHours || 0}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>
          CareerPulse • Advanced Career Improvement & Goal Tracking Engine • Ready for Docker & CI/CD
        </p>
      </footer>
    </div>
  );
};

export default App;
