
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-nobel-navy to-nobel-blue py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-repeat"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
              Keeping Parents <span className="text-nobel-gold">Informed</span> After Every Class
            </h1>
            <p className="mt-6 text-xl text-gray-100 max-w-2xl animate-fade-in-fast">
              EduTrack enables private schools to send detailed, personalized reports to parents after each class session, enhancing communication and student progress tracking.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in">
              <Button size="lg" className="bg-nobel-gold text-nobel-navy hover:bg-nobel-gold/90">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Request Demo
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-fade-in-right">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="EduTrack Dashboard" 
                className="w-full h-auto rounded-lg"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-nobel-navy/70 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white p-4 glass-morphism rounded-lg">
                <h3 className="text-lg font-semibold">Easy-to-use interface</h3>
                <p className="text-sm">Create detailed student reports in minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
