
import React from 'react';
import { cn } from "@/lib/utils";
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-nobel-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">École du Savoir Nobel</h3>
            <p className="text-gray-300 mb-4">
              A premier institution dedicated to fostering intellectual curiosity, academic excellence, and personal growth in every student.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-nobel-gold hover:text-nobel-navy transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-nobel-gold hover:text-nobel-navy transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-nobel-gold hover:text-nobel-navy transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-nobel-gold hover:text-nobel-navy transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-nobel-gold transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-nobel-gold transition-colors">About</a>
              </li>
              <li>
                <a href="#programs" className="text-gray-300 hover:text-nobel-gold transition-colors">Programs</a>
              </li>
              <li>
                <a href="#admissions" className="text-gray-300 hover:text-nobel-gold transition-colors">Admissions</a>
              </li>
              <li>
                <a href="#news" className="text-gray-300 hover:text-nobel-gold transition-colors">News</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-nobel-gold transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Important Info</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-nobel-gold transition-colors">Academic Calendar</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-nobel-gold transition-colors">Career Opportunities</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-nobel-gold transition-colors">Financial Aid</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-nobel-gold transition-colors">Campus Map</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-nobel-gold transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-nobel-gold transition-colors">Terms of Use</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300 space-y-3">
              <p>123 Education Avenue</p>
              <p>Paris, 75007, France</p>
              <p>Phone: +33 (0)1 23 45 67 89</p>
              <p>Email: info@ecole-savoir-nobel.edu</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} École du Savoir Nobel. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-nobel-gold hover:text-white transition-colors"
            aria-label="Scroll to top"
          >
            Back to top <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
