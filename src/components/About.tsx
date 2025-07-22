import React from 'react';
import { Users, Target, Award, TrendingUp, Briefcase } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Pengguna Aktif', value: '50,000+' },
    { icon: Briefcase, label: 'Lowongan Kerja', value: '10,000+' },
    { icon: Award, label: 'Perusahaan Partner', value: '500+' },
    { icon: TrendingUp, label: 'Tingkat Keberhasilan', value: '85%' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Tentang SWAPRO KARIR
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform job portal terdepan yang menghubungkan talenta terbaik dengan perusahaan-perusahaan berkualitas di Indonesia
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Misi Kami
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              SWAPRO KARIR hadir untuk menjembatani kesenjangan antara pencari kerja dan perusahaan. 
              Kami berkomitmen untuk menyediakan platform yang mudah digunakan, aman, dan efektif 
              dalam membantu setiap individu menemukan karir yang tepat.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Dengan teknologi terdepan dan tim yang berpengalaman, kami terus berinovasi untuk 
              memberikan pengalaman terbaik bagi pengguna kami.
            </p>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Proses seleksi yang transparan dan fair</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Akses ke perusahaan-perusahaan terpercaya</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Dukungan karir yang komprehensif</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team collaboration"
              className="rounded-lg shadow-xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">5+</div>
              <div className="text-sm">Tahun Pengalaman</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;