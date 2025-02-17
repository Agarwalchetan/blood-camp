import React, { useState } from 'react';
import { User, Lock, Activity, Users, Droplet, Calendar, Bell, Settings, ChevronDown, BarChart2, Download, Filter, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';

interface BloodInventory {
  id: string;
  type: string;
  units: number;
  status: string;
  lastUpdated: string;
}

interface BloodBank {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: string;
}

interface Donor {
  id: number;
  name: string;
  bloodType: string;
  date: string;
  status: string;
  lastDonation: string;
  email: string;
  phone: string;
}

interface Request {
  id: number;
  hospital: string;
  bloodType: string;
  units: number;
  status: string;
  date: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'urgent' | 'info' | 'success';
}

export function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [editingInventory, setEditingInventory] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'bank' | 'user' | null>(null);
  const [filters, setFilters] = useState({
    bloodType: '',
    status: '',
    date: '',
  });
  const [editedValues, setEditedValues] = useState<Record<string, any>>({});
  const [newEntry, setNewEntry] = useState<Record<string, any>>({});

  // Mock data
  const [bloodInventory, setBloodInventory] = useState<BloodInventory[]>([
    { id: '1', type: 'A+', units: 25, status: 'Adequate', lastUpdated: '2024-03-20' },
    { id: '2', type: 'A-', units: 8, status: 'Low', lastUpdated: '2024-03-20' },
    { id: '3', type: 'B+', units: 20, status: 'Adequate', lastUpdated: '2024-03-20' },
    { id: '4', type: 'B-', units: 5, status: 'Critical', lastUpdated: '2024-03-20' },
    { id: '5', type: 'O+', units: 30, status: 'Adequate', lastUpdated: '2024-03-20' },
    { id: '6', type: 'O-', units: 12, status: 'Low', lastUpdated: '2024-03-20' },
    { id: '7', type: 'AB+', units: 15, status: 'Adequate', lastUpdated: '2024-03-20' },
    { id: '8', type: 'AB-', units: 3, status: 'Critical', lastUpdated: '2024-03-20' }
  ]);

  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([
    { 
      id: 1, 
      name: "City General Hospital Blood Bank",
      address: "123 Medical Center Drive",
      phone: "(555) 123-4567",
      email: "city.general@example.com",
      status: "Active"
    },
    { 
      id: 2, 
      name: "Regional Blood Center",
      address: "456 Health Avenue",
      phone: "(555) 987-6543",
      email: "regional.center@example.com",
      status: "Active"
    }
  ]);

  const [donors, setDonors] = useState<Donor[]>([
    { id: 1, name: "John Doe", bloodType: "O+", date: "2024-03-15", status: "Active", lastDonation: "2024-02-15", email: "john@example.com", phone: "(555) 111-2222" },
    { id: 2, name: "Jane Smith", bloodType: "A-", date: "2024-03-14", status: "Active", lastDonation: "2024-01-20", email: "jane@example.com", phone: "(555) 333-4444" },
    { id: 3, name: "Mike Johnson", bloodType: "B+", date: "2024-03-13", status: "Inactive", lastDonation: "2023-12-10", email: "mike@example.com", phone: "(555) 555-6666" }
  ]);

  const [requests, setRequests] = useState<Request[]>([
    { id: 1, hospital: "City General", bloodType: "AB-", units: 2, status: "Pending", date: "2024-03-20" },
    { id: 2, hospital: "St. Mary's", bloodType: "O+", units: 3, status: "Approved", date: "2024-03-19" },
    { id: 3, hospital: "Memorial", bloodType: "B+", units: 1, status: "Completed", date: "2024-03-18" }
  ]);

  const notifications: Notification[] = [
    { id: 1, message: "Low blood supply alert: O- type", type: "urgent" },
    { id: 2, message: "New donor registration", type: "info" },
    { id: 3, message: "Blood request approved", type: "success" }
  ];

  const handleAddNew = () => {
    if (modalType === 'bank') {
      setBloodBanks(prev => [...prev, { ...newEntry, id: prev.length + 1, status: 'Active' }]);
    } else if (modalType === 'user') {
      setDonors(prev => [...prev, { ...newEntry, id: prev.length + 1, status: 'Active', date: new Date().toISOString().split('T')[0] }]);
    }
    setShowAddModal(false);
    setNewEntry({});
  };

  const handleRemove = (type: string, id: number) => {
    if (type === 'bank') {
      setBloodBanks(prev => prev.filter(bank => bank.id !== id));
    } else if (type === 'user') {
      setDonors(prev => prev.filter(donor => donor.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    setEditingInventory(id);
    const item = bloodInventory.find(i => i.id === id);
    if (item) {
      setEditedValues(item);
    }
  };

  const handleSave = (id: string) => {
    setBloodInventory(prev => prev.map(item => 
      item.id === id ? { ...item, ...editedValues, lastUpdated: new Date().toISOString().split('T')[0] } : item
    ));
    setEditingInventory(null);
    setEditedValues({});
  };

  const handleExportToExcel = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const applyFilters = (data: any[]) => {
    return data.filter(item => {
      const matchesBloodType = !filters.bloodType || item.bloodType === filters.bloodType;
      const matchesStatus = !filters.status || item.status === filters.status;
      const matchesDate = !filters.date || item.date === filters.date;
      return matchesBloodType && matchesStatus && matchesDate;
    });
  };

  const AddModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Add New {modalType === 'bank' ? 'Blood Bank' : 'User'}
        </h2>
        <div className="space-y-4">
          {modalType === 'bank' ? (
            <>
              <input
                type="text"
                placeholder="Blood Bank Name"
                className="w-full px-4 py-2 border rounded-lg"
                onChange={e => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-lg"
                onChange={e => setNewEntry({ ...newEntry, address: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full px-4 py-2 border rounded-lg"
                onChange={e => setNewEntry({ ...newEntry, phone: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
                onChange={e => setNewEntry({ ...newEntry, email: e.target.value })}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg"
                onChange={e => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <select
                className="w-full px-4 py-2 border rounded-lg"
                onChange={e => setNewEntry({ ...newEntry, bloodType: e.target.value })}
              >
                <option value="">Select Blood Type</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
                onChange={e => setNewEntry({ ...newEntry, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full px-4 py-2 border rounded-lg"
                onChange={e => setNewEntry({ ...newEntry, phone: e.target.value })}
              />
            </>
          )}
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => {
              setShowAddModal(false);
              setNewEntry({});
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
              <Lock className="h-12 w-12 text-red-600 relative" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-900">
            Admin Portal
          </h1>
          
          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-red-500/50 focus:border-red-500 transition-all"
                    placeholder="admin@lifeflow.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-red-500/50 focus:border-red-500 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-800 transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
              onClick={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
              }}
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showAddModal && <AddModal />}
      
      {/* Top Navigation */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-red-600">Admin Dashboard</h1>
              <nav className="hidden md:flex space-x-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'overview' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'inventory' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  Inventory
                </button>
                <button
                  onClick={() => setActiveTab('banks')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'banks' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  Blood Banks
                </button>
                <button
                  onClick={() => setActiveTab('donors')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'donors' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  Donors
                </button>
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'requests' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  Requests
                </button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                >
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 z-50">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          notification.type === 'urgent' ? 'border-l-4 border-red-500' :
                          notification.type === 'success' ? 'border-l-4 border-green-500' :
                          'border-l-4  border-blue-500'
                        }`}
                      >
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'Total Donors', value: '1,234', icon: Users, color: 'bg-blue-500' },
                { title: 'Available Units', value: '567', icon: Droplet, color: 'bg-red-500' },
                { title: 'Pending Requests', value: '23', icon: Activity, color: 'bg-yellow-500' },
                { title: 'This Month Donations', value: '89', icon: Calendar, color: 'bg-green-500' }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md transform hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Blood Inventory Overview */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Blood Inventory Status</h2>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleExportToExcel(bloodInventory, 'blood-inventory')}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bloodInventory.map((blood) => (
                  <div key={blood.id} className="p-4 bg-gray-50 rounded-lg transform hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-bold">{blood.type}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        blood.status === 'Adequate' ? 'bg-green-100 text-green-800' :
                        blood.status === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {blood.status}
                      </span>
                    </div>
                    <p className="text-gray-600">{blood.units} units</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Blood Inventory Management</h2>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleExportToExcel(bloodInventory, 'blood-inventory')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export to Excel</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={filters.bloodType}
                onChange={(e) => setFilters(prev => ({ ...prev, bloodType: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">All Blood Types</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>

              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">All Statuses</option>
                <option value="Adequate">Adequate</option>
                <option value="Low">Low</option>
                <option value="Critical">Critical</option>
              </select>

              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bloodInventory.map((blood) => (
                    <tr key={blood.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">{blood.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingInventory === blood.id ? (
                          <input
                            type="number"
                            value={editedValues.units || blood.units}
                            onChange={(e) => setEditedValues(prev => ({ ...prev, units: parseInt(e.target.value) }))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          />
                        ) : (
                          `${blood.units} units`
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingInventory === blood.id ? (
                          <select
                            value={editedValues.status || blood.status}
                            onChange={(e) => setEditedValues(prev => ({ ...prev, status: e.target.value }))}
                            className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="Adequate">Adequate</option>
                            <option value="Low">Low</option>
                            <option value="Critical">Critical</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            blood.status === 'Adequate' ? 'bg-green-100 text-green-800' :
                            blood.status === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {blood.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {blood.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {editingInventory === blood.id ? (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleSave(blood.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Save className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingInventory(null);
                                setEditedValues({});
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(blood.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'banks' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Blood Banks Management</h2>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleExportToExcel(bloodBanks, 'blood-banks')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export to Excel</span>
                </button>
                <button
                  onClick={() => {
                    setModalType('bank');
                    setShowAddModal(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Blood Bank</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bloodBanks.map((bank) => (
                    <tr key={bank.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">{bank.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {bank.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p>{bank.phone}</p>
                          <p className="text-sm text-gray-500">{bank.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          bank.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {bank.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleRemove('bank', bank.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'donors' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Donor Management</h2>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleExportToExcel(donors, 'donors-list')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export to Excel</span>
                </button>
                <button
                  onClick={() => {
                    setModalType('user');
                    setShowAddModal(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Donor</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donor Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Donation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {donors.map((donor) => (
                    <tr key={donor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">{donor.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {donor.bloodType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p>{donor.phone}</p>
                          <p className="text-sm text-gray-500">{donor.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {donor.lastDonation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          donor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {donor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleRemove('user', donor.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Blood Requests</h2>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleExportToExcel(requests, 'blood-requests')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export to Excel</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hospital
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">{request.hospital}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.bloodType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.units} units
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-red-600 hover:text-red-900">
                          <Edit2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}