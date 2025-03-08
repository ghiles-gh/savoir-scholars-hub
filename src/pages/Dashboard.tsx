
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import ReportCreator from '@/components/ReportCreator';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Import dashboard components
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';
import ParentDashboard from '@/components/dashboard/ParentDashboard';
import SchoolDashboard from '@/components/dashboard/SchoolDashboard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

// Import utility functions
import { fetchTeacherReports, fetchChildren, fetchParentReports } from '@/utils/dashboardUtils';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();
  const [isCreatingReport, setIsCreatingReport] = useState(false);
  const [recentReports, setRecentReports] = useState([]);
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const upcomingClasses = [
    { id: 1, className: 'Mathématiques - 5ème', time: '09:00', date: '2023-09-20' },
    { id: 2, className: 'Physique - 4ème', time: '11:00', date: '2023-09-20' },
    { id: 3, className: 'Histoire - 6ème', time: '14:00', date: '2023-09-21' },
  ];
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (profile?.profile_type === 'teacher') {
      loadTeacherData();
    } else if (profile?.profile_type === 'parent') {
      loadParentData();
    } else if (profile?.profile_type === 'school') {
      fetchSchoolStats();
    }
  }, [user, profile, navigate]);
  
  const loadTeacherData = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await fetchTeacherReports(user?.id);
      
      if (error) throw error;
      
      setRecentReports(data);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
      toast({
        title: "Échec du chargement des données",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadParentData = async () => {
    try {
      setIsLoading(true);
      
      // Load children
      const { data: childrenData, error: childrenError } = await fetchChildren(user?.id);
      if (childrenError) throw childrenError;
      setChildren(childrenData);
      
      // Load reports
      const { data: reportsData, error: reportsError } = await fetchParentReports(user?.id);
      if (reportsError) throw reportsError;
      setRecentReports(reportsData);
      
    } catch (error) {
      console.error('Error fetching parent data:', error);
      toast({
        title: "Échec du chargement des données",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSchoolStats = async () => {
    setIsLoading(false);
  };
  
  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };
  
  const handleCreateReport = () => {
    setIsCreatingReport(true);
  };
  
  const handleSettings = () => {
    navigate('/profile');
  };
  
  if (!user || !profile) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  const getDashboardTitle = () => {
    switch(profile.profile_type) {
      case 'teacher': return "Tableau de bord Enseignant";
      case 'parent': return "Tableau de bord Parent";
      case 'school': return "Tableau de bord École";
      default: return "Tableau de bord";
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <DashboardHeader 
          title={getDashboardTitle()}
          userName={profile.name}
          profileType={profile.profile_type}
          onLogout={handleLogout}
          onCreateReport={profile.profile_type === 'teacher' ? handleCreateReport : undefined}
          onSettings={profile.profile_type === 'parent' ? handleSettings : undefined}
        />
        
        {isCreatingReport ? (
          <ReportCreator onClose={() => setIsCreatingReport(false)} />
        ) : (
          <>
            {profile.profile_type === 'teacher' && (
              <TeacherDashboard 
                recentReports={recentReports}
                upcomingClasses={upcomingClasses}
                isLoading={isLoading}
                onCreateReport={handleCreateReport}
              />
            )}

            {profile.profile_type === 'parent' && (
              <ParentDashboard
                children={children}
                recentReports={recentReports}
                isLoading={isLoading}
              />
            )}

            {profile.profile_type === 'school' && (
              <SchoolDashboard />
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
