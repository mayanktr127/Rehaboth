import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { ThreeDTiltCard } from '../components/ThreeDTiltCard';
import { DemoData } from '../data/demoData';

export const HelpCenterPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopHeaderNav />

      <PageTransition className="main-content" style={{ flex: 1, maxWidth: '960px', margin: '0 auto', width: '100%', paddingBottom: '32px' }}>
        
        {/* Editorial Header with Scroll Animation */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '28px' }}
        >
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
            STUDIO ASSISTANCE
          </span>
          <h1 className="font-serif" style={{ fontSize: '36px', letterSpacing: '-0.5px', marginTop: '4px' }}>
            Help & FAQ Support
          </h1>
          <p style={{ fontSize: '14.5px', color: 'var(--color-muted-foreground)', marginTop: '6px' }}>
            Frequently asked questions, valet guidelines, and direct studio lines.
          </p>
        </motion.section>

        {/* Quick Action Channels Grid with Native Website Content & Clean Inline Icons */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '44px' }}
        >
          {/* Phone Hotline Card */}
          <a
            href="tel:+919845012345"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ThreeDTiltCard
              delay={0.1}
              style={{
                padding: '36px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '28px',
                minHeight: '230px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px', color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                    01 • DIRECT PHONE
                  </span>
                  <div style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                </div>

                <h3 className="font-serif" style={{ fontSize: '25px', marginTop: '12px', marginBottom: '12px', color: 'var(--color-foreground)' }}>
                  Indiranagar Studio Hotline
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-muted-foreground)' }}>
                  +91 98450 12345 • Operational daily from 7:00 AM to 10:00 PM for private concierge & scheduling.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', marginTop: '16px' }}>
                <span>Call Studio Line</span>
                <span>→</span>
              </div>
            </ThreeDTiltCard>
          </a>

          {/* WhatsApp Card */}
          <a
            href="https://wa.me/919845012345"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ThreeDTiltCard
              delay={0.2}
              style={{
                padding: '36px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '28px',
                minHeight: '230px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px', color: 'var(--color-green-accent)', textTransform: 'uppercase' }}>
                    02 • WHATSAPP VALET
                  </span>
                  <div style={{ color: 'var(--color-green-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                </div>

                <h3 className="font-serif" style={{ fontSize: '25px', marginTop: '12px', marginBottom: '12px', color: 'var(--color-foreground)' }}>
                  Instant WhatsApp Desk
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--color-muted-foreground)' }}>
                  Chat directly with our valet coordinators for custom pickup timings & questions.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--color-green-accent)', marginTop: '16px' }}>
                <span>Start WhatsApp Chat</span>
                <span>→</span>
              </div>
            </ThreeDTiltCard>
          </a>

        </motion.section>



        {/* Studio FAQ Accordion with Smooth On-Scroll & Expand Transitions */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '48px' }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)', display: 'block', marginBottom: '16px' }}>
            FREQUENTLY ASKED QUESTIONS
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {DemoData.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="luxury-card"
                  style={{
                    padding: '20px 24px',
                    cursor: 'pointer',
                    borderRadius: '20px',
                    backgroundColor: 'var(--bg-card)',
                    border: isOpen ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                    transition: 'border 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <h4 className="font-serif" style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-foreground)' }}>
                      {faq.q}
                    </h4>
                    <span
                      style={{
                        fontSize: '14px',
                        color: isOpen ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      ▼
                    </span>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ fontSize: '14px', color: 'var(--color-muted-foreground)', marginTop: '14px', lineHeight: 1.6, borderTop: '1px solid var(--color-border-subtle)', paddingTop: '12px' }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

      </PageTransition>

      <WebsiteFooter />
      <FloatingDockNav />
    </div>
  );
};
