import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { GoldButton } from '../components/GoldButton';
import { ThreeDTiltCard } from '../components/ThreeDTiltCard';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const standards = [
    {
      badge: '01 • CRAFT STANDARD',
      title: 'Artisan French Lavender Steam',
      desc: 'Unlike industrial dry cleaners that crush delicate fibers with heated steel plates, our studio utilizes precision low-pressure micro-steam infused with organic French lavender oils to relax fibers naturally.',
      icon: '♨️',
    },
    {
      badge: '02 • CUSTODIAN PROTOCOL',
      title: 'Smart Bag Chain of Custody',
      desc: 'Every collection is placed in a serialized, tamper-proof Smart Bag sealed with single-use numeric zip locks and encrypted with NFC tracking chips to ensure flawless chain of custody from your wardrobe to our studio.',
      icon: '🔒',
    },
  ];

  const stats = [
    {
      value: '1,000+',
      label: 'Garments Restored Weekly',
      icon: '✨',
    },
    {
      value: '4.9 ★',
      label: 'Private Reserve Satisfaction',
      icon: '⭐',
    },
    {
      value: '24-36h',
      label: 'White-Glove Turnaround',
      icon: '⏱️',
    },
  ];

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopHeaderNav />

      <PageTransition className="main-content" style={{ flex: 1, maxWidth: '1120px', margin: '0 auto', width: '100%', paddingBottom: '32px' }}>
        
        {/* Editorial Header */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', paddingTop: '36px', paddingBottom: '52px', maxWidth: '820px', margin: '0 auto' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-pill)', marginBottom: '16px', border: '1px solid var(--color-border)' }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
              ATELIER CRAFT & HERITAGE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-serif"
            style={{ fontSize: '46px', lineHeight: 1.14, letterSpacing: '-1px', marginBottom: '18px', color: 'var(--color-foreground)' }}
          >
            Restoring the Architecture of Fine Garments
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ fontSize: '16px', lineHeight: 1.68, color: 'var(--color-muted-foreground)' }}
          >
            Founded on 100ft Road in Indiranagar, Rehaboth Steam was born out of a singular obsession: preserving the drape, hand-feel, and longevity of luxury fabrics without harsh chemicals or thermal crushing.
          </motion.p>
        </motion.section>

        {/* Our Philosophy Grid (with 3D Cursor Tilt Cards) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '56px' }}
        >
          {standards.map((item, idx) => (
            <ThreeDTiltCard
              key={idx}
              delay={idx * 0.15}
              style={{
                padding: '36px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '28px',
                minHeight: '230px',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px', color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                  {item.badge}
                </span>
                <h3 className="font-serif" style={{ fontSize: '25px', marginTop: '12px', marginBottom: '12px', color: 'var(--color-foreground)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-muted-foreground)' }}>
                  {item.desc}
                </p>
              </div>
            </ThreeDTiltCard>
          ))}
        </motion.section>


        {/* Studio Statistics (3D Tilt Cards) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '56px' }}
        >
          {stats.map((s, idx) => (
            <ThreeDTiltCard
              key={idx}
              delay={idx * 0.1}
              style={{
                padding: '28px 24px',
                textAlign: 'center',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '24px',
                border: '1px solid var(--color-border)',
              }}
            >
              <div>
                <span className="font-serif" style={{ fontSize: '38px', fontWeight: 700, color: 'var(--color-primary)', display: 'block' }}>
                  {s.value}
                </span>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-foreground)', display: 'block', marginTop: '6px' }}>
                  {s.label}
                </span>
              </div>
            </ThreeDTiltCard>
          ))}
        </motion.section>

        {/* Studio Location & Visit Banner */}
        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="luxury-card"
          style={{
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '40px',
            borderRadius: '28px',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <div>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
              FLAGSHIP ATELIER
            </span>
            <h3 className="font-serif" style={{ fontSize: '28px', marginTop: '6px', marginBottom: '8px', color: 'var(--color-foreground)' }}>
              Visit Indiranagar Studio
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-muted-foreground)', maxWidth: '520px', lineHeight: 1.6 }}>
              482, 100ft Road, Defence Colony, Indiranagar, Bangalore • Open daily 7:00 AM to 10:00 PM for walk-ins, consultations, and private collections.
            </p>
          </div>

          <GoldButton
            title="SCHEDULE VALET PICKUP"
            onClick={() => navigate('/schedule')}
            showArrow={true}
          />
        </motion.section>

      </PageTransition>

      <WebsiteFooter />
      <FloatingDockNav />
    </div>
  );
};
