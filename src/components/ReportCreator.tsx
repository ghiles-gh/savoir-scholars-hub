
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
        title: "Report saved",
        description: "Your report has been saved as a draft",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error saving report",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  const handleSendReport = async () => {
    try {
      await saveReport('sent');
      toast({
        title: "Report sent",
        description: "Your report has been sent to the student's parents",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error sending report",
        description: error.message,
        variant: "destructive"
      });
      console.error("Send report error details:", error);
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
            <TabsTrigger value="details">1. Basic Details</TabsTrigger>
            <TabsTrigger value="content">2. Report Content</TabsTrigger>
            <TabsTrigger value="preview">3. Preview & Send</TabsTrigger>
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
