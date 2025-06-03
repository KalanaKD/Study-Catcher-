
import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Check, ListTodo } from 'lucide-react';

const TodoList: React.FC = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useStudy();
  const [newTodoText, setNewTodoText] = useState('');
  
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo(newTodoText);
      setNewTodoText('');
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <ListTodo className="h-5 w-5 text-primary" />
          Todo List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90">Add</Button>
        </form>
        
        <div className="space-y-2">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 rounded-full"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    <div className={`h-4 w-4 rounded border flex items-center justify-center ${
                      todo.completed ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {todo.completed && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </Button>
                  <span className={`ml-2 ${
                    todo.completed ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {todo.text}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-2">No tasks yet. Add one above!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoList;
