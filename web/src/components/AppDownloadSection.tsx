import React from 'react';
import { motion } from 'framer-motion';
import { DemoData } from '../data/demoData';

export const AppDownloadSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{
        marginBottom: '64px',
        padding: 'clamp(32px, 4vw, 56px) clamp(20px, 3.5vw, 44px)',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '36px',
        border: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Soft Ambient Accents */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184, 101, 56, 0.12) 0%, rgba(250, 246, 239, 0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, rgba(250, 246, 239, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '36px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left Column: Copy & Store Buttons */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--color-border)',
              marginBottom: '16px',
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
              PRIVATE RESERVE MOBILE APP
            </span>
          </div>

          <h2 className="font-serif section-headline" style={{ color: 'var(--color-foreground)', marginBottom: '16px' }}>
            Your Wardrobe Valet, <br />
            In Your Pocket
          </h2>

          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--color-muted-foreground)', marginBottom: '24px', maxWidth: '460px' }}>
            Experience seamless haute wardrobe care on iOS & Android. Track live valet status with GPS precision, authenticate tamper-proof Smart Bags via NFC, and manage your bespoke lavender scent preferences with one touch.
          </p>

          {/* Key Mobile Features Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-green-bg)', color: 'var(--color-green-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>✓</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-foreground)' }}>Live 4-Step GPS Valet Pipeline with OTP Security</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-green-bg)', color: 'var(--color-green-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>✓</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-foreground)' }}>One-Tap NFC Smart Bag Vault Authentication</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-green-bg)', color: 'var(--color-green-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>✓</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-foreground)' }}>Priority Morning & Evening Doorstep Dispatch</span>
            </div>
          </div>

          {/* Official Store Download Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Apple App Store Button */}
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 18px',
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.64-.78 1.08-1.86.96-2.95-1 .04-2.16.66-2.82 1.44-.58.67-1.09 1.77-.95 2.82 1.11.09 2.18-.56 2.81-1.31z" />
              </svg>
              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <span style={{ fontSize: '8.5px', fontWeight: 500, letterSpacing: '0.5px', opacity: 0.85, display: 'block' }}>
                  Download on the
                </span>
                <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.2px' }}>
                  App Store
                </span>
              </div>
            </a>

            {/* Google Play Store Button */}
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 18px',
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
              }}
            >
              <svg width="20" height="22" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M3.61 2.37A1.77 1.77 0 0 0 3 3.65v16.7c0 .5.22.96.61 1.28l.07.06 9.38-9.38v-.22L3.68 2.31l-.07.06z" />
                <path fill="#FBBC04" d="M16.19 15.13l-3.13-3.12v-.22l3.13-3.12.07.04 3.7 2.1c1.06.6 1.06 1.58 0 2.18l-3.7 2.1-.07.04z" />
                <path fill="#EA4335" d="M13.06 11.79L3.61 21.24c.36.38.93.43 1.5.11l11.08-6.3-3.13-3.26z" />
                <path fill="#34A853" d="M13.06 11.79l3.13-3.26L5.11 2.23c-.57-.32-1.14-.27-1.5.11l9.45 9.45z" />
              </svg>
              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <span style={{ fontSize: '8.5px', fontWeight: 500, letterSpacing: '0.5px', opacity: 0.85, display: 'block' }}>
                  GET IT ON
                </span>
                <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.2px' }}>
                  Google Play
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Dual Smartphone Mockups (Parallel on Desktop, Stacked One-After-Another on Mobile) */}
        <div className="app-phones-wrapper">
          {/* PHONE 1: ATELIER DASHBOARD (FULL EXACT CONTENT OF IMAGE 2 & 3) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="phone-mockup-frame"
          >

            {/* Authentic iOS Status Bar 9:41 with Vector Icons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px 2px 14px', fontSize: '10px', fontWeight: 700, color: '#1a1714' }}>
              <span>9:41</span>
              {/* Dynamic Island */}
              <div style={{ width: '54px', height: '14px', backgroundColor: '#000000', borderRadius: '10px' }} />
              {/* Authentic iOS Signal, Wi-Fi & Battery Vectors */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#1a1714' }}>
                <svg width="12" height="8" viewBox="0 0 17 11" fill="currentColor">
                  <rect x="0" y="8" width="3" height="3" rx="0.8" />
                  <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.8" />
                  <rect x="9" y="3" width="3" height="8" rx="0.8" />
                  <rect x="13.5" y="0.5" width="3" height="10.5" rx="0.8" />
                </svg>
                <svg width="11" height="8" viewBox="0 0 15 11" fill="currentColor">
                  <path d="M7.5 3.3C9.4 3.3 11.2 4 12.5 5.2L14 3.7C12.3 2.1 9.9 1.1 7.5 1.1C5.1 1.1 2.7 2.1 1 3.7L2.5 5.2C3.8 4 5.6 3.3 7.5 3.3Z" />
                  <path d="M7.5 6.4C8.7 6.4 9.8 6.9 10.6 7.7L12.1 6.2C10.9 5 9.3 4.2 7.5 4.2C5.7 4.2 4.1 5 2.9 6.2L4.4 7.7C5.2 6.9 6.3 6.4 7.5 6.4Z" />
                  <circle cx="7.5" cy="9.8" r="1.2" />
                </svg>
                <svg width="16" height="8" viewBox="0 0 22 11" fill="currentColor">
                  <rect x="0.5" y="0.5" width="19" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1" />
                  <rect x="2" y="2" width="13" height="7" rx="1.5" fill="#1a1714" />
                  <path d="M20.5 3.8C21.3 4.2 21.3 6.8 20.5 7.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* App Screen Content: Image 3 Complete Dashboard */}
            <div style={{ flex: 1, padding: '6px 10px', overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '6.5px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#8a7e72' }}>
                ATELIER STEAM & PRESS
              </span>
              <h3 className="font-serif" style={{ fontSize: '14px', fontWeight: 700, color: '#2d241c', marginTop: '1px', lineHeight: 1.15 }}>
                Hello, Devendra
              </h3>
              <span style={{ fontSize: '7px', color: '#8a7e72', marginBottom: '5px', display: 'block' }}>
                Your wardrobe valet is active for Indiranagar.
              </span>

              {/* Active Session Counter */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                <div>
                  <span className="font-serif" style={{ fontSize: '14px', fontWeight: 700, color: '#2d241c' }}>01 </span>
                  <span className="font-serif" style={{ fontSize: '14px', color: '#c4baa9' }}>04</span>
                  <span style={{ fontSize: '6.5px', color: '#8a7e72', display: 'block' }}>Active Session • 4 Pieces in Studio</span>
                </div>
                <div style={{ width: '20px', height: '20px', borderRadius: '6px', backgroundColor: '#efe7db', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' }}>
                  📅
                </div>
              </div>

              {/* Live Valet Status Card */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '6px 8px', boxShadow: '0 2px 6px rgba(45,36,28,0.05)', border: '1px solid #e8dfd3', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '6px', fontWeight: 800, color: '#b86538', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ● LIVE VALET STATUS
                  </span>
                  <span style={{ fontSize: '6px', color: '#8a7e72', fontWeight: 600 }}>#ST-9482</span>
                </div>
                <h4 className="font-serif" style={{ fontSize: '11px', fontWeight: 700, color: '#2d241c', margin: '0 0 1px 0' }}>
                  Silk & Tweed Finishing
                </h4>
                <span style={{ fontSize: '6.5px', color: '#8a7e72', display: 'block', marginBottom: '4px' }}>
                  Valet Partner Suresh • Expected: Today 6:30 PM
                </span>

                {/* 4-Step Stepper */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '5.5px', fontWeight: 700, color: '#2d241c', marginBottom: '4px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#b86538', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1px auto', fontSize: '5.5px' }}>✓</div>
                    <span>Picked Up</span>
                  </div>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#b86538', margin: '0 2px' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#b86538', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1px auto', fontSize: '5.5px' }}>✓</div>
                    <span>Steam Press</span>
                  </div>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#b86538', margin: '0 2px' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1.5px solid #b86538', backgroundColor: '#fff', margin: '0 auto 1px auto' }} />
                    <span>Quality</span>
                  </div>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#e0d5c5', margin: '0 2px' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #c4baa9', backgroundColor: '#fff', margin: '0 auto 1px auto' }} />
                    <span style={{ color: '#8a7e72' }}>Delivery</span>
                  </div>
                </div>

                <div style={{ backgroundColor: '#f5eee4', borderRadius: '5px', padding: '2.5px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '6px', fontWeight: 600, color: '#2d241c' }}>
                  <span>View Live Custodian Details</span>
                  <span>→</span>
                </div>
              </div>

              {/* Garment Care Services Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                <span style={{ fontSize: '7.5px', fontWeight: 700, color: '#2d241c' }}>Garment Care Services</span>
                <span style={{ fontSize: '6px', fontWeight: 700, color: '#8a7e72', letterSpacing: '0.4px' }}>VIEW ALL</span>
              </div>

              {/* All 4 Garment Care Services Cards (Exact Image 3 Layout) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '5px' }}>
                {/* 1. Studio Pickup */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '5px', border: '1px solid #e8dfd3' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1px' }}>
                    <span style={{ fontSize: '8px' }}>🧺</span>
                    <span style={{ fontSize: '5px', fontWeight: 800, backgroundColor: '#f5eee4', color: '#b86538', padding: '1px 2.5px', borderRadius: '2px' }}>POPULAR</span>
                  </div>
                  <h5 style={{ fontSize: '7px', fontWeight: 700, color: '#2d241c', margin: 0 }}>Studio Pickup</h5>
                  <span style={{ fontSize: '5.5px', color: '#8a7e72' }}>Doorstep Valet</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1px', fontSize: '6.5px', fontWeight: 700, color: '#b86538' }}>
                    <span>Free</span>
                    <span style={{ fontSize: '5.5px', color: '#8a7e72', fontWeight: 500 }}>2-4 hrs</span>
                  </div>
                </div>

                {/* 2. Smart Bag Vault */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '5px', border: '1px solid #e8dfd3' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1px' }}>
                    <span style={{ fontSize: '8px' }}>🛍️</span>
                    <span style={{ fontSize: '5px', fontWeight: 800, backgroundColor: '#f5eee4', color: '#b86538', padding: '1px 2.5px', borderRadius: '2px' }}>SIGNATURE</span>
                  </div>
                  <h5 style={{ fontSize: '7px', fontWeight: 700, color: '#2d241c', margin: 0 }}>Smart Bag</h5>
                  <span style={{ fontSize: '5.5px', color: '#8a7e72' }}>NFC Token</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1px', fontSize: '6.5px', fontWeight: 700, color: '#b86538' }}>
                    <span>₹999</span>
                    <span style={{ fontSize: '5.5px', color: '#8a7e72', fontWeight: 500 }}>Lifetime</span>
                  </div>
                </div>

                {/* 3. Order Status */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '5px', border: '1px solid #e8dfd3' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1px' }}>
                    <span style={{ fontSize: '8px' }}>⏱️</span>
                    <span style={{ fontSize: '5px', fontWeight: 800, backgroundColor: '#f5eee4', color: '#b86538', padding: '1px 2.5px', borderRadius: '2px' }}>LIVE</span>
                  </div>
                  <h5 style={{ fontSize: '7px', fontWeight: 700, color: '#2d241c', margin: 0 }}>Order Status</h5>
                  <span style={{ fontSize: '5.5px', color: '#8a7e72' }}>Live Tracking</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1px', fontSize: '6.5px', fontWeight: 700, color: '#b86538' }}>
                    <span>Active</span>
                    <span style={{ fontSize: '5.5px', color: '#8a7e72', fontWeight: 500 }}>Today 6PM</span>
                  </div>
                </div>

                {/* 4. Secure Handover */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '5px', border: '1px solid #e8dfd3' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1px' }}>
                    <span style={{ fontSize: '8px' }}>🔒</span>
                    <span style={{ fontSize: '5px', fontWeight: 800, backgroundColor: '#f5eee4', color: '#b86538', padding: '1px 2.5px', borderRadius: '2px' }}>SECURITY</span>
                  </div>
                  <h5 style={{ fontSize: '7px', fontWeight: 700, color: '#2d241c', margin: 0 }}>Secure Handover</h5>
                  <span style={{ fontSize: '5.5px', color: '#8a7e72' }}>PIN Security</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1px', fontSize: '6.5px', fontWeight: 700, color: '#b86538' }}>
                    <span>Verified</span>
                    <span style={{ fontSize: '5.5px', color: '#8a7e72', fontWeight: 500 }}>#4921</span>
                  </div>
                </div>
              </div>

              {/* Recent Wardrobe Diagnostics Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '7px', fontWeight: 700, color: '#2d241c' }}>Recent Wardrobe Diagnostics</span>
                <span style={{ fontSize: '5.5px', fontWeight: 700, color: '#8a7e72' }}>HISTORY</span>
              </div>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', padding: '3.5px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e8dfd3' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '7.5px' }}>👔</span>
                  <span style={{ fontSize: '6px', fontWeight: 600, color: '#2d241c' }}>Ultrasonic Steam & Lapel Roll</span>
                </div>
                <span style={{ fontSize: '6px', fontWeight: 700, color: '#b86538' }}>₹490</span>
              </div>
            </div>

            {/* Bottom App Dock */}
            <div style={{ backgroundColor: '#b86538', borderRadius: '18px', margin: '1px 8px 6px 8px', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', color: '#ffffff', fontSize: '6px' }}>
              <div style={{ textAlign: 'center', color: '#ffffff', fontWeight: 700 }}>
                <div>🏠</div>
                <span>Home</span>
              </div>
              <div style={{ textAlign: 'center', opacity: 0.75 }}>
                <div>📅</div>
                <span>Schedule</span>
              </div>
              <div style={{ textAlign: 'center', opacity: 0.75 }}>
                <div>🛍️</div>
                <span>Bag</span>
              </div>
              <div style={{ textAlign: 'center', opacity: 0.75 }}>
                <div>🔒</div>
                <span>Vault</span>
              </div>
              <div style={{ textAlign: 'center', opacity: 0.75 }}>
                <img src={DemoData.user.avatarUrl} alt="Devendra" style={{ width: '9px', height: '9px', borderRadius: '50%', margin: '0 auto', display: 'block' }} />
                <span>Profile</span>
              </div>
            </div>
          </motion.div>

          {/* PHONE 2: PROFILE & MEMBERSHIP VAULT (EXACT CONTENT OF IMAGE 3) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="phone-mockup-frame"
          >

            {/* Authentic iOS Status Bar 9:41 with Vector Icons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px 2px 14px', fontSize: '10px', fontWeight: 700, color: '#1a1714' }}>
              <span>9:41</span>
              {/* Dynamic Island */}
              <div style={{ width: '54px', height: '14px', backgroundColor: '#000000', borderRadius: '10px' }} />
              {/* Authentic iOS Signal, Wi-Fi & Battery Vectors */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#1a1714' }}>
                <svg width="12" height="8" viewBox="0 0 17 11" fill="currentColor">
                  <rect x="0" y="8" width="3" height="3" rx="0.8" />
                  <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.8" />
                  <rect x="9" y="3" width="3" height="8" rx="0.8" />
                  <rect x="13.5" y="0.5" width="3" height="10.5" rx="0.8" />
                </svg>
                <svg width="11" height="8" viewBox="0 0 15 11" fill="currentColor">
                  <path d="M7.5 3.3C9.4 3.3 11.2 4 12.5 5.2L14 3.7C12.3 2.1 9.9 1.1 7.5 1.1C5.1 1.1 2.7 2.1 1 3.7L2.5 5.2C3.8 4 5.6 3.3 7.5 3.3Z" />
                  <path d="M7.5 6.4C8.7 6.4 9.8 6.9 10.6 7.7L12.1 6.2C10.9 5 9.3 4.2 7.5 4.2C5.7 4.2 4.1 5 2.9 6.2L4.4 7.7C5.2 6.9 6.3 6.4 7.5 6.4Z" />
                  <circle cx="7.5" cy="9.8" r="1.2" />
                </svg>
                <svg width="16" height="8" viewBox="0 0 22 11" fill="currentColor">
                  <rect x="0.5" y="0.5" width="19" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1" />
                  <rect x="2" y="2" width="13" height="7" rx="1.5" fill="#1a1714" />
                  <path d="M20.5 3.8C21.3 4.2 21.3 6.8 20.5 7.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* App Screen Content: Image 3 Full Profile & Preferences */}
            <div style={{ flex: 1, padding: '6px 10px', overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              {/* Back Chevron */}
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', marginBottom: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                ‹
              </div>

              {/* Profile Card with Avatar & Platinum Badge */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '8px 6px', textAlign: 'center', border: '1px solid #e8dfd3', boxShadow: '0 2px 6px rgba(45,36,28,0.05)', marginBottom: '5px' }}>
                <img
                  src={DemoData.user.avatarUrl}
                  alt="Devendra Sharma"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 3px auto', border: '1.5px solid #b86538' }}
                />
                <h4 className="font-serif" style={{ fontSize: '12px', fontWeight: 700, color: '#2d241c', margin: '0 0 2px 0' }}>
                  Devendra Sharma
                </h4>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', backgroundColor: '#2d241c', color: '#ffffff', padding: '1.5px 5px', borderRadius: '7px', fontSize: '6px', fontWeight: 700, letterSpacing: '0.4px' }}>
                  <span>★</span>
                  <span>PLATINUM MEMBER</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginTop: '6px', paddingTop: '4px', borderTop: '1px solid #f0e8dc' }}>
                  <div>
                    <span className="font-serif" style={{ fontSize: '11px', fontWeight: 700, color: '#2d241c' }}>₹4,850</span>
                    <span style={{ fontSize: '6px', color: '#8a7e72', display: 'block' }}>Saved this month</span>
                  </div>
                  <div style={{ borderLeft: '1px solid #f0e8dc' }}>
                    <span className="font-serif" style={{ fontSize: '11px', fontWeight: 700, color: '#2d241c' }}>18</span>
                    <span style={{ fontSize: '6px', color: '#8a7e72', display: 'block' }}>Orders Completed</span>
                  </div>
                </div>
              </div>

              {/* Appearance Toggle */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e8dfd3', marginBottom: '4px' }}>
                <div>
                  <h5 style={{ fontSize: '7.5px', fontWeight: 700, color: '#2d241c', margin: 0 }}>Appearance</h5>
                  <span style={{ fontSize: '6px', color: '#8a7e72' }}>Cream paper mode</span>
                </div>
                {/* Switch */}
                <div style={{ width: '22px', height: '12px', backgroundColor: '#00897b', borderRadius: '7px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '1px' }}>
                  <div style={{ width: '9px', height: '9px', backgroundColor: '#ffffff', borderRadius: '50%' }} />
                </div>
              </div>

              {/* Language Chips */}
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontSize: '5.5px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#8a7e72', display: 'block', marginBottom: '2px' }}>
                  LANGUAGE
                </span>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span style={{ backgroundColor: '#2d241c', color: '#ffffff', fontSize: '6px', fontWeight: 700, padding: '2px 5px', borderRadius: '10px' }}>English</span>
                  <span style={{ backgroundColor: '#ffffff', color: '#2d241c', fontSize: '6px', fontWeight: 600, padding: '2px 5px', borderRadius: '10px', border: '1px solid #e8dfd3' }}>हिन्दी</span>
                  <span style={{ backgroundColor: '#ffffff', color: '#2d241c', fontSize: '6px', fontWeight: 600, padding: '2px 5px', borderRadius: '10px', border: '1px solid #e8dfd3' }}>தமிழ்</span>
                  <span style={{ backgroundColor: '#ffffff', color: '#2d241c', fontSize: '6px', fontWeight: 600, padding: '2px 5px', borderRadius: '10px', border: '1px solid #e8dfd3' }}>తెలుగు</span>
                </div>
              </div>

              {/* Preferences & Info */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '5px 8px', border: '1px solid #e8dfd3', fontSize: '6.5px', marginBottom: '3px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '2.5px', borderBottom: '1px solid #f0e8dc' }}>
                  <span style={{ color: '#8a7e72' }}>Signature Scent</span>
                  <span style={{ fontWeight: 700, color: '#b86538' }}>Royal Lavender</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2.5px 0', borderBottom: '1px solid #f0e8dc' }}>
                  <span style={{ color: '#8a7e72' }}>Smart Bag</span>
                  <span style={{ fontWeight: 700, color: '#2d241c' }}>Active (#SB-902)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2.5px' }}>
                  <span style={{ color: '#8a7e72' }}>Registered Phone</span>
                  {/* Masked Phone Number after 4 Digits as xxx */}
                  <span style={{ fontWeight: 600, color: '#2d241c' }}>+91 9876x xxxxx</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '6px', color: '#b86538', fontWeight: 600, padding: '1px 2px' }}>
                <span>Reorder Smart Bag</span>
                <span style={{ color: '#8a7e72' }}>Saved Address: Manage</span>
              </div>
            </div>

            {/* Bottom App Dock */}
            <div style={{ backgroundColor: '#b86538', borderRadius: '18px', margin: '1px 8px 6px 8px', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', color: '#ffffff', fontSize: '6px' }}>
              <div style={{ textAlign: 'center', opacity: 0.75 }}>
                <div>🏠</div>
                <span>Home</span>
              </div>
              <div style={{ textAlign: 'center', opacity: 0.75 }}>
                <div>📅</div>
                <span>Schedule</span>
              </div>
              <div style={{ textAlign: 'center', opacity: 0.75 }}>
                <div>🛍️</div>
                <span>Bag</span>
              </div>
              <div style={{ textAlign: 'center', opacity: 0.75 }}>
                <div>🔒</div>
                <span>Vault</span>
              </div>
              <div style={{ textAlign: 'center', color: '#ffffff', fontWeight: 700 }}>
                <img src={DemoData.user.avatarUrl} alt="Devendra" style={{ width: '9px', height: '9px', borderRadius: '50%', margin: '0 auto', display: 'block', border: '1px solid #fff' }} />
                <span>Profile</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
