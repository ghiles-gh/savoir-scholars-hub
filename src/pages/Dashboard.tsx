import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Clock, Calendar, User, Users, LogOut, Settings, BookOpen } from "lucide-react";
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
      fetchReports();
    } else if (profile?.profile_type === 'parent') {
      fetchChildren();
      fetchParentReports();
    } else if (profile?.profile_type === 'school') {
      fetchSchoolStats();
    }
  }, [user, profile, navigate]);
  
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
        title: "Échec du chargement des rapports",
        description: "Une erreur s'est produite lors du chargement de vos rapports. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChildren = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('parent_id', user?.id);
      
      if (error) throw error;
      
      setChildren(data || []);
    } catch (error) {
      console.error('Error fetching children:', error);
      toast({
        title: "Échec du chargement des enfants",
        description: "Une erreur s'est produite lors du chargement de vos enfants. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchParentReports = async () => {
    try {
      setIsLoading(true);
      const { data: childrenData, error: childrenError } = await supabase
        .from('students')
        .select('id')
        .eq('parent_id', user?.id);
      
      if (childrenError) throw childrenError;
      
      if (!childrenData || childrenData.length === 0) {
        setRecentReports([]);
        return;
      }
      
      const childrenIds = childrenData.map(child => child.id);
      
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
        .in('student_id', childrenIds)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      
      setRecentReports(data || []);
    } catch (error) {
      console.error('Error fetching parent reports:', error);
      toast({
        title: "Échec du chargement des rapports",
        description: "Une erreur s'est produite lors du chargement des rapports. Veuillez réessayer.",
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-nobel-navy">{getDashboardTitle()}</h1>
            <p className="text-gray-600">Bienvenue, {profile.name}</p>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Déconnexion
            </Button>
            
            {profile.profile_type === 'teacher' && (
              <Button 
                onClick={handleCreateReport}
                className="bg-nobel-blue hover:bg-nobel-blue/90 text-white flex items-center gap-2"
              >
                <Plus size={16} />
                Créer un rapport
              </Button>
            )}

            {profile.profile_type === 'parent' && (
              <Button 
                className="bg-nobel-blue hover:bg-nobel-blue/90 text-white flex items-center gap-2"
                onClick={() => navigate('/profile')}
              >
                <Settings size={16} />
                Paramètres
              </Button>
            )}
          </div>
        </div>
        
        {isCreatingReport ? (
          <ReportCreator onClose={() => setIsCreatingReport(false)} />
        ) : (
          <>
            {profile.profile_type === 'teacher' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Rapports envoyés</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <FileText className="w-8 h-8 text-nobel-blue mr-4" />
                        <span className="text-3xl font-bold">247</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">12 rapports cette semaine</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Classes enseignées</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Users className="w-8 h-8 text-nobel-blue mr-4" />
                        <span className="text-3xl font-bold">18</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">5 matières différentes</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Élèves</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <User className="w-8 h-8 text-nobel-blue mr-4" />
                        <span className="text-3xl font-bold">124</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Dans 6 classes différentes</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Tabs defaultValue="recent" className="mb-8">
                  <TabsList>
                    <TabsTrigger value="recent">Rapports récents</TabsTrigger>
                    <TabsTrigger value="upcoming">Cours à venir</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="recent" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Rapports récents</CardTitle>
                        <CardDescription>Consultez et gérez vos rapports d'élèves récents</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {isLoading ? (
                          <div className="py-8 text-center">Chargement des rapports...</div>
                        ) : recentReports.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-4 px-4 font-medium">Élève</th>
                                  <th className="text-left py-4 px-4 font-medium">Classe</th>
                                  <th className="text-left py-4 px-4 font-medium">Date</th>
                                  <th className="text-left py-4 px-4 font-medium">Statut</th>
                                  <th className="text-right py-4 px-4 font-medium">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {recentReports.map((report: any) => (
                                  <tr key={report.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-4">{report.students?.name || 'Inconnu'}</td>
                                    <td className="py-4 px-4">{report.classes?.name || 'Inconnue'}</td>
                                    <td className="py-4 px-4">{report.report_date}</td>
                                    <td className="py-4 px-4">
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        report.status === 'sent' 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {report.status === 'sent' ? 'Envoyé' : 'Brouillon'}
                                      </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                      <Button variant="outline" size="sm">Voir</Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="py-8 text-center text-gray-500">
                            Aucun rapport trouvé. Créez votre premier rapport!
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">Voir tous les rapports</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="upcoming" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Cours à venir</CardTitle>
                        <CardDescription>Vos cours programmés pour la semaine</CardDescription>
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
                                  {cls.date} à {cls.time}
                                </p>
                              </div>
                              <div>
                                <Button variant="outline" size="sm">
                                  Préparer
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

            {profile.profile_type === 'parent' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Mes enfants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="py-4 text-center">Chargement...</div>
                      ) : children.length > 0 ? (
                        <div className="space-y-4">
                          {children.map((child: any) => (
                            <div key={child.id} className="flex items-center p-4 border rounded-lg">
                              <div className="flex-shrink-0 mr-4 bg-nobel-blue/10 p-3 rounded-lg">
                                <User className="h-6 w-6 text-nobel-blue" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{child.name}</p>
                                <p className="text-sm text-gray-500">Classe: {child.grade}</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Détails
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 text-center text-gray-500">
                          Aucun enfant enregistré.
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg bg-blue-50 border-blue-100">
                          <p className="font-medium">Nouveau rapport disponible</p>
                          <p className="text-sm text-gray-600 mt-1">Un nouveau rapport a été partagé pour votre enfant.</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <p className="font-medium">Réunion parent-professeur</p>
                          <p className="text-sm text-gray-600 mt-1">Prochaine réunion le 15 octobre à 18h00.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Rapports récents</CardTitle>
                    <CardDescription>Consultez les rapports récents de vos enfants</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="py-8 text-center">Chargement des rapports...</div>
                    ) : recentReports.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-4 px-4 font-medium">Élève</th>
                              <th className="text-left py-4 px-4 font-medium">Classe</th>
                              <th className="text-left py-4 px-4 font-medium">Date</th>
                              <th className="text-right py-4 px-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentReports.map((report: any) => (
                              <tr key={report.id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-4">{report.students?.name || 'Inconnu'}</td>
                                <td className="py-4 px-4">{report.classes?.name || 'Inconnue'}</td>
                                <td className="py-4 px-4">{report.report_date}</td>
                                <td className="py-4 px-4 text-right">
                                  <Button variant="outline" size="sm">Voir le rapport</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        Aucun rapport disponible pour le moment.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {profile.profile_type === 'school' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Enseignants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <BookOpen className="w-8 h-8 text-nobel-blue mr-4" />
                        <span className="text-3xl font-bold">42</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">8 nouveaux ce mois-ci</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Élèves</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <Users className="w-8 h-8 text-nobel-blue mr-4" />
                        <span className="text-3xl font-bold">547</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Répartis dans 24 classes</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Rapports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <FileText className="w-8 h-8 text-nobel-blue mr-4" />
                        <span className="text-3xl font-bold">2,154</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">423 ce mois-ci</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Gestion des enseignants</CardTitle>
                      <CardDescription>Ajoutez et gérez les enseignants de l'école</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="bg-nobel-blue hover:bg-nobel-blue/90 text-white flex items-center gap-2 w-full">
                        <Plus size={16} />
                        Ajouter un enseignant
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Gestion des classes</CardTitle>
                      <CardDescription>Créez et gérez les classes de l'école</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="bg-nobel-blue hover:bg-nobel-blue/90 text-white flex items-center gap-2 w-full">
                        <Plus size={16} />
                        Ajouter une classe
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
