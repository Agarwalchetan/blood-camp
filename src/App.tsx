import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { DonorRegistration } from './pages/DonorRegistration';
import { BloodRequest } from './pages/BloodRequest';
import { BloodBanks } from './pages/BloodBanks';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donate" element={<DonorRegistration />} />
            <Route path="/request" element={<BloodRequest />} />
            <Route path="/blood-banks" element={<BloodBanks />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;