'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#18181c]/95 shadow-md' : 'bg-[#101014]/80'
      }`} 
      style={{
        borderBottom: '2px solid',
        borderImage: 'var(--neon-gradient) 1',
        boxShadow: isScrolled ? '0 2px 24px 0 #ff3ec9' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <Link 
          href="/" 
          className="text-2xl md:text-3xl font-extrabold tracking-tight" 
          style={{color: 'var(--accent)', fontFamily: 'var(--font-main)'}}
        >
          Vividhata
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          <Link href="/" className="text-base lg:text-lg font-semibold hover:text-[var(--accent2)] transition" style={{color: 'var(--foreground)'}}>Home</Link>
          <Link href="/about" className="text-base lg:text-lg font-semibold hover:text-[var(--accent2)] transition" style={{color: 'var(--foreground)'}}>About</Link>
          <Link href="/events" className="text-base lg:text-lg font-semibold hover:text-[var(--accent2)] transition" style={{color: 'var(--foreground)'}}>Events</Link>
          <Link href="/gallery" className="text-base lg:text-lg font-semibold hover:text-[var(--accent2)] transition" style={{color: 'var(--foreground)'}}>Gallery</Link>
          <Link href="/contact" className="text-base lg:text-lg font-semibold hover:text-[var(--accent2)] transition" style={{color: 'var(--foreground)'}}>Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-[var(--foreground)] hover:text-[var(--accent2)] transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="absolute top-full left-0 right-0 bg-[#18181c]/98 border-b border-[var(--accent)]/20 backdrop-blur-sm md:hidden"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex flex-col py-4 px-4 gap-4">
              <Link 
                href="/" 
                className="text-lg font-semibold hover:text-[var(--accent2)] transition py-2" 
                style={{color: 'var(--foreground)'}}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-lg font-semibold hover:text-[var(--accent2)] transition py-2" 
                style={{color: 'var(--foreground)'}}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/events" 
                className="text-lg font-semibold hover:text-[var(--accent2)] transition py-2" 
                style={{color: 'var(--foreground)'}}
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                href="/gallery" 
                className="text-lg font-semibold hover:text-[var(--accent2)] transition py-2" 
                style={{color: 'var(--foreground)'}}
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                href="/contact" 
                className="text-lg font-semibold hover:text-[var(--accent2)] transition py-2" 
                style={{color: 'var(--foreground)'}}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 