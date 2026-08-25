import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { GoldButton } from '../components/GoldButton';
import { InteractiveGarmentHero } from '../components/InteractiveGarmentHero';
import { ThreeDTiltCard } from '../components/ThreeDTiltCard';
import { AppDownloadSection } from '../components/AppDownloadSection';
import { DemoData } from '../data/demoData';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      num: '01',
      title: 'Schedule Doorstep Dispatch',
      desc: 'Select your preferred morning, afternoon, or evening valet window in Indiranagar or central Bengaluru.',
      icon: '📅',
    },
    {
      num: '02',
      title: 'Tamper-Proof Handover',
      desc: 'Garments are placed into a serialized Smart Bag sealed with numeric zip locks and verified via 4-digit OTP.',
      icon: '🔒',
    },
    {
      num: '03',
      title: 'Artisan Steam Crafting',
      desc: 'Individual fabric diagnostics, organic French lavender steam relaxation, and master hand shape resetting.',
      icon: '♨️',
    },
    {
      num: '04',
      title: 'Pristine Return',
      desc: 'Delivered back to your wardrobe in museum-grade presentation form within 24 to 36 hours.',
      icon: '✨',
    },
  ];

  const comparison = [
    {
      feature: 'Fabric Finishing Method',
      rehaboth: 'Low-pressure organic French lavender steam',
      traditional: 'High-temperature industrial plate pressing',
      advantage: true,
    },
    {
      feature: 'Chain of Custody',
      rehaboth: 'NFC-encrypted Smart Bag + serialized numeric tamper seals',
      traditional: 'Paper staple tags with no security seal',
      advantage: true,
    },
    {
      feature: 'Fabric Longevity',
      rehaboth: 'Zero thermal scorching; preserves natural natural drape & fibers',
      traditional: 'Repeated heat causes fiber thinning & shiny glare',
      advantage: true,
    },
    {
      feature: 'Tracking & Transparency',
      rehaboth: 'Live 4-step GPS vault pipeline with assigned valet contact',
      traditional: 'Opaque timelines with unpredictable pickup delays',
      advantage: true,
    },
  ];

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopHeaderNav />

      <PageTransition className="main-content" style={{ flex: 1, maxWidth: '1180px', margin: '0 auto', width: '100%', paddingBottom: '32px' }}>
        
        {/* 1. INTERACTIVE GARMENT HERO SECTION (MATCHING NEW REFERENCE IMAGE) */}
        <section style={{ paddingTop: '16px', paddingBottom: '32px' }}>
          <InteractiveGarmentHero />
        </section>

        {/* 2. THE 4-STEP VALET EXPERIENCE (WITH 3D TILT CARDS & ANIMATED FLOATING ICONS - IMAGE 2) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
              HOW REHABOTH STEAM WORKS
            </span>
            <h2 className="font-serif section-headline">
              The Four Pillars of Seamless Valet Care
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {steps.map((s, idx) => (
              <ThreeDTiltCard
                key={s.num}
                delay={idx * 0.1}
                style={{
                  padding: '28px 24px',
                  backgroundColor: 'var(--bg-card)',
                  minHeight: '220px',
                  borderRadius: '24px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <span className="font-serif" style={{ fontSize: '34px', fontWeight: 700, color: 'var(--color-primary)', opacity: 0.9, lineHeight: 1 }}>
                      {s.num}
                    </span>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(45, 36, 28, 0.06)',
                        transform: 'translateZ(30px)',
                      }}
                    >
                      <span style={{ fontSize: '20px', lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        {s.icon}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '19px', marginBottom: '8px', color: 'var(--color-foreground)' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-muted-foreground)' }}>
                    {s.desc}
                  </p>
                </div>
              </ThreeDTiltCard>
            ))}

          </div>
        </motion.section>


        {/* 3. ATELIER STUDIO SERVICES CATALOG (WITH 3D TILT INTERACTION - IMAGE 3) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '6px' }}>
                SIGNATURE FINISHING
              </span>
              <h2 className="font-serif section-headline">
                Curated Studio Offerings
              </h2>
            </div>
            <Link to="/schedule" style={{ fontSize: '12.5px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-primary)', textDecoration: 'none' }}>
              Schedule Service Pickup →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {DemoData.services.map((svc, idx) => (
              <ThreeDTiltCard
                key={svc.id}
                delay={idx * 0.1}
                onClick={() => navigate(svc.id === 'smart-bag-token' ? '/smart-bag' : '/schedule')}
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--bg-card)',
                  minHeight: '220px',
                  borderRadius: '24px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-primary)', backgroundColor: 'var(--bg-secondary)', padding: '4px 10px', borderRadius: '4px' }}>
                      {svc.badge}
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--color-muted-foreground)' }}>
                      ⏱ {svc.turnaround}
                    </span>
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '20px', marginBottom: '6px', color: 'var(--color-foreground)' }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-muted-foreground)', lineHeight: 1.5 }}>
                    {svc.category}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', paddingTop: '14px', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <span className="font-serif" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {svc.price}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-foreground)' }}>
                    Book Valet →
                  </span>
                </div>
              </ThreeDTiltCard>
            ))}
          </div>
        </motion.section>


        {/* 4. SMART BAG SPOTLIGHT SHOWCASE */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="luxury-card"
          style={{
            padding: 'clamp(24px, 4vw, 40px)',
            marginBottom: '64px',
            backgroundColor: '#1f1b17',
            color: '#ffffff',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '36px',
            alignItems: 'center',
            borderRadius: '28px',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#d68b61', display: 'block', marginBottom: '10px' }}>
              HARDWARE & CRYPTOGRAPHIC TOKEN
            </span>
            <h2 className="font-serif section-headline" style={{ lineHeight: 1.15, marginBottom: '14px' }}>
              The Signature Smart Garment Bag
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#c4baa9', marginBottom: '24px' }}>
              Crafted with heavy breathable organic cotton twill, solid brass hardware, and an embedded NTAG213 cryptographic microchip that connects with your private reserve digital vault.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <div>
                <span className="font-serif" style={{ fontSize: '32px', fontWeight: 700, color: '#d68b61' }}>₹999</span>
                <span style={{ fontSize: '12px', color: '#a89f92', display: 'block' }}>Lifetime token & presentation box</span>
              </div>
              <div style={{ width: '1px', height: '36px', backgroundColor: '#3a3128' }} />
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>4 Garment Capacity</span>
                <span style={{ fontSize: '12px', color: '#a89f92', display: 'block' }}>Suits, couture & trench coats</span>
              </div>
            </div>

            <Link
              to="/smart-bag"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                backgroundColor: '#b86538',
                color: '#ffffff',
                borderRadius: 'var(--radius-pill)',
                fontSize: '12.5px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(184, 101, 56, 0.4)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Order Smart Bag — ₹999 →
            </Link>
          </div>

          <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}>
            <img
              src={DemoData.smartBag.image}
              alt="Rehaboth Smart Garment Bag"
              style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </motion.section>


        {/* 5. WHY REHABOTH STEAM (COMPARISON TABLE) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
              THE REHABOTH DISTINCTION
            </span>
            <h2 className="font-serif section-headline">
              Why Discerning Wardrobes Choose Us
            </h2>
          </div>

          <div className="luxury-card" style={{ padding: '0', overflow: 'hidden', backgroundColor: 'var(--bg-card)', borderRadius: '24px' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ padding: '16px 24px', fontWeight: 700 }}>Feature</th>
                    <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--color-primary)' }}>Rehaboth Steam Atelier</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--color-muted-foreground)' }}>Traditional Dry Cleaners</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: idx < comparison.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}>
                      <td style={{ padding: '16px 24px', fontWeight: 600 }}>{item.feature}</td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-foreground)', fontWeight: 500 }}>
                        <span style={{ color: 'var(--color-green-accent)', marginRight: '6px', fontWeight: 700 }}>✓</span>
                        {item.rehaboth}
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--color-muted-foreground)' }}>
                        <span style={{ color: '#d9534f', marginRight: '6px' }}>✕</span>
                        {item.traditional}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>


        {/* 6. MEMBER TESTIMONIALS */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
              PRIVATE RESERVE VOICES
            </span>
            <h2 className="font-serif section-headline">
              Loved by Discerning Wardrobes
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {DemoData.testimonials.map((t, idx) => (
              <ThreeDTiltCard
                key={t.id}
                delay={idx * 0.1}
                style={{
                  padding: '32px 28px',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '24px',
                }}
              >
                <div>
                  {/* Rating Stars */}
                  <div style={{ color: 'var(--color-primary)', fontSize: '16px', marginBottom: '14px' }}>
                    {'★'.repeat(t.rating)}
                  </div>
                  
                  {/* Quote */}
                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-foreground)', fontStyle: 'italic', marginBottom: '24px' }}>
                    "{t.quote}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <img
                    src={t.avatar}
                    alt={t.author}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--color-primary)' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-foreground)' }}>
                      {t.author}
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground)', display: 'block' }}>
                      {t.location} • <strong style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{t.garment}</strong>
                    </span>
                  </div>
                </div>
              </ThreeDTiltCard>
            ))}
          </div>
        </motion.section>


        {/* 7. PRIVATE RESERVE MOBILE APP DOWNLOAD SECTION (DUAL PHONE MOCKUPS WITH PLAY STORE & APP STORE LINKS) */}
        <AppDownloadSection />


        {/* 8. FINAL CALL TO ACTION BANNER */}
        <motion.section

          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="luxury-card"
          style={{
            padding: 'clamp(32px, 5vw, 48px) clamp(20px, 4vw, 32px)',
            textAlign: 'center',
            backgroundColor: 'var(--bg-secondary)',
            border: '1.5px solid var(--color-primary)',
            borderRadius: '28px',
            marginBottom: '32px',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '10px' }}>
            ELEVATE YOUR WARDROBE CARE
          </span>
          <h2 className="font-serif section-headline" style={{ marginBottom: '12px' }}>
            Experience Indiranagar’s Premier Valet Press
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-muted-foreground)', maxWidth: '580px', margin: '0 auto 28px auto' }}>
            Book your doorstep collection today. Our verified studio valets provide contactless pickup with tamper-evident chain of custody.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <GoldButton
              title="BOOK DOORSTEP PICKUP NOW"
              onClick={() => navigate('/schedule')}
              showArrow={true}
            />
            <Link
              to="/help"
              style={{
                padding: '16px 28px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-foreground)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Frequently Asked Questions →
            </Link>
          </div>
        </motion.section>

      </PageTransition>

      <WebsiteFooter />
      <FloatingDockNav />
    </div>
  );
};
