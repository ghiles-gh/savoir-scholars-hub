
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ReportCreatorHeader from './report/ReportCreatorHeader';
import BasicDetailsTab from './report/BasicDetailsTab';
import ReportContentTab from './report/ReportContentTab';
import ReportPreviewTab from './report/ReportPreviewTab';
import { useReportForm, useFetchStudentsAndClasses, getMockData } from './report/useReportForm';

interface ReportCreatorProps {
  onClose: () => void;
}

const ReportCreator: React.FC<ReportCreatorProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const { reportData, handleChange, handleSelectChange, handleArrayChange, addArrayItem, removeArrayItem, saveReport } = useReportForm();
  
  // Fetch real data from Supabase, but fallback to mock data if needed
  const { students: realStudents, classes: realClasses, isLoading, isError } = useFetchStudentsAndClasses();
  const mockData = getMockData();
  
  // Use real data if available, otherwise use mock data
  const students = realStudents.length > 0 ? realStudents : mockData.students.map(name => ({ id: name, name }));
  const classes = realClasses.length > 0 ? realClasses : mockData.classes.map(name => ({ id: name, name }));
  
  const handleSaveDraft = async () => {
    try {
      await saveReport('draft');
      toast({
        title: "Rapport enregistré",
        description: "Votre rapport a été enregistré comme brouillon",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Erreur d'enregistrement du rapport",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  const handleSendReport = async () => {
    try {
      await saveReport('sent');
      toast({
        title: "Rapport envoyé",
        description: "Votre rapport a été envoyé aux parents de l'élève",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Erreur d'envoi du rapport",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  const nextTab = () => {
    if (activeTab === "details") setActiveTab("content");
    else if (activeTab === "content") setActiveTab("preview");
  };
  
  const prevTab = () => {
    if (activeTab === "content") setActiveTab("details");
    else if (activeTab === "preview") setActiveTab("content");
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg border">
      <ReportCreatorHeader 
        onClose={onClose} 
        onSaveDraft={handleSaveDraft} 
        onSendReport={handleSendReport} 
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 border-b">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">1. Détails de base</TabsTrigger>
            <TabsTrigger value="content">2. Contenu du rapport</TabsTrigger>
            <TabsTrigger value="preview">3. Aperçu & Envoi</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="p-6">
          <TabsContent value="details">
            <BasicDetailsTab 
              reportData={reportData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              nextTab={nextTab}
              students={students}
              classes={classes}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="content">
            <ReportContentTab 
              reportData={reportData}
              handleChange={handleChange}
              handleArrayChange={handleArrayChange}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
              nextTab={nextTab}
              prevTab={prevTab}
            />
          </TabsContent>
          
          <TabsContent value="preview">
            <ReportPreviewTab 
              reportData={reportData}
              handleSaveDraft={handleSaveDraft}
              handleSendReport={handleSendReport}
              prevTab={prevTab}
              studentName={students.find(s => s.id === reportData.student)?.name || ''}
              className={classes.find(c => c.id === reportData.class)?.name || ''}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ReportCreator;
