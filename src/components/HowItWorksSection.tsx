
import React from 'react';
import { Button } from "@/components/ui/button";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Teacher Creates Report",
      description: "After class, teachers select a student and fill out a quick report using templates or custom fields.",
      color: "bg-nobel-light-blue"
    },
    {
      number: "02",
      title: "System Processes Data",
      description: "Our system integrates the new data with existing records and prepares a formatted report.",
      color: "bg-nobel-cream"
    },
    {
      number: "03",
      title: "Parents Receive Notification",
      description: "Parents get an email or push notification that a new report is available to view.",
      color: "bg-nobel-gold/20"
    },
    {
      number: "04",
      title: "Track Progress Over Time",
      description: "Both teachers and parents can track progress over time through visual analytics.",
      color: "bg-green-100"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="section-container">
        <h2 className="section-title text-center">How EduTrack Works</h2>
        <p className="section-subtitle text-center mx-auto">
          A simple and efficient process that keeps parents informed about their child's progress
        </p>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col">
              <div className={`rounded-lg ${step.color} p-6 h-full`}>
                <div className="text-5xl font-bold text-nobel-navy/30 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold text-nobel-navy mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex justify-center my-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#0A2463" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-nobel-navy hover:bg-nobel-navy/90">
            Learn More About Our Process
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
