import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Clock, Calendar, User, Users, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReportCreator from '@/components/ReportCreator';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [recentReports, setRecentReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const upcomingClasses = [
    { id: 1, className: 'Mathematics - Grade 10', time: '09:00 AM', date: '2023-09-20' },
    { id: 2, className: 'Physics - Grade 11', time: '11:00 AM', date: '2023-09-20' },
    { id: 3, className: 'History - Grade 9', time: '02:00 PM', date: '2023-09-21' },
  ];
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchReports();
  }, [user, navigate]);
  
  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('reports')
        .select(`
          id,
          title,
          report_date,
          status,
          students(name),
          classes(name)
        `)
        .eq('teacher_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      
      setRecentReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Failed to load reports",
        description: "There was an error loading your reports. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };
  
  const handleCreateReport = () => {
    setIsCreatingReport(true);
  };
  
  if (!user || !profile) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-nobel-navy">Teacher Dashboard</h1>
            <p className="text-gray-600">Welcome back, {profile.name}</p>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
            
            <Button 
              onClick={handleCreateReport}
              className="bg-nobel-blue hover:bg-nobel-blue/90 text-white flex items-center gap-2"
            >
              <Plus size={16} />
              Create Report
            </Button>
          </div>
        </div>
        
        {isCreatingReport ? (
          <ReportCreator onClose={() => setIsCreatingReport(false)} />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Reports Sent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileText className="w-8 h-8 text-nobel-blue mr-4" />
                    <span className="text-3xl font-bold">247</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">12 reports this week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Classes Taught</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-nobel-blue mr-4" />
                    <span className="text-3xl font-bold">18</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">5 different subjects</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <User className="w-8 h-8 text-nobel-blue mr-4" />
                    <span className="text-3xl font-bold">124</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Across 6 different classes</p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="recent" className="mb-8">
              <TabsList>
                <TabsTrigger value="recent">Recent Reports</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                    <CardDescription>View and manage your recent student reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="py-8 text-center">Loading reports...</div>
                    ) : recentReports.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-4 px-4 font-medium">Student</th>
                              <th className="text-left py-4 px-4 font-medium">Class</th>
                              <th className="text-left py-4 px-4 font-medium">Date</th>
                              <th className="text-left py-4 px-4 font-medium">Status</th>
                              <th className="text-right py-4 px-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentReports.map((report: any) => (
                              <tr key={report.id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-4">{report.students?.name || 'Unknown'}</td>
                                <td className="py-4 px-4">{report.classes?.name || 'Unknown'}</td>
                                <td className="py-4 px-4">{report.report_date}</td>
                                <td className="py-4 px-4">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    report.status === 'sent' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {report.status === 'sent' ? 'Sent' : 'Draft'}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-right">
                                  <Button variant="outline" size="sm">View</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        No reports found. Create your first report!
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View All Reports</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="upcoming" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Classes</CardTitle>
                    <CardDescription>Your scheduled classes for the week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingClasses.map((cls) => (
                        <div key={cls.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex-shrink-0 mr-4 bg-nobel-blue/10 p-3 rounded-lg">
                            <Calendar className="h-6 w-6 text-nobel-blue" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {cls.className}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {cls.date} at {cls.time}
                            </p>
                          </div>
                          <div>
                            <Button variant="outline" size="sm">
                              Prepare
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
