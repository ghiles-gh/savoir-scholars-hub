
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        throw error;
      }

      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email non confirmé",
            description: "Veuillez vérifier votre boîte de réception et confirmer votre email avant de vous connecter.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else if (data.user) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur EduTrack!"
        });
      }
    } catch (error: any) {
      toast({
        title: "Échec de la connexion",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            profile_type: userData.profile_type || 'teacher',
            schoolName: userData.schoolName,
            phone_number: userData.phone_number
          },
          emailRedirectTo: window.location.origin + '/login'
        }
      });

      if (error) {
        throw error;
      }

      if (data.user?.identities?.length === 0) {
        toast({
          title: "Compte déjà existant",
          description: "Un compte avec cet email existe déjà. Veuillez vous connecter.",
          variant: "destructive"
        });
        return;
      }

      // If this is a parent registration with child data, create the student record
      if (userData.profile_type === 'parent' && userData.childData && data.user) {
        const { name: childName, grade } = userData.childData;
        
        const { error: studentError } = await supabase
          .from('students')
          .insert({
            name: childName,
            grade: grade || '6',
            parent_id: data.user.id
          });
            
        if (studentError) {
          console.error('Error creating student record:', studentError);
          toast({
            title: "Erreur d'enregistrement de l'étudiant",
            description: studentError.message,
            variant: "destructive"
          });
        }
      }

      toast({
        title: "Inscription réussie",
        description: "Veuillez vérifier votre email pour confirmer votre compte avant de vous connecter."
      });
      
    } catch (error: any) {
      toast({
        title: "Échec de l'inscription",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: any) => {
    if (!user) {
      throw new Error('Utilisateur non authentifié');
    }
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Refresh profile data
      await fetchProfile(user.id);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès."
      });
    } catch (error: any) {
      toast({
        title: "Erreur de mise à jour",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast({
        title: "Déconnecté",
        description: "Vous avez été déconnecté avec succès"
      });
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
