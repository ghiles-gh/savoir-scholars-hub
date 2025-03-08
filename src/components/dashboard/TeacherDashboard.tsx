
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Calendar, User, Users } from "lucide-react";

interface TeacherDashboardProps {
  recentReports: any[];
  upcomingClasses: any[];
  isLoading: boolean;
  onCreateReport: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  recentReports,
  upcomingClasses,
  isLoading,
  onCreateReport
}) => {
  return (
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
  );
};

export default TeacherDashboard;
