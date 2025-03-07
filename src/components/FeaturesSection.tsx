
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Users, BarChart3, Shield } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <ClipboardCheck className="h-10 w-10 text-nobel-blue" />,
      title: "Quick Report Creation",
      description: "Teachers can create and send detailed reports in minutes with intuitive templates and easy-to-use interface."
    },
    {
      icon: <Users className="h-10 w-10 text-nobel-blue" />,
      title: "Parent Portal",
      description: "Secure access for parents to view reports, track progress, and receive instant notifications."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-nobel-blue" />,
      title: "Performance Analytics",
      description: "Comprehensive insights on student performance with visual data representation for better understanding."
    },
    {
      icon: <Shield className="h-10 w-10 text-nobel-blue" />,
      title: "Secure & Compliant",
      description: "GDPR-compliant platform with end-to-end encryption to protect sensitive student information."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title text-center">Key Features</h2>
        <p className="section-subtitle text-center mx-auto">
          Streamline communication between schools and parents with our comprehensive suite of tools
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex items-center justify-center pt-6">
                {feature.icon}
              </CardHeader>
              <CardContent className="text-center pt-2">
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
