import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About LifeFlow</h3>
            <p className="text-gray-400">
              Connecting blood donors with those in need. Every donation saves lives.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Emergency: 1800-BLOOD-HELP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@lifeflow.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-red-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-red-500">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 LifeFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}