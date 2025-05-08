
import React from 'react';
import { useStudy } from '../context/StudyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { totalTimeStudied, studySessions } = useStudy();
  
  // Format seconds as hours and minutes
  const formatTotalTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };
  
  // Get study sessions for the last 7 days
  const getRecentSessions = () => {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    
    return studySessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= sevenDaysAgo && sessionDate <= now;
    });
  };
  
  const recentSessions = getRecentSessions();
  
  // Calculate total study time for today
  const getTodayStudyTime = () => {
    const today = new Date().toDateString();
    
    const todaySessions = studySessions.filter(session => {
      const sessionDate = new Date(session.date).toDateString();
      return sessionDate === today;
    });
    
    return todaySessions.reduce((total, session) => total + session.duration, 0);
  };
  
  const todayStudyTime = getTodayStudyTime();
  
  // Calculate average study time per session
  const getAverageStudyTime = () => {
    if (studySessions.length === 0) return 0;
    return Math.floor(totalTimeStudied / studySessions.length);
  };
  
  const averageStudyTime = getAverageStudyTime();
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Study Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Study Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{formatTotalTime(totalTimeStudied)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Today's Study Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{formatTotalTime(todayStudyTime)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Average Session Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{formatTotalTime(averageStudyTime)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Study Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {recentSessions.length > 0 ? (
            <div className="space-y-4">
              {recentSessions.slice(0, 5).map((session) => (
                <div 
                  key={session.id}
                  className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{session.preset}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatTotalTime(session.duration)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No recent study sessions.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
