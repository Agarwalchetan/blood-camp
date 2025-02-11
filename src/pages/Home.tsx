import React from 'react';
import { Search, MapPin, Droplet, ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <div 
        className="relative h-[600px] bg-cover bg-fixed bg-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1920")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 to-red-600/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 animate-fade-in-up">
              Every Drop
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-200 to-white block mt-2">
                Saves Lives
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-center mb-12 animate-fade-in-up-delay">
              Connect with blood donors and blood banks near you
            </p>
            
            {/* Animated Search Bar */}
            <div className="w-full max-w-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up-delay-2">
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-red-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="w-full pl-10 pr-20 py-4 rounded-xl text-gray-900 shadow-xl focus:ring-4 focus:ring-red-500/50 transition-all"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-4 py-2 rounded-lg flex items-center group-hover:bg-red-700 transition-all duration-300">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blood Availability Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-900">
            Available Blood Types
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map((type, index) => (
            <div 
              key={type}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
                  <Droplet className="h-10 w-10 text-red-600 relative" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800">{type}</h3>
              <p className="text-gray-600 text-center mt-2">Available</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Blood Banks with Hover Effects */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-900">
              Nearby Blood Banks
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((bank) => (
              <div 
                key={bank}
                className="group bg-white rounded-2xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">City Blood Bank {bank}</h3>
                <p className="text-gray-600 mb-6">123 Medical Center Drive</p>
                <div className="flex justify-between items-center">
                  <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Open Now
                  </span>
                  <button className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-xl group-hover:bg-red-700 transition-colors">
                    <span>View</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}