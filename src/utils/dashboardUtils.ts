
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";

export const fetchTeacherReports = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select(`
        id,
        title,
        report_date,
        status,
        students(name),
        classes(name)
      `)
      .eq('teacher_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (error) throw error;
    
    return { data: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching reports:', error);
    return { data: [], error };
  }
};

export const fetchChildren = async (parentId: string) => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('parent_id', parentId);
    
    if (error) throw error;
    
    return { data: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching children:', error);
    return { data: [], error };
  }
};

export const fetchParentReports = async (parentId: string) => {
  try {
    const { data: childrenData, error: childrenError } = await supabase
      .from('students')
      .select('id')
      .eq('parent_id', parentId);
    
    if (childrenError) throw childrenError;
    
    if (!childrenData || childrenData.length === 0) {
      return { data: [], error: null };
    }
    
    const childrenIds = childrenData.map(child => child.id);
    
    const { data, error } = await supabase
      .from('reports')
      .select(`
        id,
        title,
        report_date,
        status,
        students(name),
        classes(name)
      `)
      .in('student_id', childrenIds)
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (error) throw error;
    
    return { data: data || [], error: null };
  } catch (error: any) {
    console.error('Error fetching parent reports:', error);
    return { data: [], error };
  }
};
