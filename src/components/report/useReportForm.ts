
import { useState } from 'react';

export interface ReportContentItem {
  id: number;
  content: string;
}

export interface ReportData {
  student: string;
  class: string;
  date: string;
  overview: string;
  achievements: ReportContentItem[];
  improvements: ReportContentItem[];
  nextSteps: string;
  additionalNotes: string;
}

export const useReportForm = () => {
  const [reportData, setReportData] = useState<ReportData>({
    student: "",
    class: "",
    date: new Date().toISOString().split('T')[0],
    overview: "",
    achievements: [{ id: 1, content: "" }],
    improvements: [{ id: 1, content: "" }],
    nextSteps: "",
    additionalNotes: ""
  });
  
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
  
  return {
    reportData,
    handleChange,
    handleSelectChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem
  };
};

export const getMockData = () => {
  // Mock data for demonstration
  const students = [
    "Sophie Martin", "Alexandre Dubois", "Emma Leclerc", "Thomas Bernard", 
    "Louise Petit", "Gabriel Moreau", "Camille Leroy", "Lucas Roux"
  ];
  
  const classes = [
    "Mathematics - Grade 10", "Physics - Grade 11", "History - Grade 9", 
    "French - Grade 10", "Biology - Grade 11", "Chemistry - Grade 11"
  ];
  
  return {
    students,
    classes
  };
};
