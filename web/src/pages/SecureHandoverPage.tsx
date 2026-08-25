import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { GoldButton } from '../components/GoldButton';

export const SecureHandoverPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp] = useState(['8', '4', '9', '2']);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerified(true);
    setTimeout(() => {
      navigate('/order-status');
    }, 1000);
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopHeaderNav />

      <PageTransition className="main-content" style={{ flex: 1 }}>
        <section style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px auto' }}>
            🔒
          </div>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
            DIGITAL TAMPER HANDOVER
          </span>
          <h1 className="font-serif" style={{ fontSize: '30px', letterSpacing: '-0.4px', marginTop: '4px' }}>
            Secure Valet OTP
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--color-muted-foreground)', marginTop: '4px' }}>
            Share this 4-digit code with your doorstep valet partner upon collection.
          </p>
        </section>

        {/* OTP Digits Card */}
        <section className="luxury-card" style={{ padding: '32px 20px', textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '20px' }}>
            {otp.map((digit, idx) => (
              <div
                key={idx}
                className="font-serif"
                style={{
                  width: '56px',
                  height: '64px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '2px solid var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'var(--color-foreground)',
                }}
              >
                {digit}
              </div>
            ))}
          </div>

          <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>
            Expires automatically after valet scanning.
          </span>
        </section>

        {/* Security Checklist */}
        <section className="luxury-card" style={{ padding: '20px', marginBottom: '32px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)', display: 'block', marginBottom: '12px' }}>
            CHAIN OF CUSTODY ASSURANCE
          </span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--color-foreground)' }}>
            <li>✓ Valet partner is verified with background credentials</li>
            <li>✓ Garments are sealed in RFID tamper-proof garment bag</li>
            <li>✓ Live GPS tracker active from collection to Indiranagar studio</li>
          </ul>
        </section>

        <section style={{ display: 'flex', justifyContent: 'center' }}>
          <GoldButton
            title={verified ? "HANDOVER VERIFIED ✓" : "CONFIRM HANDOVER"}
            onClick={handleVerify}
            showArrow={!verified}
          />
        </section>
      </PageTransition>

      <WebsiteFooter />
      <FloatingDockNav />
    </div>
  );
};

