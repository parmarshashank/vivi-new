'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#18181c]/95 shadow-md' : 'bg-[#101014]/80'
    }`} style={{
      borderBottom: '2px solid',
      borderImage: 'var(--neon-gradient) 1',
      boxShadow: isScrolled ? '0 2px 24px 0 #ff3ec9' : 'none',
    }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link href="/" className="text-3xl font-extrabold tracking-tight" style={{color: 'var(--accent)', fontFamily: 'var(--font-main)'}}>
          Vividhata
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-lg font-semibold hover:text-[var(--accent2)] transition" style={{color: 'var(--foreground)'}}>Home</Link>
          <Link href="/about" className="text-lg font-semibold hover:text-[var(--accent2)] transition" style={{color: 'var(--foreground)'}}>About</Link>
          <Link href="/events" className="text-lg font-semibold hover:text-[var(--accent2)] transition" style={{color: 'var(--foreground)'}}>Events</Link>
          <Link href="/gallery" className="text-lg font-semibold hover:text-[var(--accent2)] transition" style={{color: 'var(--foreground)'}}>Gallery</Link>
          <Link href="/contact" className="text-lg font-semibold hover:text-[var(--accent2)] transition" style={{color: 'var(--foreground)'}}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 