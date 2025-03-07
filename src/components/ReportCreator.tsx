
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Send, PlusCircle, MinusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportCreatorProps {
  onClose: () => void;
}

const ReportCreator: React.FC<ReportCreatorProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [reportData, setReportData] = useState({
    student: "",
    class: "",
    date: new Date().toISOString().split('T')[0],
    overview: "",
    achievements: [{ id: 1, content: "" }],
    improvements: [{ id: 1, content: "" }],
    nextSteps: "",
    additionalNotes: ""
  });
  
  // Mock data for demonstration
  const students = [
    "Sophie Martin", "Alexandre Dubois", "Emma Leclerc", "Thomas Bernard", 
    "Louise Petit", "Gabriel Moreau", "Camille Leroy", "Lucas Roux"
  ];
  
  const classes = [
    "Mathematics - Grade 10", "Physics - Grade 11", "History - Grade 9", 
    "French - Grade 10", "Biology - Grade 11", "Chemistry - Grade 11"
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setReportData({
      ...reportData,
      [name]: value
    });
  };
  
  const handleArrayChange = (arrayName: 'achievements' | 'improvements', id: number, value: string) => {
    setReportData({
      ...reportData,
      [arrayName]: reportData[arrayName].map(item => 
        item.id === id ? { ...item, content: value } : item
      )
    });
  };
  
  const addArrayItem = (arrayName: 'achievements' | 'improvements') => {
    const newId = Math.max(0, ...reportData[arrayName].map(item => item.id)) + 1;
    setReportData({
      ...reportData,
      [arrayName]: [...reportData[arrayName], { id: newId, content: "" }]
    });
  };
  
  const removeArrayItem = (arrayName: 'achievements' | 'improvements', id: number) => {
    if (reportData[arrayName].length <= 1) return;
    
    setReportData({
      ...reportData,
      [arrayName]: reportData[arrayName].filter(item => item.id !== id)
    });
  };
  
  const handleSaveDraft = () => {
    // Here you would save the report to your database
    toast({
      title: "Report saved",
      description: "Your report has been saved as a draft",
    });
    
    onClose();
  };
  
  const handleSendReport = () => {
    // Here you would send the report to parents
    toast({
      title: "Report sent",
      description: "Your report has been sent to the student's parents",
    });
    
    onClose();
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
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onClose} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h2 className="text-2xl font-bold text-nobel-navy">New Student Report</h2>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button className="bg-nobel-blue hover:bg-nobel-blue/90" onClick={handleSendReport}>
              <Send className="h-4 w-4 mr-2" />
              Send Report
            </Button>
          </div>
        </div>
      </div>
      
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
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="student">Student</Label>
                  <Select 
                    value={reportData.student} 
                    onValueChange={(value) => handleSelectChange("student", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map(student => (
                        <SelectItem key={student} value={student}>
                          {student}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select 
                    value={reportData.class} 
                    onValueChange={(value) => handleSelectChange("class", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date"
                  name="date"
                  type="date"
                  value={reportData.date}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="overview">Class Overview</Label>
                <Textarea 
                  id="overview"
                  name="overview"
                  placeholder="Provide a summary of what was covered in class"
                  rows={4}
                  value={reportData.overview}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={nextTab}>
                  Continue to Report Content
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Achievements</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => addArrayItem('achievements')}
                    className="h-8 text-nobel-blue hover:text-nobel-blue/90"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                
                {reportData.achievements.map(item => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Input 
                      placeholder="Describe an achievement"
                      value={item.content}
                      onChange={(e) => handleArrayChange('achievements', item.id, e.target.value)}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeArrayItem('achievements', item.id)}
                      disabled={reportData.achievements.length <= 1}
                      className="flex-shrink-0 text-gray-500 hover:text-red-500"
                    >
                      <MinusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Areas for Improvement</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => addArrayItem('improvements')}
                    className="h-8 text-nobel-blue hover:text-nobel-blue/90"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                
                {reportData.improvements.map(item => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Input 
                      placeholder="Describe an area for improvement"
                      value={item.content}
                      onChange={(e) => handleArrayChange('improvements', item.id, e.target.value)}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeArrayItem('improvements', item.id)}
                      disabled={reportData.improvements.length <= 1}
                      className="flex-shrink-0 text-gray-500 hover:text-red-500"
                    >
                      <MinusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nextSteps">Next Steps / Homework</Label>
                <Textarea 
                  id="nextSteps"
                  name="nextSteps"
                  placeholder="What should the student work on next?"
                  rows={3}
                  value={reportData.nextSteps}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea 
                  id="additionalNotes"
                  name="additionalNotes"
                  placeholder="Any additional information for parents"
                  rows={3}
                  value={reportData.additionalNotes}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevTab}>
                  Back
                </Button>
                <Button onClick={nextTab}>
                  Continue to Preview
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="max-w-3xl mx-auto">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Student Report Preview</CardTitle>
                  <CardDescription>Review your report before sending</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Student</p>
                      <p className="font-medium">{reportData.student || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Class</p>
                      <p className="font-medium">{reportData.class || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="font-medium">{reportData.date}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Class Overview</h3>
                    <p className="text-gray-700">{reportData.overview || "No overview provided"}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                    {reportData.achievements.some(a => a.content) ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {reportData.achievements.map(item => (
                          item.content && <li key={item.id} className="text-gray-700">{item.content}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No achievements specified</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Areas for Improvement</h3>
                    {reportData.improvements.some(i => i.content) ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {reportData.improvements.map(item => (
                          item.content && <li key={item.id} className="text-gray-700">{item.content}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No areas for improvement specified</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Next Steps / Homework</h3>
                    <p className="text-gray-700">{reportData.nextSteps || "No next steps provided"}</p>
                  </div>
                  
                  {reportData.additionalNotes && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
                      <p className="text-gray-700">{reportData.additionalNotes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevTab}>
                  Back to Edit
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={handleSaveDraft}>
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button className="bg-nobel-blue hover:bg-nobel-blue/90" onClick={handleSendReport}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Report
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ReportCreator;
