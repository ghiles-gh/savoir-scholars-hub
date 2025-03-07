
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, UserPlus, LogIn } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful login
      localStorage.setItem('edutrack_user', JSON.stringify({
        id: '123',
        name: 'Test User',
        email: loginData.email,
        role: 'teacher'
      }));
      
      toast({
        title: "Login successful",
        description: "Welcome back to EduTrack!",
      });
      
      navigate('/dashboard');
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="mt-6 text-3xl font-bold text-nobel-navy">
              Welcome to EduTrack
            </h1>
            <p className="mt-2 text-gray-600">
              Sign in to continue to your account
            </p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                          <Mail size={16} />
                        </span>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="pl-10"
                          value={loginData.email}
                          onChange={handleLoginChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-sm font-medium text-nobel-blue hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                          <Lock size={16} />
                        </span>
                        <Input 
                          id="password"
                          name="password"
                          type="password"
                          required
                          className="pl-10"
                          value={loginData.password}
                          onChange={handleLoginChange}
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full bg-nobel-blue hover:bg-nobel-blue/90" disabled={isLoading}>
                      {isLoading ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4" /> Login
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Register a new account to access EduTrack
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={registerData.name}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input 
                        id="reg-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={registerData.email}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input 
                        id="reg-password"
                        name="password"
                        type="password"
                        required
                        value={registerData.password}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-nobel-gold text-nobel-navy hover:bg-nobel-gold/90" disabled={isLoading}>
                      {isLoading ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" /> Create Account
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
