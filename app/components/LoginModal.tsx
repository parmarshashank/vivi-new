 'use client';
import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { X } from 'lucide-react';

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(username, password);
    if (!success) {
      setError('Invalid credentials');
    }
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-white">Admin Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-transparent border-b border-gray-800 py-3 text-white placeholder-gray-500 focus:border-gray-400 transition-colors focus:outline-none"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent border-b border-gray-800 py-3 text-white placeholder-gray-500 focus:border-gray-400 transition-colors focus:outline-none"
              required
            />
          </div>
          
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full bg-white text-black py-3 hover:bg-gray-100 transition-colors font-light"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;