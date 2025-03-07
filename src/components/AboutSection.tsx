
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Award, BookOpen, Target, Users } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-nobel-blue" />,
    title: "Academic Excellence",
    description: "Rigorous curriculum designed to challenge and inspire, with exceptional results across all educational benchmarks."
  },
  {
    icon: <Users className="h-8 w-8 text-nobel-blue" />,
    title: "Personalized Approach",
    description: "Small class sizes allow for individualized attention, ensuring each student receives the support they need to thrive."
  },
  {
    icon: <Target className="h-8 w-8 text-nobel-blue" />,
    title: "Global Perspective",
    description: "International curriculum that prepares students to be thoughtful, ethical citizens of an interconnected world."
  },
  {
    icon: <Award className="h-8 w-8 text-nobel-blue" />,
    title: "Character Development",
    description: "Focus on instilling values of integrity, responsibility, compassion, and leadership in every student."
  }
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const section = sectionRef.current;
          if (section) {
            section.classList.add('animate-section');
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title animate-fade-in">About Our School</h2>
          <p className="section-subtitle mx-auto animate-fade-in">
            Founded on principles of excellence and innovation, École du Savoir Nobel has been nurturing brilliant minds since 1985.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3" 
                alt="Students in a classroom setting" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-nobel-gold/10 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-nobel-blue/10 rounded-full -z-10"></div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-nobel-navy animate-fade-in-right">Our Philosophy</h3>
            <p className="text-gray-700 animate-fade-in-right">
              At École du Savoir Nobel, we believe that true education goes beyond academic excellence. We strive to develop well-rounded individuals who are intellectually curious, socially responsible, and prepared to make meaningful contributions to society.
            </p>
            <p className="text-gray-700 animate-fade-in-right">
              Our educational approach combines rigorous academics with creative exploration, physical well-being, and character development. We foster a supportive community where students are encouraged to discover their unique talents and pursue their passions.
            </p>
            
            <blockquote className="pl-4 border-l-4 border-nobel-gold italic text-gray-600 my-6 animate-fade-in-right">
              "Education is not the filling of a pail, but the lighting of a fire." — William Butler Yeats
            </blockquote>
            
            <a 
              href="#programs" 
              className="inline-block px-6 py-3 bg-nobel-blue text-white font-medium rounded-md hover:bg-nobel-blue/90 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-right"
            >
              Discover Our Approach
            </a>
          </div>
        </div>

        <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className={cn(
                "bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-4 p-3 bg-nobel-light-blue/30 rounded-full inline-block">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2 text-nobel-navy">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
