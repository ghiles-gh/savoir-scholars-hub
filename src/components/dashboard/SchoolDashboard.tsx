
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Users, BookOpen } from "lucide-react";

const SchoolDashboard: React.FC = () => {
  return (
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
  );
};

export default SchoolDashboard;
