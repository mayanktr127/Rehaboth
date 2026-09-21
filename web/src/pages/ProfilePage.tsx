import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { DemoData } from '../data/demoData';


export const ProfilePage: React.FC = () => {
  return (
    <div className="app-container">
      <TopHeaderNav showBack={true} />

      <PageTransition className="main-content">
        {/* Profile Header */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '28px' }}>
          <img
            src={DemoData.user.avatarUrl}
            alt={DemoData.user.fullName}
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--color-primary)',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '14px',
            }}
          />
          <h1 className="font-serif" style={{ fontSize: '26px', letterSpacing: '-0.3px', marginBottom: '2px' }}>
            {DemoData.user.fullName}
          </h1>
          <span style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '1.5px', color: 'var(--color-primary)', textTransform: 'uppercase' }}>
            {DemoData.user.membershipTier}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground)', marginTop: '4px' }}>
            Member since {DemoData.user.memberSince} • {DemoData.user.location}
          </span>
        </section>

        {/* Stats Grid */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
          <div className="luxury-card" style={{ padding: '16px', textAlign: 'center' }}>
            <span className="font-serif" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>
              {DemoData.user.totalGarmentsCare}
            </span>
            <span style={{ fontSize: '10.5px', color: 'var(--color-muted-foreground)', display: 'block', marginTop: '2px' }}>
              Total Restored
            </span>
          </div>

          <div className="luxury-card" style={{ padding: '16px', textAlign: 'center' }}>
            <span className="font-serif" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>
              {DemoData.user.activeGarmentsInStudio}
            </span>
            <span style={{ fontSize: '10.5px', color: 'var(--color-muted-foreground)', display: 'block', marginTop: '2px' }}>
              In Studio
            </span>
          </div>

          <div className="luxury-card" style={{ padding: '16px', textAlign: 'center' }}>
            <span className="font-serif" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>
              {DemoData.user.nfcBagsRegistered}
            </span>
            <span style={{ fontSize: '10.5px', color: 'var(--color-muted-foreground)', display: 'block', marginTop: '2px' }}>
              NFC Bags
            </span>
          </div>
        </section>

        {/* Menu Navigation Items */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
          {/* Operator Command Tower & Studio Admin Panel */}
          <Link
            to="/admin"
            className="luxury-card"
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#1f1b17',
              color: '#ffffff',
              border: '1.5px solid #d68b61',
              boxShadow: '0 4px 16px rgba(184, 101, 56, 0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14.5px', fontWeight: 700, color: '#ffffff', display: 'block' }}>
                    Operator Command Tower
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', backgroundColor: '#d68b61', color: '#1f1b17', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Admin / Staff
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: '#d68b61', fontWeight: 600 }}>
                  Hub Intake • Custody Stepper • Tag Printing • Refund Ledger • Termbase
                </span>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#d68b61' }}>Open Tower →</span>
          </Link>

          {/* Active Valet Hub Location Card */}
          <Link
            to="/select-location"
            className="luxury-card"
            style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--color-primary)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>📍</span>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-foreground)', display: 'block' }}>
                  Indiranagar Atelier Hub
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>
                  Active Valet Delivery Zone • Tap to Change
                </span>
              </div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>Switch →</span>
          </Link>

          <Link
            to="/smart-bag"
            className="luxury-card"
            style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>🛍️</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>My Smart Bags & NFC Tokens</span>
            </div>
            <span>→</span>
          </Link>

          <Link
            to="/order-status"
            className="luxury-card"
            style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>⏱️</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Active Valet Orders & Vault</span>
            </div>
            <span>→</span>
          </Link>

          <Link
            to="/help"
            className="luxury-card"
            style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>❓</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Help & FAQ Support</span>
            </div>
            <span>→</span>
          </Link>


          <Link
            to="/landing"
            className="luxury-card"
            style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--color-primary)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>⎋</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)' }}>Logout (Return to Welcome Landing)</span>
            </div>
            <span style={{ color: 'var(--color-primary)' }}>→</span>
          </Link>
        </section>
      </PageTransition>

      <WebsiteFooter />
      <FloatingDockNav />
    </div>
  );
};

