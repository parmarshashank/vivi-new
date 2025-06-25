'use client';
import { useAdmin } from '../../context/AdminContext';

const Footer = () => {
  const { isAdmin, logout, openLoginModal } = useAdmin();

  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 py-8">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2024 Vividhata. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            {isAdmin ? (
              <button
                onClick={logout}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Are you an admin? Login here
              </button>
            )}
            
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="hover:text-white transition-colors text-sm">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 