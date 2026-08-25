import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DemoData } from '../data/demoData';

interface TopHeaderNavProps {
  showBack?: boolean;
  onBack?: () => void;
}

export const TopHeaderNav: React.FC<TopHeaderNavProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to format breadcrumb names
  const getBreadcrumbTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Home';
      case '/schedule':
        return 'Services & Booking';
      case '/smart-bag':
        return 'Signature Smart Bag';
      case '/about':
        return 'About Us';
      case '/help':
        return 'Help Center & FAQ';
      case '/profile':
        return 'Member Profile';
      case '/order-status':
        return 'Live Valet Tracking';
      case '/select-location':
        return 'Select Location';
      case '/secure-handover':
        return 'Secure PIN Handover';
      case '/bot':
        return 'Concierge Bot';
      default:
        return path.replace('/', '').replace('-', ' ');
    }
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/schedule' },
    { title: 'Smart Bag', path: '/smart-bag' },
    { title: 'About Us', path: '/about' },
    { title: 'FAQ', path: '/help' },
  ];

  return (
    <>
      <header className="top-header-wrapper" style={{ position: 'sticky', top: 0, zIndex: 990, backgroundColor: 'rgba(250, 246, 239, 0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--color-border)' }}>
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Left: Pure Brand Title */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="font-serif brand-title">
              Rehaboth Steam
            </span>
          </Link>

          {/* Center: Desktop Website Navigation Bar Links */}
          <nav
            className="desktop-nav-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                style={({ isActive }) => ({
                  fontSize: '13.5px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-foreground)',
                  borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                  paddingBottom: '4px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                })}
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          {/* Right: Devendra Profile & Mobile 3-Dash Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease',
              }}
            >
              <img
                src={DemoData.user.avatarUrl}
                alt={DemoData.user.fullName}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--color-primary)',
                }}
              />
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--color-foreground)', display: 'inline-block' }}>
                Devendra
              </span>
            </Link>

            {/* Mobile 3-Dash Hamburger Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {isMobileMenuOpen ? (
                /* ✕ Close Icon */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                /* 3-Dash Hamburger Icon */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Website Breadcrumbs Bar on Non-Home Pages */}
        {location.pathname !== '/' && (
          <div style={{ backgroundColor: 'rgba(245, 238, 228, 0.7)', borderTop: '1px solid var(--color-border-subtle)', padding: '6px 24px' }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--color-muted-foreground)' }}>
              <Link to="/" style={{ color: 'var(--color-muted-foreground)', textDecoration: 'none' }}>
                Home
              </Link>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                {getBreadcrumbTitle(location.pathname)}
              </span>
            </div>
          </div>
        )}
      </header>

      {/* Mobile 3-Dash Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '60px',
              left: 0,
              right: 0,
              zIndex: 980,
              backgroundColor: '#faf6ef',
              borderBottom: '2px solid var(--color-border)',
              boxShadow: '0 20px 40px rgba(45, 36, 28, 0.15)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '20px 24px 28px 24px', maxWidth: '500px', margin: '0 auto' }}>
              
              {/* Breadcrumb Trail in Mobile Menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-muted-foreground)', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid var(--color-border-subtle)' }}>
                <span>Rehaboth Steam</span>
                <span>›</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                  {getBreadcrumbTitle(location.pathname)}
                </span>
              </div>

              {/* Website Navigation Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={({ isActive }) => ({
                      padding: '12px 16px',
                      borderRadius: '14px',
                      fontSize: '15px',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? '#ffffff' : 'var(--color-foreground)',
                      backgroundColor: isActive ? 'var(--color-primary)' : 'var(--bg-card)',
                      border: isActive ? 'none' : '1px solid var(--color-border)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    })}
                  >
                    <span>{link.title}</span>
                    <span>→</span>
                  </NavLink>
                ))}

                <NavLink
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    padding: '12px 16px',
                    borderRadius: '14px',
                    fontSize: '15px',
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? '#ffffff' : 'var(--color-foreground)',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--bg-card)',
                    border: isActive ? 'none' : '1px solid var(--color-border)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  })}
                >
                  <span>My Profile & Location</span>
                  <span>📍</span>
                </NavLink>
              </div>

              {/* Direct Booking CTA */}
              <Link
                to="/schedule"
                onClick={() => setIsMobileMenuOpen(false)}
                className="gold-btn"
                style={{ width: '100%', padding: '14px' }}
              >
                SCHEDULE VALET PICKUP →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
