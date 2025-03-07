
import React from 'react';
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpen, Layers, Clock } from 'lucide-react';

const programs = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Primary School",
    ageRange: "Ages 5-11",
    description: "Foundation years focused on core skills development, curiosity, and love for learning in a nurturing environment.",
    features: ["Bilingual instruction", "Arts integration", "STEM foundation", "Character education"],
    color: "bg-blue-50 text-blue-700 border-blue-100"
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Middle School",
    ageRange: "Ages 12-14",
    description: "Transition program that builds on fundamentals while introducing more specialized subjects and skill development.",
    features: ["Subject specialization", "Critical thinking", "Project-based learning", "Leadership opportunities"],
    color: "bg-emerald-50 text-emerald-700 border-emerald-100"
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Upper School",
    ageRange: "Ages 15-18",
    description: "Rigorous college preparatory program with advanced coursework, specialized tracks, and university counseling.",
    features: ["Advanced Placement courses", "International Baccalaureate", "University preparation", "Research opportunities"],
    color: "bg-purple-50 text-purple-700 border-purple-100"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Enrichment Programs",
    ageRange: "All ages",
    description: "Supplementary learning opportunities beyond the core curriculum to develop talents and interests.",
    features: ["Summer academy", "Arts conservatory", "Sports excellence", "STEM innovation lab"],
    color: "bg-amber-50 text-amber-700 border-amber-100"
  }
];

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title animate-fade-in">Academic Programs</h2>
          <p className="section-subtitle mx-auto animate-fade-in">
            Our comprehensive educational pathways are designed to nurture students at every stage of development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div 
              key={program.title}
              className={cn(
                "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn("p-2 rounded-full", program.color)}>
                    {program.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-nobel-navy">{program.title}</h3>
                    <p className="text-sm text-gray-500">{program.ageRange}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{program.description}</p>
                
                <div className="space-y-2">
                  {program.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-nobel-gold rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <a 
                  href="#contact" 
                  className="text-nobel-blue font-medium hover:text-nobel-navy transition-colors flex items-center gap-1"
                >
                  Learn more about this program
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#admissions" 
            className="inline-flex items-center justify-center px-8 py-3 bg-nobel-blue text-white font-medium rounded-md hover:bg-nobel-navy transition-all duration-300 shadow hover:shadow-md animate-fade-in"
          >
            Apply to Our Programs
          </a>
          <p className="text-sm text-gray-500 mt-4 animate-fade-in">
            Applications are accepted on a rolling basis, with priority deadlines in January.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
