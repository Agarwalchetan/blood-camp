import React, { useState } from 'react';
import { User, Clock, FileText, Heart, Bell } from 'lucide-react';

export function UserPortal() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const userRequests = [
    { id: 1, date: '2024-03-15', bloodType: 'A+', units: 2, status: 'Approved' },
    { id: 2, date: '2024-03-10', bloodType: 'A+', units: 1, status: 'Completed' },
  ];

  const donationHistory = [
    { id: 1, date: '2024-02-15', bloodType: 'A+', location: 'City General Hospital' },
    { id: 2, date: '2023-11-20', bloodType: 'A+', location: 'Regional Blood Center' },
  ];

  const upcomingAppointments = [
    { id: 1, date: '2024-03-20', time: '10:00 AM', location: 'City General Hospital' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* User Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                <User className="h-8 w-8 text-red-600" />
              </div>
              <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, John Doe</h1>
              <p className="text-gray-600">Blood Type: A+ | Last Donation: Feb 15, 2024</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Donations</p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Lives Saved</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Next Eligible Date</p>
                <p className="text-3xl font-bold">May 15</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'overview', label: 'Overview', icon: FileText },
                { id: 'requests', label: 'My Requests', icon: Bell },
                { id: 'donations', label: 'Donation History', icon: Heart }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`${
                    activeTab === id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300`}
                >
                  <Icon className={`${
                    activeTab === id ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500'
                  } -ml-0.5 mr-2 h-5 w-5`} />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-medium">{appointment.location}</p>
                          <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                        </div>
                        <button className="text-red-600 hover:text-red-700 font-medium">
                          Reschedule
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[...userRequests, ...donationHistory].slice(0, 3).map((activity, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              {'units' in activity ? `Blood Request: ${activity.units} units` : 'Blood Donation'}
                            </p>
                            <p className="text-sm text-gray-600">{activity.date}</p>
                          </div>
                          {'status' in activity && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              activity.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {activity.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'requests' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Blood Request History</h3>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    New Request
                  </button>
                </div>
                <div className="space-y-4">
                  {userRequests.map((request) => (
                    <div key={request.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Request for {request.units} units of {request.bloodType}</p>
                          <p className="text-sm text-gray-600">{request.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'donations' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Donation History</h3>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Schedule Donation
                  </button>
                </div>
                <div className="space-y-4">
                  {donationHistory.map((donation) => (
                    <div key={donation.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{donation.location}</p>
                          <p className="text-sm text-gray-600">{donation.date}</p>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}