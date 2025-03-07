
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, MinusCircle } from "lucide-react";

interface ReportContentItem {
  id: number;
  content: string;
}

interface ReportContentTabProps {
  reportData: {
    achievements: ReportContentItem[];
    improvements: ReportContentItem[];
    nextSteps: string;
    additionalNotes: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleArrayChange: (arrayName: 'achievements' | 'improvements', id: number, value: string) => void;
  addArrayItem: (arrayName: 'achievements' | 'improvements') => void;
  removeArrayItem: (arrayName: 'achievements' | 'improvements', id: number) => void;
  nextTab: () => void;
  prevTab: () => void;
}

const ReportContentTab: React.FC<ReportContentTabProps> = ({ 
  reportData, 
  handleChange, 
  handleArrayChange, 
  addArrayItem, 
  removeArrayItem,
  nextTab,
  prevTab
}) => {
  return (
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
  );
};

export default ReportContentTab;
