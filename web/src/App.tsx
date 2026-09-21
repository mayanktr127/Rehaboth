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
import { OperatorDashboardPage } from './pages/admin/OperatorDashboardPage';
import { TermbasePage } from './pages/admin/TermbasePage';
import { CustomerExperiencePage } from './pages/admin/CustomerExperiencePage';

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

        {/* Administrative & Operator Command Tower routes */}
        <Route path="/admin" element={<OperatorDashboardPage />} />
        <Route path="/admin/dashboard" element={<OperatorDashboardPage />} />
        <Route path="/admin/termbase" element={<TermbasePage />} />
        <Route path="/admin/customer-experience" element={<CustomerExperiencePage />} />
        <Route path="/operator/dashboard" element={<OperatorDashboardPage />} />
        <Route path="/command-tower" element={<OperatorDashboardPage />} />
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
