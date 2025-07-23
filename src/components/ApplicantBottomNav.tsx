import React from 'react';
import { Home, FileText, MessageCircle, Bell, User } from 'lucide-react';

interface ApplicantBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ApplicantBottomNav: React.FC<ApplicantBottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'beranda', label: 'BERANDA', icon: Home },
    { id: 'lamaran', label: 'LAMARAN', icon: FileText },
    { id: 'chat', label: 'CHAT', icon: MessageCircle },
    { id: 'notifikasi', label: 'NOTIFIKASI', icon: Bell },
    { id: 'profile', label: 'PROFILE', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 ${
                activeTab === item.id
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className={`w-5 h-5 mb-1 ${
                activeTab === item.id ? 'text-blue-600' : 'text-gray-500'
              }`} />
              <span className={`text-xs font-medium truncate ${
                activeTab === item.id ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicantBottomNav;