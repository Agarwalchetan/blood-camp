import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export function BloodBanks() {
  const bloodBanks = [
    {
      id: 1,
      name: 'City General Hospital Blood Bank',
      address: '123 Medical Center Drive, Downtown',
      phone: '(555) 123-4567',
      hours: '24/7',
      status: 'Open Now',
      bloodTypes: {
        'A+': 15,
        'B+': 20,
        'O+': 25,
        'AB+': 10,
        'A-': 8,
        'B-': 12,
        'O-': 18,
        'AB-': 5
      }
    },
    {
      id: 2,
      name: 'Regional Blood Center',
      address: '456 Health Avenue, Midtown',
      phone: '(555) 987-6543',
      hours: '8:00 AM - 8:00 PM',
      status: 'Open Now',
      bloodTypes: {
        'A+': 30,
        'B+': 15,
        'O+': 35,
        'AB+': 8,
        'A-': 10,
        'B-': 5,
        'O-': 20,
        'AB-': 3
      }
    },
    {
      id: 3,
      name: 'Community Blood Services',
      address: '789 Care Lane, Uptown',
      phone: '(555) 456-7890',
      hours: '9:00 AM - 6:00 PM',
      status: 'Open Now',
      bloodTypes: {
        'A+': 25,
        'B+': 18,
        'O+': 30,
        'AB+': 12,
        'A-': 15,
        'B-': 8,
        'O-': 22,
        'AB-': 7
      }
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12">Nearby Blood Banks</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bloodBanks.map((bank) => (
            <div key={bank.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">{bank.name}</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <span className="text-gray-600">{bank.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">{bank.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">{bank.hours}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Available Blood Types</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(bank.bloodTypes).map(([type, units]) => (
                      <div key={type} className="text-center p-2 bg-gray-50 rounded">
                        <div className="font-bold text-red-600">{type}</div>
                        <div className="text-sm text-gray-600">{units} units</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
                  Contact Bank
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}