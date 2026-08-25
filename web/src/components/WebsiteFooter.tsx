import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogoIcon } from './BrandLogoIcon';

export const WebsiteFooter: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#1f1b17',
        color: '#e6ded4',
        paddingTop: '64px',
        paddingBottom: '40px',
        marginTop: '64px',
        borderTop: '1px solid #332d26',
      }}
    >
      <div
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Top Grid (4 Columns) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span className="font-serif" style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>
                Rehaboth Steam
              </span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#a89f92', marginBottom: '20px' }}>
              Preserving the architectural structure, tactile elegance, and heritage fibers of Bangalore's finest wardrobes since 2023.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', backgroundColor: '#2d2720', borderRadius: '20px', fontSize: '11.5px', color: '#d68b61' }}>
              <span>🔒</span>
              <span>Tamper-Proof Valet Handover</span>
            </div>
          </div>

          {/* Column 2: Studio Services */}
          <div>
            <h4 className="font-serif" style={{ fontSize: '17px', color: '#ffffff', marginBottom: '18px' }}>
              Studio Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li>
                <Link to="/schedule" style={{ color: '#c4baa9', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#d68b61')} onMouseLeave={(e) => (e.currentTarget.style.color = '#c4baa9')}>
                  Silk & Tweed Lavender Press
                </Link>
              </li>
              <li>
                <Link to="/schedule" style={{ color: '#c4baa9', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#d68b61')} onMouseLeave={(e) => (e.currentTarget.style.color = '#c4baa9')}>
                  Wool Suit Micro-Steam Reset
                </Link>
              </li>
              <li>
                <Link to="/schedule" style={{ color: '#c4baa9', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#d68b61')} onMouseLeave={(e) => (e.currentTarget.style.color = '#c4baa9')}>
                  Designer Couture Hand-Care
                </Link>
              </li>
              <li>
                <Link to="/smart-bag" style={{ color: '#c4baa9', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#d68b61')} onMouseLeave={(e) => (e.currentTarget.style.color = '#c4baa9')}>
                  Signature Smart Bag (₹999)
                </Link>
              </li>
              <li>
                <Link to="/order-status" style={{ color: '#c4baa9', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#d68b61')} onMouseLeave={(e) => (e.currentTarget.style.color = '#c4baa9')}>
                  Live GPS Valet Custody Vault
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier & Navigation */}
          <div>
            <h4 className="font-serif" style={{ fontSize: '17px', color: '#ffffff', marginBottom: '18px' }}>
              Atelier & Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li>
                <Link to="/about" style={{ color: '#c4baa9', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#d68b61')} onMouseLeave={(e) => (e.currentTarget.style.color = '#c4baa9')}>
                  About Our Craft & Heritage
                </Link>
              </li>
              <li>
                <Link to="/select-location" style={{ color: '#c4baa9', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#d68b61')} onMouseLeave={(e) => (e.currentTarget.style.color = '#c4baa9')}>
                  Studio Network (Indiranagar)
                </Link>
              </li>
              <li>
                <Link to="/help" style={{ color: '#c4baa9', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#d68b61')} onMouseLeave={(e) => (e.currentTarget.style.color = '#c4baa9')}>
                  Frequently Asked Questions & Support
                </Link>
              </li>
              <li>
                <Link to="/landing" style={{ color: '#c4baa9', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#d68b61')} onMouseLeave={(e) => (e.currentTarget.style.color = '#c4baa9')}>
                  Welcome Onboarding
                </Link>
              </li>
            </ul>
          </div>


          {/* Column 4: Valet Operating Hours & Address */}
          <div>
            <h4 className="font-serif" style={{ fontSize: '17px', color: '#ffffff', marginBottom: '18px' }}>
              Indiranagar Studio
            </h4>
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#c4baa9', marginBottom: '12px' }}>
              📍 482, 100ft Road, Defence Colony, Indiranagar, Bengaluru, Karnataka 560038
            </p>
            <p style={{ fontSize: '13px', color: '#c4baa9', marginBottom: '6px' }}>
              ⏱ <strong>Valet Runs:</strong> 7:00 AM – 10:00 PM (Daily)
            </p>
            <p style={{ fontSize: '13px', color: '#c4baa9', marginBottom: '16px' }}>
              📞 <strong>Hotline:</strong> +91 98450 12345
            </p>
            <Link
              to="/schedule"
              style={{
                display: 'inline-block',
                padding: '10px 18px',
                backgroundColor: '#b86538',
                color: '#ffffff',
                borderRadius: '20px',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Book Doorstep Valet
            </Link>
          </div>
        </div>

        {/* Bottom Horizontal Bar */}
        <div
          style={{
            borderTop: '1px solid #2d2720',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '12.5px',
            color: '#82786a',
          }}
        >
          <div>
            © 2026 Rehaboth Steam Atelier. All Rights Reserved. Master garment finishing & smart wardrobe vaulting.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/help" style={{ color: '#82786a' }}>Privacy Policy</Link>
            <Link to="/help" style={{ color: '#82786a' }}>Terms of Valet</Link>
            <Link to="/about" style={{ color: '#82786a' }}>Atelier Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
