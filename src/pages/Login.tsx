
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Mail, Lock, UserPlus } from 'lucide-react';
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
    schoolName: ''
  });
  
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
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await signIn(loginData.email, loginData.password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled in the auth context
      console.error(error);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword || !registerData.schoolName) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await signUp(registerData.email, registerData.password, {
        name: registerData.name,
        role: 'teacher',
        schoolName: registerData.schoolName
      });
      
      // Navigate is not needed here as the AuthContext will handle the redirect on successful auth state change
    } catch (error) {
      // Error is handled in the auth context
      console.error(error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-nobel-navy">Welcome to EduTrack</h1>
            <p className="text-gray-600 mt-2">The complete platform for school-parent communication</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border p-6">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
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
                      Forgot your password?
                    </a>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-nobel-blue hover:bg-nobel-blue/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name</Label>
                    <Input 
                      id="reg-name"
                      name="name"
                      placeholder="Your full name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email Address</Label>
                    <Input 
                      id="reg-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="reg-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
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
                    <Label htmlFor="reg-confirm-password">Confirm Password</Label>
                    <Input 
                      id="reg-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-school">School Name</Label>
                    <Input 
                      id="reg-school"
                      name="schoolName"
                      placeholder="Your school's name"
                      value={registerData.schoolName}
                      onChange={handleRegisterChange}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-nobel-blue hover:bg-nobel-blue/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  By continuing, you agree to EduTrack's
                  <a href="#" className="text-nobel-blue hover:underline ml-1">Terms of Service</a>
                  {" and "}
                  <a href="#" className="text-nobel-blue hover:underline">Privacy Policy</a>.
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
