
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Send } from "lucide-react";

interface ReportCreatorHeaderProps {
  onClose: () => void;
  onSaveDraft: () => void;
  onSendReport: () => void;
}

const ReportCreatorHeader: React.FC<ReportCreatorHeaderProps> = ({ 
  onClose, 
  onSaveDraft, 
  onSendReport 
}) => {
  return (
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
          <Button variant="outline" onClick={onSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button className="bg-nobel-blue hover:bg-nobel-blue/90" onClick={onSendReport}>
            <Send className="h-4 w-4 mr-2" />
            Send Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportCreatorHeader;
