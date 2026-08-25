import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { WebsiteFooter } from '../components/WebsiteFooter';

export const SelectLocationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('indiranagar');

  const locations = [
    { id: 'indiranagar', name: 'Indiranagar Atelier', area: '100ft Road, Bangalore', status: 'Active Valet Hub', popular: true },
    { id: 'koramangala', name: 'Koramangala Studio', area: '4th Block, Bangalore', status: 'Active Valet Hub' },
    { id: 'lavelle-road', name: 'Lavelle Road Flagship', area: 'Central Bangalore', status: 'Active Valet Hub' },
    { id: 'whitefield', name: 'Whitefield Studio', area: 'Prestige Boulevard', status: 'Coming Soon' },
  ];

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopHeaderNav />

      <PageTransition className="main-content" style={{ flex: 1 }}>
        <section style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
            STUDIO NETWORK
          </span>
          <h1 className="font-serif" style={{ fontSize: '32px', letterSpacing: '-0.4px', marginTop: '2px' }}>
            Select Atelier Studio
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--color-muted-foreground)', marginTop: '4px' }}>
            Choose your servicing atelier studio for wardrobe pickups and returns.
          </p>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {locations.map((loc) => {
            const isSelected = selected === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => {
                  if (loc.status !== 'Coming Soon') {
                    setSelected(loc.id);
                    setTimeout(() => navigate(-1), 250);
                  }
                }}
                className="luxury-card"
                style={{
                  padding: '20px',
                  cursor: loc.status === 'Coming Soon' ? 'not-allowed' : 'pointer',
                  opacity: loc.status === 'Coming Soon' ? 0.6 : 1,
                  border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? 'var(--bg-card-subtle)' : 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{loc.name}</h4>
                    {loc.popular && (
                      <span style={{ fontSize: '9px', fontWeight: 700, backgroundColor: 'var(--color-primary)', color: '#ffffff', padding: '2px 6px', borderRadius: '4px' }}>
                        YOUR CURRENT
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-muted-foreground)', marginTop: '2px' }}>{loc.area}</p>
                </div>

                <span style={{ fontSize: '12px', fontWeight: 600, color: loc.status === 'Coming Soon' ? 'var(--color-muted-foreground)' : 'var(--color-primary)' }}>
                  {loc.status}
                </span>
              </div>
            );
          })}
        </section>
      </PageTransition>

      <WebsiteFooter />
      <FloatingDockNav />
    </div>
  );
};

