
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface ParentDashboardProps {
  children: any[];
  recentReports: any[];
  isLoading: boolean;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({
  children,
  recentReports,
  isLoading
}) => {
  return (
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
  );
};

export default ParentDashboard;
