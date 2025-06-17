
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { saveData, loadData } from '../lib/storage';

type TimerPreset = {
  id: string;
  name: string;
  duration: number; // in minutes
  intervals: number;
};

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

type Goal = {
  id: string;
  text: string;
  completed: boolean;
};

type Reminder = {
  id: string;
  text: string;
  time?: string;
};

type StudySession = {
  id: string;
  date: string;
  duration: number; // in seconds
  preset: string;
};

interface StudyContextType {
  // Timer state
  isRunning: boolean;
  isPaused: boolean;
  currentTime: number;
  selectedPreset: TimerPreset | null;
  totalTimeStudied: number;
  
  // Timer actions
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: () => void;
  selectPreset: (preset: TimerPreset) => void;
  
  // Todo list
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  
  // Goals
  goals: Goal[];
  addGoal: (text: string) => void;
  toggleGoal: (id: string) => void;
  deleteGoal: (id: string) => void;
  
  // Reminders
  reminders: Reminder[];
  addReminder: (text: string, time?: string) => void;
  deleteReminder: (id: string) => void;
  
  // Study history
  studySessions: StudySession[];
}

const defaultPresets: TimerPreset[] = [
  { id: 'preset-1', name: '30 minutes with 1 interval', duration: 30, intervals: 1 },
  { id: 'preset-2', name: '60 minutes with 2 intervals', duration: 60, intervals: 2 },
  { id: 'preset-custom', name: 'Custom', duration: 45, intervals: 1 },
];

export const StudyContext = createContext<StudyContextType | null>(null);

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};

interface StudyProviderProps {
  children: ReactNode;
}

export const StudyProvider: React.FC<StudyProviderProps> = ({ children }) => {
  // Timer state
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<TimerPreset | null>(null);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  const [totalTimeStudied, setTotalTimeStudied] = useState(0);
  
  // Todo, goals, reminders
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  
  // Study sessions
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  
  // Load data from storage on component mount
  useEffect(() => {
    const loadedTodos = loadData('todos') || [];
    const loadedGoals = loadData('goals') || [];
    const loadedReminders = loadData('reminders') || [];
    const loadedSessions = loadData('studySessions') || [];
    const loadedTotalTime = loadData('totalTimeStudied') || 0;
    
    setTodos(loadedTodos);
    setGoals(loadedGoals);
    setReminders(loadedReminders);
    setStudySessions(loadedSessions);
    setTotalTimeStudied(loadedTotalTime);
  }, []);
  
  // Timer functions
  const startTimer = () => {
    if (!selectedPreset) return;
    
    setIsRunning(true);
    setIsPaused(false);
    setCurrentTime(0);
    
    const interval = window.setInterval(() => {
      setCurrentTime(prevTime => prevTime + 1);
    }, 1000);
    
    setTimerInterval(interval as unknown as number);
  };
  
  const pauseTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsRunning(false);
    setIsPaused(true);
  };
  
  const resumeTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    
    const interval = window.setInterval(() => {
      setCurrentTime(prevTime => prevTime + 1);
    }, 1000);
    
    setTimerInterval(interval as unknown as number);
  };
  
  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    // Create new study session
    if (currentTime > 0 && selectedPreset) {
      const newSession: StudySession = {
        id: `session-${Date.now()}`,
        date: new Date().toISOString(),
        duration: currentTime,
        preset: selectedPreset.name,
      };
      
      const updatedSessions = [...studySessions, newSession];
      setStudySessions(updatedSessions);
      saveData('studySessions', updatedSessions);
      
      const newTotalTime = totalTimeStudied + currentTime;
      setTotalTimeStudied(newTotalTime);
      saveData('totalTimeStudied', newTotalTime);
    }
    
    setIsRunning(false);
    setIsPaused(false);
    setCurrentTime(0);
  };
  
  // Todo list functions
  const addTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: `todo-${Date.now()}`,
      text,
      completed: false,
    };
    
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveData('todos', updatedTodos);
  };
  
  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    
    setTodos(updatedTodos);
    saveData('todos', updatedTodos);
  };
  
  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveData('todos', updatedTodos);
  };
  
  // Goal functions
  const addGoal = (text: string) => {
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      text,
      completed: false,
    };
    
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    saveData('goals', updatedGoals);
  };
  
  const toggleGoal = (id: string) => {
    const updatedGoals = goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    
    setGoals(updatedGoals);
    saveData('goals', updatedGoals);
  };
  
  const deleteGoal = (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    saveData('goals', updatedGoals);
  };
  
  // Reminder functions
  const addReminder = (text: string, time?: string) => {
    const newReminder: Reminder = {
      id: `reminder-${Date.now()}`,
      text,
      time,
    };
    
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    saveData('reminders', updatedReminders);
  };
  
  const deleteReminder = (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    setReminders(updatedReminders);
    saveData('reminders', updatedReminders);
  };
  
  const selectPreset = (preset: TimerPreset) => {
    setSelectedPreset(preset);
  };
  
  const value: StudyContextType = {
    isRunning,
    isPaused,
    currentTime,
    selectedPreset,
    totalTimeStudied,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    selectPreset,
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    goals,
    addGoal,
    toggleGoal,
    deleteGoal,
    reminders,
    addReminder,
    deleteReminder,
    studySessions,
  };
  
  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
};
