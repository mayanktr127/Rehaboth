import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { HomePage } from './pages/HomePage';
import { SchedulePickupPage } from './pages/SchedulePickupPage';
import { SmartBagDetailsPage } from './pages/SmartBagDetailsPage';
import { OrderStatusPage } from './pages/OrderStatusPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { ProfilePage } from './pages/ProfilePage';
import { SecureHandoverPage } from './pages/SecureHandoverPage';
import { SelectLocationPage } from './pages/SelectLocationPage';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/schedule" element={<SchedulePickupPage />} />
        <Route path="/smart-bag" element={<SmartBagDetailsPage />} />
        <Route path="/order-status" element={<OrderStatusPage />} />
        <Route path="/help" element={<HelpCenterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/secure-handover" element={<SecureHandoverPage />} />
        <Route path="/select-location" element={<SelectLocationPage />} />
      </Routes>
    </AnimatePresence>
  );
};



export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
