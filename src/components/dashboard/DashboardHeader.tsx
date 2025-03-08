
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut, Plus, Settings } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  userName: string;
  profileType: string;
  onLogout: () => void;
  onCreateReport?: () => void;
  onSettings?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  userName,
  profileType,
  onLogout,
  onCreateReport,
  onSettings
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-nobel-navy">{title}</h1>
        <p className="text-gray-600">Bienvenue, {userName}</p>
      </div>
      
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={onLogout}
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Déconnexion
        </Button>
        
        {profileType === 'teacher' && onCreateReport && (
          <Button 
            onClick={onCreateReport}
            className="bg-nobel-blue hover:bg-nobel-blue/90 text-white flex items-center gap-2"
          >
            <Plus size={16} />
            Créer un rapport
          </Button>
        )}

        {profileType === 'parent' && onSettings && (
          <Button 
            className="bg-nobel-blue hover:bg-nobel-blue/90 text-white flex items-center gap-2"
            onClick={onSettings}
          >
            <Settings size={16} />
            Paramètres
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
