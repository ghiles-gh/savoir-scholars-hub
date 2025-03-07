
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const DemoSection = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here
    
    toast({
      title: "Demo Request Received",
      description: "Thanks for your interest! We'll contact you shortly to schedule your demo.",
    });
  };

  return (
    <section id="demo" className="py-20 bg-nobel-light-blue/30">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">See EduTrack in Action</h2>
            <p className="section-subtitle">
              Request a personalized demo to see how EduTrack can transform communication between your school and parents
            </p>
            
            <div className="mt-8 space-y-6">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-2 mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Personalized Demo</h3>
                  <p className="text-gray-600">Tailored to your school's specific needs</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-2 mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">14-Day Free Trial</h3>
                  <p className="text-gray-600">Try all features with your team, no commitment</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-2 mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Implementation Support</h3>
                  <p className="text-gray-600">Dedicated team to help you get started</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h3 className="text-2xl font-bold text-nobel-navy mb-6">Request Your Free Demo</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                <Input id="email" type="email" placeholder="john@yourschool.edu" required />
              </div>
              
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                <Input id="school" placeholder="Westfield Academy" required />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                <Input id="role" placeholder="Principal, Teacher, IT Admin, etc." required />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                <Textarea id="message" placeholder="Tell us about your school and specific needs..." rows={4} />
              </div>
              
              <Button type="submit" className="w-full bg-nobel-gold text-nobel-navy hover:bg-nobel-gold/90">
                Request Demo
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By submitting this form, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
