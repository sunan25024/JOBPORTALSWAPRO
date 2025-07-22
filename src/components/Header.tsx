import React from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/swapro.png" 
              alt="SWAPRO KARIR" 
              className="h-10 w-10 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-2">
              <span className="font-bold text-sm">SK</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-800">SWAPRO</h1>
              <span className="text-xs text-blue-600 font-semibold">KARIR</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
              Beranda
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              Tentang
            </a>
            <a href="#jobs" className="text-gray-700 hover:text-blue-600 transition-colors">
              Lowongan
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Kontak
            </a>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Masuk
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 text-gray-600 hover:text-gray-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                Beranda
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                Tentang
              </a>
              <a href="#jobs" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                Lowongan
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors py-2">
                Kontak
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;