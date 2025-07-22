import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, DollarSign, Building, Star, Filter, BookOpen, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ApplicantDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  // Mock job data
  const jobs = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'Tech Innovate',
      location: 'Jakarta',
      type: 'Full-time',
      salary: 'Rp 8.000.000 - 12.000.000',
      description: 'Kami mencari Frontend Developer yang berpengalaman dengan React dan TypeScript.',
      postedAt: '2 hari yang lalu',
      logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '2',
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      location: 'Bandung',
      type: 'Full-time',
      salary: 'Rp 6.000.000 - 10.000.000',
      description: 'Bergabunglah dengan tim kreatif kami untuk menciptakan pengalaman pengguna yang luar biasa.',
      postedAt: '1 hari yang lalu',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '3',
      title: 'Backend Developer',
      company: 'Data Solutions',
      location: 'Surabaya',
      type: 'Full-time',
      salary: 'Rp 9.000.000 - 15.000.000',
      description: 'Kembangkan sistem backend yang scalable dengan Node.js dan database modern.',
      postedAt: '3 hari yang lalu',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const stats = [
    { label: 'Lamaran Terkirim', value: '12', icon: Briefcase },
    { label: 'Interview Dijadwalkan', value: '3', icon: Clock },
    { label: 'Profil Dilihat', value: '45', icon: User },
    { label: 'Pekerjaan Disimpan', value: '8', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/swapro.png" 
                alt="SWAPRO KARIR" 
                className="h-8 w-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-1">
                <span className="font-bold text-xs">SK</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">SWAPRO KARIR</h1>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {user?.avatar ? (
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
                <div>
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-blue-600">Pelamar</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Selamat datang, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Temukan pekerjaan impian Anda dan kembangkan karir yang cemerlang.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Cari Pekerjaan</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari pekerjaan, perusahaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Lokasi"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full md:w-48 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Cari</span>
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Lowongan Terbaru</h2>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {jobs.map((job) => (
              <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                          {job.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <Building className="w-4 h-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-green-600 mt-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm">{job.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{job.postedAt}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-yellow-500 transition-colors">
                          <Star className="w-5 h-5" />
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Lamar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;