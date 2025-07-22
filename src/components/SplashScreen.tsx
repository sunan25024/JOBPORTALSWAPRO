import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center z-50 transition-opacity duration-1000 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 animate-bounce">
          <img 
            src="/swapro.png" 
            alt="SWAPRO KARIR" 
            className="h-24 w-24 mx-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden bg-white text-blue-600 rounded-2xl p-6 mx-auto w-24 h-24 flex items-center justify-center">
            <span className="font-bold text-2xl">SK</span>
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-white mb-4">
          <h1 className="text-4xl font-bold mb-2 animate-fade-in">SWAPRO</h1>
          <p className="text-xl font-semibold text-blue-200 animate-fade-in">KARIR</p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Tagline */}
        <p className="text-white/80 mt-6 text-sm animate-fade-in">
          Menghubungkan Talenta dengan Peluang
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;