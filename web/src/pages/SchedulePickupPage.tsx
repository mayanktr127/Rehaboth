import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { GoldButton } from '../components/GoldButton';


export const SchedulePickupPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState('evening');
  const [address, setAddress] = useState('Flat 402, Sterling Palms, 12th Main, Indiranagar');

  const dates = [
    { day: 'TODAY', date: '25 AUG', index: 0 },
    { day: 'TOMORROW', date: '26 AUG', index: 1 },
    { day: 'WED', date: '27 AUG', index: 2 },
    { day: 'THU', date: '28 AUG', index: 3 },
  ];

  const slots = [
    { id: 'morning', label: 'Morning Slot', time: '08:00 AM – 11:00 AM' },
    { id: 'afternoon', label: 'Afternoon Slot', time: '01:00 PM – 04:00 PM' },
    { id: 'evening', label: 'Evening Valet', time: '05:30 PM – 08:30 PM', popular: true },
  ];

  const handleConfirm = () => {
    navigate('/secure-handover');
  };

  return (
    <div className="app-container">
      <TopHeaderNav showBack={true} />

      <PageTransition className="main-content">
        <section style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2.4px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)', marginBottom: '4px' }}>
            STUDIO VALET LOGISTICS
          </p>
          <h1 className="font-serif" style={{ fontSize: '32px', letterSpacing: '-0.4px' }}>
            Schedule Pickup
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--color-muted-foreground)', marginTop: '4px' }}>
            Select your preferred doorstep valet dispatch window.
          </p>
        </section>

        {/* Date Selector Row */}
        <section style={{ marginBottom: '28px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)', display: 'block', marginBottom: '12px' }}>
            PICKUP DATE
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {dates.map((d) => {
              const active = selectedDate === d.index;
              return (
                <button
                  key={d.index}
                  onClick={() => setSelectedDate(d.index)}
                  style={{
                    padding: '14px 8px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: active ? 'var(--color-primary)' : 'var(--bg-card)',
                    border: `1.5px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    color: active ? '#ffffff' : 'var(--color-foreground)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: active ? 'var(--shadow-md)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px' }}>{d.day}</span>
                  <span className="font-serif" style={{ fontSize: '15px', fontWeight: 700 }}>{d.date}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Time Slot Selector */}
        <section style={{ marginBottom: '28px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)', display: 'block', marginBottom: '12px' }}>
            VALET TIME WINDOW
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {slots.map((s) => {
              const active = selectedSlot === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedSlot(s.id)}
                  className="luxury-card"
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: active ? 'var(--bg-card-subtle)' : 'var(--bg-card)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>{s.label}</span>
                      {s.popular && (
                        <span style={{ fontSize: '9px', fontWeight: 700, backgroundColor: 'var(--color-primary)', color: '#ffffff', padding: '2px 6px', borderRadius: '4px' }}>
                          MOST POPULAR
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '12.5px', color: 'var(--color-muted-foreground)' }}>{s.time}</span>
                  </div>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: `2px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      backgroundColor: active ? 'var(--color-primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {active && <span style={{ color: '#ffffff', fontSize: '11px' }}>✓</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Address Card */}
        <section className="luxury-card" style={{ padding: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
              PICKUP LOCATION
            </span>
            <button style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)' }}>
              Change
            </button>
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: '4px' }}>
            {address}
          </p>
          <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>
            Includes doorstep contactless handover & tamper tag scan.
          </span>
        </section>

        {/* CTA Button */}
        <section style={{ display: 'flex', justifyContent: 'center' }}>
          <GoldButton
            title="CONFIRM VALET PICKUP"
            onClick={handleConfirm}
            showArrow={true}
          />
        </section>
      </PageTransition>

      <WebsiteFooter />
      <FloatingDockNav />
    </div>
  );
};

