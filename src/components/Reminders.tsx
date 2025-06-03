
import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Clock } from 'lucide-react';

const Reminders: React.FC = () => {
  const { reminders, addReminder, deleteReminder } = useStudy();
  const [newReminderText, setNewReminderText] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');
  
  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReminderText.trim()) {
      addReminder(newReminderText, newReminderTime || undefined);
      setNewReminderText('');
      setNewReminderTime('');
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddReminder} className="space-y-2 mb-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add a new reminder..."
              value={newReminderText}
              onChange={(e) => setNewReminderText(e.target.value)}
              className="flex-1"
            />
            <Input
              type="time"
              value={newReminderTime}
              onChange={(e) => setNewReminderTime(e.target.value)}
              className="w-24"
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Add Reminder</Button>
        </form>
        
        <div className="space-y-2">
          {reminders.length > 0 ? (
            reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{reminder.text}</p>
                  {reminder.time && <p className="text-sm text-muted-foreground">
                    Time: {reminder.time}
                  </p>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteReminder(reminder.id)}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-2">No reminders yet. Add one above!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Reminders;
