
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollPosition = window.scrollY;
        const headerHeight = headerRef.current.offsetHeight;
        setIsScrolled(scrollPosition > headerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Home', link: '#home' },
    { name: 'Features', link: '#features' },
    { name: 'How It Works', link: '#how-it-works' },
    { name: 'Testimonials', link: '#testimonials' },
    { name: 'Pricing', link: '#pricing' },
    { name: 'Demo', link: '#demo' },
  ];

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-nobel-blue rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">ET</span>
              </div>
              <span className={`font-bold text-2xl ${isScrolled ? 'text-nobel-navy' : 'text-white'}`}>
                EduTrack
              </span>
            </div>
          </Link>

          {/* Navigation links - desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className={`nav-link ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Call to action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              className={`${
                isScrolled 
                  ? 'text-nobel-blue hover:text-nobel-blue/90 hover:bg-nobel-blue/10' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Login
            </Button>
            <Button 
              className={`${
                isScrolled 
                  ? 'bg-nobel-gold text-nobel-navy hover:bg-nobel-gold/90' 
                  : 'bg-nobel-gold text-nobel-navy hover:bg-nobel-gold/90'
              }`}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-nobel-blue"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-nobel-navy' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-nobel-navy' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="text-nobel-navy px-2 py-1 rounded hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" className="w-full justify-center">
                  Login
                </Button>
                <Button className="w-full justify-center bg-nobel-gold text-nobel-navy hover:bg-nobel-gold/90">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
