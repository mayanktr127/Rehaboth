import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { DemoData } from '../data/demoData';


export const OrderStatusPage: React.FC = () => {
  return (
    <div className="app-container">
      <TopHeaderNav showBack={true} />

      <PageTransition className="main-content">
        <section style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
              LIVE CUSTODY VAULT
            </span>
          </div>
          <h1 className="font-serif" style={{ fontSize: '32px', letterSpacing: '-0.4px' }}>
            {DemoData.activeOrder.orderNumber}
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--color-muted-foreground)', marginTop: '4px' }}>
            {DemoData.activeOrder.studioLocation}
          </p>
        </section>

        {/* Real-Time Stepper Pipeline */}
        <section className="luxury-card" style={{ padding: '24px', marginBottom: '28px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)', display: 'block', marginBottom: '20px' }}>
            FABRIC RESTORATION PIPELINE
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            {DemoData.activeOrder.steps.map((step, idx) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: step.completed ? 'var(--color-primary)' : step.current ? 'var(--bg-card)' : 'var(--bg-card)',
                    border: step.current ? '2.5px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                    color: step.completed ? '#ffffff' : 'var(--color-foreground)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    zIndex: 2,
                  }}
                >
                  {step.completed ? '✓' : step.current ? '•' : ''}
                </div>

                <div style={{ flex: 1, paddingBottom: idx < DemoData.activeOrder.steps.length - 1 ? '12px' : '0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: step.current ? 700 : 600, color: step.pending ? 'var(--color-muted-foreground)' : 'var(--color-foreground)' }}>
                      {step.label}
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>
                      {step.time}
                    </span>
                  </div>
                  {step.current && (
                    <p style={{ fontSize: '12.5px', color: 'var(--color-primary)', marginTop: '4px', fontWeight: 500 }}>
                      Artisan steam finish and anti-static cedar misting in progress.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assigned Valet Custodian Card */}
        <section className="luxury-card" style={{ padding: '20px', marginBottom: '28px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)', display: 'block', marginBottom: '12px' }}>
            ASSIGNED STUDIO VALET
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                👔
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{DemoData.activeOrder.custodianPartner}</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>{DemoData.activeOrder.custodianRating}</p>
              </div>
            </div>

            <a
              href={`tel:${DemoData.activeOrder.custodianPhone}`}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-pill)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-primary)',
              }}
            >
              📞 Call Valet
            </a>
          </div>
        </section>

        {/* Tamper Seal & Vault Security */}
        <section className="luxury-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-secondary)', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
              TAMPER SEAL SERIAL
            </span>
            <p className="font-serif" style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px' }}>
              {DemoData.activeOrder.tamperSealNumber}
            </p>
          </div>
          <Link
            to="/secure-handover"
            style={{
              padding: '10px 18px',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-pill)',
              fontSize: '11.5px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Verify OTP
          </Link>
        </section>
      </PageTransition>

      <WebsiteFooter />
      <FloatingDockNav />
    </div>
  );
};

