
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user } = useAuth();
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

  const saveReport = async (status: 'draft' | 'sent' = 'draft') => {
    if (!user) throw new Error('User not authenticated');
    
    const achievementsContent = reportData.achievements.map(item => item.content).filter(content => content.trim() !== '');
    const improvementsContent = reportData.improvements.map(item => item.content).filter(content => content.trim() !== '');
    
    const content = {
      overview: reportData.overview,
      achievements: achievementsContent,
      improvements: improvementsContent,
      nextSteps: reportData.nextSteps,
      additionalNotes: reportData.additionalNotes
    };

    // Find the corresponding student and class records
    const studentId = reportData.student;
    const classId = reportData.class;
    
    // Generate report title using actual names, not IDs
    const { data: students } = await supabase
      .from('students')
      .select('name')
      .eq('id', studentId)
      .single();
      
    const { data: classData } = await supabase
      .from('classes')
      .select('name')
      .eq('id', classId)
      .single();
    
    const studentName = students?.name || 'Unknown Student';
    const className = classData?.name || 'Unknown Class';
    const reportTitle = `Report for ${studentName} - ${className}`;

    console.log("Saving report with data:", {
      title: reportTitle,
      student_id: studentId,
      teacher_id: user.id,
      class_id: classId,
      report_date: reportData.date,
      status: status,
      content: content
    });

    const { data, error } = await supabase
      .from('reports')
      .insert({
        title: reportTitle,
        student_id: studentId,
        teacher_id: user.id,
        class_id: classId,
        report_date: reportData.date,
        status: status,
        content: content
      })
      .select();

    if (error) {
      console.error("Error saving report:", error);
      throw error;
    }
    return data;
  };
  
  return {
    reportData,
    handleChange,
    handleSelectChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    saveReport
  };
};

export const useFetchStudentsAndClasses = () => {
  const { user } = useAuth();

  const fetchStudents = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('students')
      .select('id, name');
    
    if (error) throw error;
    return data || [];
  };

  const fetchClasses = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('classes')
      .select('id, name')
      .eq('teacher_id', user.id);
    
    if (error) throw error;
    return data || [];
  };

  const studentsQuery = useQuery({
    queryKey: ['students', user?.id],
    queryFn: fetchStudents,
    enabled: !!user
  });

  const classesQuery = useQuery({
    queryKey: ['classes', user?.id],
    queryFn: fetchClasses,
    enabled: !!user
  });

  return {
    students: studentsQuery.data || [],
    classes: classesQuery.data || [],
    isLoading: studentsQuery.isLoading || classesQuery.isLoading,
    isError: studentsQuery.isError || classesQuery.isError
  };
};

export const getMockData = () => {
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
