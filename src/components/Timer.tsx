
import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, StopCircle, Timer as TimerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type TimerPreset = {
  id: string;
  name: string;
  duration: number; // in minutes
  intervals: number;
};

const defaultPresets: TimerPreset[] = [
  { id: 'preset-1', name: '30 minutes with 1 interval', duration: 30, intervals: 1 },
  { id: 'preset-2', name: '60 minutes with 2 intervals', duration: 60, intervals: 2 },
  { id: 'preset-custom', name: 'Custom', duration: 45, intervals: 1 },
];

const Timer: React.FC = () => {
  const { 
    isRunning, 
    isPaused, 
    currentTime, 
    startTimer, 
    pauseTimer, 
    resumeTimer, 
    stopTimer, 
    selectPreset,
    selectedPreset
  } = useStudy();

  const [customDuration, setCustomDuration] = useState(45);
  const [customIntervals, setCustomIntervals] = useState(1);
  
  // Format current time as mm:ss
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handlePresetSelect = (preset: TimerPreset) => {
    if (preset.id === 'preset-custom') {
      const customPreset = {
        ...preset,
        duration: customDuration,
        intervals: customIntervals,
      };
      selectPreset(customPreset);
    } else {
      selectPreset(preset);
    }
  };
  
  return (
    <Card className="bg-white shadow-md rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <TimerIcon className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Study Timer</h2>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="timer-display mb-8">{formatTime(currentTime)}</div>
          
          <div className="flex gap-4 mb-8">
            {!isRunning && !isPaused && (
              <Button 
                onClick={startTimer} 
                className="bg-primary hover:bg-primary/90"
                disabled={!selectedPreset}
              >
                <Play className="mr-2 h-4 w-4" /> Start
              </Button>
            )}
            
            {isRunning && (
              <Button 
                onClick={pauseTimer}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Pause className="mr-2 h-4 w-4" /> Pause
              </Button>
            )}
            
            {isPaused && (
              <Button 
                onClick={resumeTimer}
                className="bg-primary hover:bg-primary/90"
              >
                <Play className="mr-2 h-4 w-4" /> Resume
              </Button>
            )}
            
            {(isRunning || isPaused) && (
              <Button 
                onClick={stopTimer}
                variant="destructive"
              >
                <StopCircle className="mr-2 h-4 w-4" /> Stop
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="preset-1" className="w-full" onValueChange={(value) => {
            const preset = defaultPresets.find(p => p.id === value);
            if (preset) handlePresetSelect(preset);
          }}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="preset-1">30 min / 1 break</TabsTrigger>
              <TabsTrigger value="preset-2">60 min / 2 breaks</TabsTrigger>
              <TabsTrigger value="preset-custom">Custom</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preset-1" className="mt-0">
              <div className="text-center text-sm text-muted-foreground">
                30 minutes of study time with 1 break
              </div>
            </TabsContent>
            
            <TabsContent value="preset-2" className="mt-0">
              <div className="text-center text-sm text-muted-foreground">
                60 minutes of study time with 2 breaks
              </div>
            </TabsContent>
            
            <TabsContent value="preset-custom" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Intervals</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={customIntervals}
                    onChange={(e) => setCustomIntervals(parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md mt-1"
                  />
                </div>
                <Button 
                  onClick={() => handlePresetSelect({
                    id: 'preset-custom',
                    name: 'Custom',
                    duration: customDuration,
                    intervals: customIntervals
                  })}
                  className="col-span-2 bg-primary hover:bg-primary/90"
                >
                  Apply Custom Settings
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {selectedPreset && (
            <div className={cn(
              "mt-4 px-4 py-2 rounded-full text-sm",
              "bg-primary/10 text-primary font-medium"
            )}>
              Selected: {selectedPreset.name}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Timer;
