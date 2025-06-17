
import { useState, useEffect, useCallback } from 'react';

export type TimerPreset = {
  id: string;
  name: string;
  duration: number; // in minutes
  intervals: number;
};

export const defaultPresets: TimerPreset[] = [
  { id: 'preset-1', name: '30 minutes with 1 interval', duration: 30, intervals: 1 },
  { id: 'preset-2', name: '60 minutes with 2 intervals', duration: 60, intervals: 2 },
  { id: 'preset-custom', name: 'Custom', duration: 45, intervals: 1 },
];

export interface StudyTimerHook {
  currentTime: number;
  formattedTime: string;
  isRunning: boolean;
  isPaused: boolean;
  selectedPreset: TimerPreset | null;
  availablePresets: TimerPreset[];
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  selectPreset: (preset: TimerPreset) => void;
  resetTimer: () => void;
  updateCustomPreset: (duration: number, intervals: number) => void;
}

export function useStudyTimer(): StudyTimerHook {
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<TimerPreset | null>(null);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [availablePresets, setAvailablePresets] = useState<TimerPreset[]>(defaultPresets);

  // Format current time as mm:ss
  const formattedTime = useCallback(() => {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [currentTime]);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const start = useCallback(() => {
    if (!selectedPreset) return;
    
    setIsRunning(true);
    setIsPaused(false);
    setCurrentTime(0);
    
    const id = window.setInterval(() => {
      setCurrentTime(prev => prev + 1);
    }, 1000);
    
    setIntervalId(id as unknown as number);
  }, [selectedPreset]);

  const pause = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    setIsRunning(false);
    setIsPaused(true);
  }, [intervalId]);

  const resume = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    
    const id = window.setInterval(() => {
      setCurrentTime(prev => prev + 1);
    }, 1000);
    
    setIntervalId(id as unknown as number);
  }, []);

  const stop = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    setIsRunning(false);
    setIsPaused(false);
  }, [intervalId]);

  const resetTimer = useCallback(() => {
    setCurrentTime(0);
  }, []);

  const selectPreset = useCallback((preset: TimerPreset) => {
    setSelectedPreset(preset);
  }, []);

  const updateCustomPreset = useCallback((duration: number, intervals: number) => {
    const updatedPresets = availablePresets.map(preset => 
      preset.id === 'preset-custom' 
        ? { ...preset, duration, intervals } 
        : preset
    );
    
    setAvailablePresets(updatedPresets);
    
    // If custom preset is currently selected, update the selected preset too
    if (selectedPreset?.id === 'preset-custom') {
      setSelectedPreset({ ...selectedPreset, duration, intervals });
    }
  }, [availablePresets, selectedPreset]);

  return {
    currentTime,
    formattedTime: formattedTime(),
    isRunning,
    isPaused,
    selectedPreset,
    availablePresets,
    start,
    pause,
    resume,
    stop,
    selectPreset,
    resetTimer,
    updateCustomPreset,
  };
}
