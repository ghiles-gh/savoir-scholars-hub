
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

    // Check if user is logged in
    const userData = localStorage.getItem('edutrack_user');
    setIsLoggedIn(!!userData);

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
            {isLoggedIn ? (
              <Button 
                onClick={() => navigate('/dashboard')}
                className={`${
                  isScrolled 
                    ? 'bg-nobel-blue text-white hover:bg-nobel-blue/90' 
                    : 'bg-nobel-blue text-white hover:bg-nobel-blue/90'
                }`}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                  className={`${
                    isScrolled 
                      ? 'text-nobel-blue hover:text-nobel-blue/90 hover:bg-nobel-blue/10' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/login?tab=register')}
                  className={`${
                    isScrolled 
                      ? 'bg-nobel-gold text-nobel-navy hover:bg-nobel-gold/90' 
                      : 'bg-nobel-gold text-nobel-navy hover:bg-nobel-gold/90'
                  }`}
                >
                  Get Started
                </Button>
              </>
            )}
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
                {isLoggedIn ? (
                  <Button 
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-center bg-nobel-blue text-white hover:bg-nobel-blue/90"
                  >
                    Dashboard
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-center"
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                    <Button 
                      className="w-full justify-center bg-nobel-gold text-nobel-navy hover:bg-nobel-gold/90"
                      onClick={() => {
                        navigate('/login?tab=register');
                        setIsMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
