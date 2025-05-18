'use client';
import { useState } from 'react';
import LoginModal from './LoginModal';

const Footer = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <footer className="bg-[#111111] border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left side - Copyright */}
          <div className="text-gray-400 font-light text-sm">
            © {new Date().getFullYear()} Vividhata. All rights reserved.
          </div>

          {/* Center - Admin Login */}
          <div className="order-first md:order-none mb-6 md:mb-0">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-gray-400 hover:text-white transition-colors text-sm font-light"
            >
              Are you an admin? Login here
            </button>
          </div>

          {/* Right side - Additional Links */}
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-light">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </footer>
  );
};

export default Footer; 