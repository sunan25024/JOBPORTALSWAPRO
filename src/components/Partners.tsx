import React, { useEffect, useState } from 'react';

const Partners: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const partners = [
    { name: 'KMDS', logo: '/1641892872.jpg' },
    { name: 'Tokoparts', logo: '/1641892884.jpg' },
    { name: 'MCF', logo: '/1641892892.jpg' },
    { name: 'MAF', logo: '/1641892900.jpg' },
    { name: 'Modalku', logo: '/1641892913.jpg' },
    { name: 'Partner 6', logo: '/1641892921.jpg' },
    { name: 'Partner 7', logo: '/1641892933.jpg' },
    { name: 'Partner 8', logo: '/1641892946.jpg' },
    { name: 'Partner 9', logo: '/1641892955.jpg' },
    { name: 'Partner 10', logo: '/1641892962.jpg' },
    { name: 'Partner 11', logo: '/1641892971.jpg' },
    { name: 'Partner 12', logo: '/1641892980.jpg' },
    { name: 'Partner 13', logo: '/1641892990.png' },
    { name: 'Partner 14', logo: '/1641893003.png' },
    { name: 'Partner 15', logo: '/1641893012.jpg' },
    { name: 'Partner 16', logo: '/1641893019.jpg' },
    { name: 'Partner 17', logo: '/1641893029.jpg' },
    { name: 'Partner 18', logo: '/1641893037.jpg' },
    { name: 'Partner 19', logo: '/1641893061.jpg' },
    { name: 'Partner 20', logo: '/1641893069.jpg' },
    { name: 'Partner 21', logo: '/1641893081.png' },
    { name: 'Partner 22', logo: '/1641893088.png' },
    { name: 'Partner 23', logo: '/1641893097.png' },
    { name: 'Partner 24', logo: '/1641893107.png' },
    { name: 'Partner 25', logo: '/1641893119.png' },
    { name: 'Partner 26', logo: '/1641893128.png' },
    { name: 'Partner 27', logo: '/1641893140.png' },
    { name: 'Partner 28', logo: '/1641893148.png' },
    { name: 'Partner 29', logo: '/1641893156.png' },
    { name: 'Partner 30', logo: '/1641893164.jpg' },
    { name: 'Partner 31', logo: '/1641893172.png' },
    { name: 'Partner 32', logo: '/1647585862.png' },
    { name: 'Partner 33', logo: '/1647585887.png' },
    { name: 'Partner 34', logo: '/1647585988.png' },
    { name: 'Partner 35', logo: '/1647586011.png' },
    { name: 'Partner 36', logo: '/1647586032.png' },
    { name: 'Partner 37', logo: '/1647586041.png' },
    { name: 'Partner 38', logo: '/1647586049.png' },
    { name: 'Partner 39', logo: '/1647836415.png' },
    { name: 'Partner 40', logo: '/1647836433.png' },
    { name: 'Partner 41', logo: '/1658822594.jpg' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Partner Perusahaan Kami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan profesional yang telah dipercaya oleh perusahaan-perusahaan terkemuka
          </p>
        </div>

        {/* Running Text Effect */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set */}
            {partners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 transition-all duration-300"
              >
                <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-24 max-h-12 object-contain"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 transition-all duration-300"
              >
                <div className="w-32 h-20 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-24 max-h-12 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Slider */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Galeri Kegiatan
          </h3>
          <div className="relative h-64 rounded-lg overflow-hidden shadow-xl">
            {partners.map((partner, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={partner.logo}
                  alt={`Kegiatan ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-semibold">Kegiatan Perusahaan</h4>
                  <p className="text-sm opacity-90">Kolaborasi dengan {partner.name}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Photo indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {partners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;