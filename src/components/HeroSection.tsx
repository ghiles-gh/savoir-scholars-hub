
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-[100vh] w-full flex items-center justify-center bg-nobel-navy overflow-hidden"
    >
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-nobel-navy/90 to-nobel-blue/80 z-10"></div>
      
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 py-20 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={cn(
              "transition-all transform duration-1000 ease-out",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            <span className="inline-block mb-4 px-4 py-1.5 text-sm text-nobel-gold bg-nobel-gold/10 rounded-full border border-nobel-gold/20 font-medium animate-fade-in-fast">
              Excellence • Innovation • Leadership
            </span>
          </div>
          
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-shadow-lg transition-all transform duration-700 ease-out delay-300",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            <span className="text-nobel-gold">Nurturing Brilliance,</span> Shaping Tomorrow's Leaders
          </h1>
          
          <p 
            className={cn(
              "text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto text-balance transition-all transform duration-700 ease-out delay-500",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            At École du Savoir Nobel, we combine academic excellence with character development to prepare students for the challenges of a rapidly evolving world.
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center transition-all transform duration-700 ease-out delay-700",
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            <a 
              href="#admissions" 
              className="px-8 py-3 bg-nobel-gold text-nobel-navy font-medium rounded-md hover:bg-nobel-gold/90 transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-transform"
            >
              Apply Now
            </a>
            <a 
              href="#programs" 
              className="px-8 py-3 bg-transparent text-white border border-white/30 hover:bg-white/10 rounded-md font-medium transition-colors duration-300"
            >
              Explore Programs
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <a 
        href="#about" 
        className={cn(
          "absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center justify-center z-20 transition-all duration-1000 ease-out delay-1000",
          loaded ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="text-sm mb-2 text-gray-300">Discover More</span>
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
};

export default HeroSection;
