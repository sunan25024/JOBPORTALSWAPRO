import React from 'react';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Memuat...' }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-xl text-center max-w-sm mx-4">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src="/swapro.png" 
            alt="SWAPRO KARIR" 
            className="h-16 w-16 mx-auto object-contain animate-spin"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 mx-auto w-16 h-16 flex items-center justify-center animate-spin">
            <span className="font-bold text-lg">SK</span>
          </div>
        </div>

        {/* Loading Text */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">SWAPRO KARIR</h3>
        <p className="text-gray-600 mb-4">{message}</p>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;