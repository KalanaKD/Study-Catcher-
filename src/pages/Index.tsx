
import React from 'react';
import Layout from '../components/Layout';
import Timer from '../components/Timer';
import Dashboard from '../components/Dashboard';
import TodoList from '../components/TodoList';
import Goals from '../components/Goals';
import Reminders from '../components/Reminders';
import { StudyProvider } from '../context/StudyContext';

const Index = () => {
  return (
    <StudyProvider>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main content */}
          <div className="lg:col-span-7 space-y-6">
            <Timer />
            <Dashboard />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <Goals />
            <TodoList />
            <Reminders />
          </div>
        </div>
      </Layout>
    </StudyProvider>
  );
};

export default Index;
