import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, DollarSign, Building, Star, Filter, User, LogOut, Send, Heart, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ApplicantBottomNav from '../components/ApplicantBottomNav';

const ApplicantDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('beranda');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

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

  const applications = [
    {
      id: '1',
      jobTitle: 'Frontend Developer',
      company: 'Tech Innovate',
      appliedDate: '2024-01-15',
      status: 'pending',
      logo: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '2',
      jobTitle: 'UI/UX Designer',
      company: 'Creative Studio',
      appliedDate: '2024-01-14',
      status: 'interview',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '3',
      jobTitle: 'Backend Developer',
      company: 'Data Solutions',
      appliedDate: '2024-01-13',
      status: 'rejected',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const notifications = [
    {
      id: '1',
      title: 'Lamaran Anda diterima',
      message: 'Tech Innovate tertarik dengan profil Anda',
      time: '2 jam yang lalu',
      read: false
    },
    {
      id: '2',
      title: 'Interview dijadwalkan',
      message: 'Creative Studio mengundang Anda untuk interview',
      time: '1 hari yang lalu',
      read: false
    },
    {
      id: '3',
      title: 'Lowongan baru tersedia',
      message: '5 lowongan baru sesuai kriteria Anda',
      time: '2 hari yang lalu',
      read: true
    }
  ];

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'interview': return 'Interview';
      case 'accepted': return 'Diterima';
      case 'rejected': return 'Ditolak';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-700 truncate max-w-32">{user?.name}</p>
                  <p className="text-xs text-blue-600">Pelamar</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-1 sm:p-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* BERANDA Tab */}
        {activeTab === 'beranda' && (
          <>
            {/* Welcome Section */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Selamat datang, {user?.name}!
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Temukan pekerjaan impian Anda dan kembangkan karir yang cemerlang.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg sm:text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                    </div>
                    <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                      <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Cari Pekerjaan</h2>
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Cari pekerjaan, perusahaan..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Lokasi"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="w-full sm:w-48 pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Cari</span>
                </button>
              </div>
            </div>

            {/* Job Listings */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Lowongan Terbaru</h2>
                  <button className="flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:text-blue-800 text-sm sm:text-base">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <div key={job.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer truncate">
                              {job.title}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-600 mt-1 space-y-1 sm:space-y-0">
                              <div className="flex items-center space-x-1">
                                <Building className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">{job.company}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span>{job.type}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 text-xs sm:text-sm text-green-600 mt-1">
                              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{job.salary}</span>
                            </div>
                            <p className="text-gray-600 mt-2 text-xs sm:text-sm line-clamp-2">{job.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{job.postedAt}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 ml-2 flex-shrink-0">
                            <button 
                              onClick={() => toggleSaveJob(job.id)}
                              className={`p-2 transition-colors ${
                                savedJobs.includes(job.id) 
                                  ? 'text-yellow-500 hover:text-yellow-600' 
                                  : 'text-gray-400 hover:text-yellow-500'
                              }`}
                            >
                              <Star className={`w-4 h-4 sm:w-5 sm:h-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button className="bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm whitespace-nowrap">
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
          </>
        )}

        {/* LAMARAN Tab */}
        {activeTab === 'lamaran' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Lamaran Saya</h1>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Riwayat Lamaran</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {applications.map((app) => (
                  <div key={app.id} className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <img
                        src={app.logo}
                        alt={app.company}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                              {app.jobTitle}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">{app.company}</p>
                            <p className="text-xs text-gray-500 mt-1">Dilamar pada {app.appliedDate}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getStatusColor(app.status)}`}>
                            {getStatusText(app.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHAT Tab */}
        {activeTab === 'chat' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Chat</h1>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="text-center py-8 sm:py-12">
                <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Belum ada percakapan</h3>
                <p className="text-gray-600 text-sm sm:text-base">Mulai chat dengan recruiter setelah Anda melamar pekerjaan</p>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFIKASI Tab */}
        {activeTab === 'notifikasi' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Notifikasi</h1>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Notifikasi Terbaru</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-4 sm:p-6 ${!notif.read ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!notif.read ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800">{notif.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Profil Saya</h1>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                )}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{user?.name}</h2>
                  <p className="text-gray-600 mb-2">{user?.email}</p>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Pelamar
                  </span>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 space-y-4">
                <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Profil
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Informasi Kontak</h3>
                    <p className="text-sm text-gray-600">Email: {user?.email}</p>
                    <p className="text-sm text-gray-600">Telepon: -</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Bergabung</h3>
                    <p className="text-sm text-gray-600">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <ApplicantBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default ApplicantDashboard;