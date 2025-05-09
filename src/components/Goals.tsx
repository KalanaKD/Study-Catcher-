
import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Check, Calendar } from 'lucide-react';

const Goals: React.FC = () => {
  const { goals, addGoal, toggleGoal, deleteGoal } = useStudy();
  const [newGoalText, setNewGoalText] = useState('');
  
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalText.trim()) {
      addGoal(newGoalText);
      setNewGoalText('');
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Today's Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddGoal} className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new goal for today..."
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90">Add</Button>
        </form>
        
        <div className="space-y-2">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 rounded-full"
                    onClick={() => toggleGoal(goal.id)}
                  >
                    <div className={`h-4 w-4 rounded border flex items-center justify-center ${
                      goal.completed ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {goal.completed && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </Button>
                  <span className={`ml-2 ${
                    goal.completed ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {goal.text}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteGoal(goal.id)}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-2">No goals set for today. Add one above!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Goals;
