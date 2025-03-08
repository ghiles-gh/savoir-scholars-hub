
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Send } from "lucide-react";

interface ReportContentItem {
  id: number;
  content: string;
}

interface ReportPreviewTabProps {
  reportData: {
    student: string;
    class: string;
    date: string;
    overview: string;
    achievements: ReportContentItem[];
    improvements: ReportContentItem[];
    nextSteps: string;
    additionalNotes: string;
  };
  handleSaveDraft: () => void;
  handleSendReport: () => void;
  prevTab: () => void;
  studentName: string;
  className: string;
}

const ReportPreviewTab: React.FC<ReportPreviewTabProps> = ({ 
  reportData, 
  handleSaveDraft, 
  handleSendReport,
  prevTab,
  studentName,
  className
}) => {
  return (
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
              <p className="font-medium">{studentName || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Class</p>
              <p className="font-medium">{className || "Not specified"}</p>
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
  );
};

export default ReportPreviewTab;
