
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Student {
  id: string;
  name: string;
}

interface Class {
  id: string;
  name: string;
}

interface BasicDetailsTabProps {
  reportData: {
    student: string;
    class: string;
    date: string;
    overview: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  nextTab: () => void;
  students: Student[];
  classes: Class[];
  isLoading?: boolean;
}

const BasicDetailsTab: React.FC<BasicDetailsTabProps> = ({ 
  reportData, 
  handleChange, 
  handleSelectChange,
  nextTab,
  students,
  classes,
  isLoading = false
}) => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="student">Student</Label>
          <Select 
            value={reportData.student} 
            onValueChange={(value) => handleSelectChange("student", value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder={isLoading ? "Loading students..." : "Select a student"} />
            </SelectTrigger>
            <SelectContent>
              {students.map(student => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
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
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder={isLoading ? "Loading classes..." : "Select a class"} />
            </SelectTrigger>
            <SelectContent>
              {classes.map(cls => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name}
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
  );
};

export default BasicDetailsTab;
