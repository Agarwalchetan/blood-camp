import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Home, Search, UserPlus, AlertCircle, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75 group-hover:opacity-100"></div>
              <Droplet className="h-8 w-8 text-red-600 relative transform group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-900">
              LifeFlow
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {[
              { to: "/", icon: Home, label: "Home" },
              { to: "/donate", icon: UserPlus, label: "Donate" },
              { to: "/request", icon: AlertCircle, label: "Request" },
              { to: "/blood-banks", icon: Search, label: "Find Banks" }
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <Link
            to="/admin"
            className="hidden md:block bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Admin Login
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-red-600" />
            ) : (
              <Menu className="h-6 w-6 text-red-600" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 h-64 pb-4"
              : "opacity-0 h-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-4">
            {[
              { to: "/", icon: Home, label: "Home" },
              { to: "/donate", icon: UserPlus, label: "Donate" },
              { to: "/request", icon: AlertCircle, label: "Request" },
              { to: "/blood-banks", icon: Search, label: "Find Banks" }
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
            <Link
              to="/admin"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}