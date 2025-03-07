
import React from 'react';
import { cn } from "@/lib/utils";
import { FileText, Calendar, Users, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <FileText className="h-6 w-6" />,
    title: "Submit Application",
    description: "Complete our online application form and submit required documents including transcripts and recommendation letters."
  },
  {
    id: 2,
    icon: <Calendar className="h-6 w-6" />,
    title: "Assessment Day",
    description: "Qualified candidates are invited to participate in academic assessments and interviews with faculty members."
  },
  {
    id: 3,
    icon: <Users className="h-6 w-6" />,
    title: "Family Interview",
    description: "Meet with our admissions team to discuss your child's strengths, interests, and how our school can support their growth."
  },
  {
    id: 4,
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Decision & Enrollment",
    description: "Receive an admissions decision within 3 weeks, followed by enrollment and orientation details if accepted."
  }
];

const AdmissionsSection = () => {
  return (
    <section id="admissions" className="py-20 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-nobel-gold/5 rounded-full"></div>
      <div className="absolute -bottom-36 -left-36 w-96 h-96 bg-nobel-blue/5 rounded-full"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title animate-fade-in">Admissions</h2>
          <p className="section-subtitle mx-auto animate-fade-in">
            Join our community of learners dedicated to academic excellence and personal growth.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fade-in-left">
            <h3 className="text-2xl md:text-3xl font-bold text-nobel-navy">Your Journey to École du Savoir Nobel</h3>
            
            <p className="text-gray-700">
              We seek curious, motivated students who will contribute to our diverse community. Our holistic admissions process considers academic potential, character, special talents, and alignment with our school's mission.
            </p>
            
            <div className="bg-nobel-light-blue/30 p-6 rounded-lg border border-nobel-light-blue">
              <h4 className="text-lg font-semibold text-nobel-blue mb-3">Key Admissions Dates</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-nobel-gold rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium">Priority Application Deadline:</span> January 15
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-nobel-gold rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium">Assessment Days:</span> February-March
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-nobel-gold rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium">Decision Notifications:</span> April 1
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-nobel-gold rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium">Enrollment Deadline:</span> April 30
                  </div>
                </li>
              </ul>
            </div>
            
            <p className="text-gray-600 italic">
              Rolling admissions continue based on space availability after priority deadlines.
            </p>
          </div>
          
          <div className="relative animate-fade-in-right">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3" 
                alt="Students collaborating in a modern classroom" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 bg-nobel-gold/90 text-white px-4 py-2 rounded-md font-semibold text-sm">
              Now Accepting Applications
            </div>
          </div>
        </div>
        
        <div className="my-16">
          <h3 className="text-2xl font-bold text-nobel-navy text-center mb-12 animate-fade-in">Admissions Process</h3>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12 relative z-10">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={cn(
                    "flex flex-col md:flex-row md:items-center gap-6 animate-fade-in",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse text-right"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={cn(
                    "flex-1",
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}>
                    <div className={cn(
                      "inline-flex items-center justify-center w-12 h-12 rounded-full shadow-md bg-white border-2 border-nobel-gold text-nobel-blue",
                      "mb-4 md:mb-0"
                    )}>
                      <span className="font-bold">{step.id}</span>
                    </div>
                    <h4 className="text-xl font-semibold text-nobel-navy mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-nobel-light-blue text-nobel-blue">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-nobel-navy text-white rounded-xl p-8 md:p-12 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join Our Community?</h3>
              <p className="text-gray-300 mb-6">
                Take the first step toward providing your child with an exceptional educational experience that will prepare them for success in college and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact" 
                  className="px-6 py-3 bg-nobel-gold text-nobel-navy font-medium rounded-md hover:bg-nobel-gold/90 transition-all duration-300 text-center"
                >
                  Apply Now
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 bg-transparent text-white border border-white/30 hover:bg-white/10 rounded-md font-medium transition-colors duration-300 text-center"
                >
                  Request Information
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-nobel-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-nobel-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300">We provide financial aid for qualified families, with 25% of our students receiving need-based assistance.</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-nobel-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-nobel-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300">Virtual information sessions available monthly for families unable to visit campus in person.</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-nobel-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-nobel-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300">Multilingual admissions staff available to assist international applicants throughout the process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsSection;
