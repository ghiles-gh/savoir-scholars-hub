
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, UserPlus, Phone, UserCircle, GraduationCap, Building } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signIn, signUp, isLoading } = useAuth();
  
  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    schoolName: '',
    phone_number: '',
    profile_type: 'teacher',
    childData: {
      name: '',
      grade: '6'
    }
  });

  // Check if email confirmation message is in URL
  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'email-confirmed') {
      toast({
        title: "Email confirmé",
        description: "Votre email a été confirmé. Vous pouvez maintenant vous connecter.",
      });
    }
  }, [searchParams, toast]);
  
  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleChildDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      childData: {
        ...prev.childData,
        [name]: value
      }
    }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Information manquante",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await signIn(loginData.email, loginData.password);
      // Navigation is handled in the auth context through useEffect
    } catch (error) {
      // Error is handled in the auth context
      console.error(error);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast({
        title: "Information manquante",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Les mots de passe ne correspondent pas",
        description: "Assurez-vous que vos mots de passe correspondent",
        variant: "destructive"
      });
      return;
    }

    // Check if parent has filled child info
    if (registerData.profile_type === 'parent' && !registerData.childData.name) {
      toast({
        title: "Information de l'enfant manquante",
        description: "Veuillez fournir le nom de votre enfant",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await signUp(registerData.email, registerData.password, {
        name: registerData.name,
        profile_type: registerData.profile_type,
        schoolName: registerData.schoolName,
        phone_number: registerData.phone_number,
        childData: registerData.profile_type === 'parent' ? registerData.childData : null
      });
      
      // After signup, switch to login tab
      setActiveTab('login');
      // Clear the registration form
      setRegisterData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        schoolName: '',
        phone_number: '',
        profile_type: 'teacher',
        childData: {
          name: '',
          grade: '6'
        }
      });
    } catch (error) {
      // Error is handled in the auth context
      console.error(error);
    }
  };

  const getProfileTypeIcon = () => {
    switch(registerData.profile_type) {
      case 'teacher': return <GraduationCap className="h-5 w-5 text-gray-400" />;
      case 'parent': return <UserCircle className="h-5 w-5 text-gray-400" />;
      case 'school': return <Building className="h-5 w-5 text-gray-400" />;
      default: return <UserPlus className="h-5 w-5 text-gray-400" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-nobel-navy">Bienvenue sur EduTrack</h1>
            <p className="text-gray-600 mt-2">La plateforme complète pour la communication école-parents</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border p-6">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 
                          <EyeOff className="h-5 w-5 text-gray-400" /> : 
                          <Eye className="h-5 w-5 text-gray-400" />
                        }
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <a href="#" className="text-sm text-nobel-blue hover:underline">
                      Mot de passe oublié?
                    </a>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-nobel-blue hover:bg-nobel-blue/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Connexion en cours..." : "Se connecter"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile_type">Type de compte</Label>
                    <Select 
                      value={registerData.profile_type}
                      onValueChange={(value) => handleSelectChange('profile_type', value)}
                    >
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          {getProfileTypeIcon()}
                          <SelectValue placeholder="Sélectionnez un type" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher">Enseignant</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="school">École</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Nom complet</Label>
                    <Input 
                      id="reg-name"
                      name="name"
                      placeholder="Votre nom complet"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Adresse Email</Label>
                    <Input 
                      id="reg-email"
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">Numéro de téléphone</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="reg-phone"
                        name="phone_number"
                        type="tel"
                        placeholder="+33 6 xx xx xx xx"
                        className="pl-10"
                        value={registerData.phone_number}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  {registerData.profile_type === 'teacher' || registerData.profile_type === 'school' ? (
                    <div className="space-y-2">
                      <Label htmlFor="reg-school">Nom de l'école</Label>
                      <Input 
                        id="reg-school"
                        name="schoolName"
                        placeholder="Nom de votre école"
                        value={registerData.schoolName}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                      />
                    </div>
                  ) : null}

                  {registerData.profile_type === 'parent' && (
                    <div className="space-y-4 p-4 border rounded-md mt-2 bg-gray-50">
                      <h3 className="font-medium">Information de l'enfant</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="child-name">Nom de l'enfant</Label>
                        <Input 
                          id="child-name"
                          name="name"
                          placeholder="Nom complet de l'enfant"
                          value={registerData.childData.name}
                          onChange={handleChildDataChange}
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="child-grade">Classe</Label>
                        <Select 
                          value={registerData.childData.grade}
                          onValueChange={(value) => setRegisterData(prev => ({
                            ...prev,
                            childData: { ...prev.childData, grade: value }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une classe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6ème</SelectItem>
                            <SelectItem value="5">5ème</SelectItem>
                            <SelectItem value="4">4ème</SelectItem>
                            <SelectItem value="3">3ème</SelectItem>
                            <SelectItem value="2">2nde</SelectItem>
                            <SelectItem value="1">1ère</SelectItem>
                            <SelectItem value="T">Terminale</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Mot de passe</Label>
                    <div className="relative">
                      <Input 
                        id="reg-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Créez un mot de passe"
                        className="pr-10"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 
                          <EyeOff className="h-5 w-5 text-gray-400" /> : 
                          <Eye className="h-5 w-5 text-gray-400" />
                        }
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-confirm-password">Confirmer le mot de passe</Label>
                    <Input 
                      id="reg-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirmez votre mot de passe"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-nobel-blue hover:bg-nobel-blue/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Création du compte..." : "Créer un compte"}
                  </Button>
                </form>
              </TabsContent>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  En continuant, vous acceptez les
                  <a href="#" className="text-nobel-blue hover:underline ml-1">Conditions d'utilisation</a>
                  {" et la "}
                  <a href="#" className="text-nobel-blue hover:underline">Politique de confidentialité</a>
                  {" d'EduTrack."}
                </p>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
