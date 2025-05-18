'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setError('');
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    
    // Log the actual values being submitted
    console.log({
      username,
      password,
      isOpen,
      loading
    });

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting login...');
      const success = await login(username, password);
      console.log('Login response:', success);
      
      if (success) {
        console.log('Login successful');
        onClose();
      } else {
        console.log('Login failed');
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-lg w-full max-w-md mx-4 border border-green-500">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        
        <div className="font-mono">
          <div className="text-green-500 mb-4">
            $ authenticate --user admin
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="text-green-500">$ enter username:</div>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  console.log('Username changed:', e.target.value);
                  setUsername(e.target.value);
                }}
                className="w-full bg-black text-green-500 outline-none border-none font-mono"
                autoFocus
              />
            </div>
            
            <div>
              <div className="text-green-500">$ enter password:</div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    console.log('Password changed');
                    setPassword(e.target.value);
                  }}
                  className="w-full bg-black text-green-500 outline-none border-none font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-400 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500">
                Error: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              onClick={() => console.log('Submit button clicked')}
              className="w-full bg-green-500 text-black py-2 rounded hover:bg-green-600 transition-colors font-mono"
            >
              {loading ? 'Authenticating...' : '$ submit --credentials'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 