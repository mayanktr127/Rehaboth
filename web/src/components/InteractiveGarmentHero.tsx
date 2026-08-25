import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GoldButton } from './GoldButton';

interface HotspotInfo {
  id: string;
  top: string;
  left?: string;
  right?: string;
  tooltipPos: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
  badge: string;
  title: string;
  desc: string;
}

export const InteractiveGarmentHero: React.FC = () => {
  const navigate = useNavigate();
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const hotspots: HotspotInfo[] = [
    {
      id: 'dot-teal',
      top: '26%',
      left: '12%',
      tooltipPos: 'bottom-left',
      badge: 'TOP LAYER • TEAL WOOL',
      title: 'Highland Alpaca & Fine Wool',
      desc: 'Infused with organic French lavender micro-steam to naturally relax fibers without thermal crushing.',
    },
    {
      id: 'dot-terracotta',
      top: '46%',
      left: '9%',
      tooltipPos: 'bottom-left',
      badge: 'MID LAYER • CASHMERE',
      title: 'Pure Mongolian Cashmere',
      desc: 'Individual hand-restoration preserving the plush tactile softness and architectural drape.',
    },
    {
      id: 'dot-blue',
      top: '30%',
      right: '11%',
      tooltipPos: 'bottom-right',
      badge: 'TOP LAYER • SKY BLUE',
      title: 'Fine Silk-Cotton Blend',
      desc: 'Low-pressure artisan shaping eliminating luster shine and iron plate burn.',
    },
    {
      id: 'dot-mustard',
      top: '52%',
      right: '8%',
      tooltipPos: 'bottom-right',
      badge: 'BASE LAYER • MERINO',
      title: 'Extra-Fine Italian Merino',
      desc: 'Sealed inside serialized tamper-proof Smart Bags with NFC vault verification.',
    },
  ];

  const floatingCards = [
    {
      icon: '👕',
      text: 'Soft, fresh, and revitalized garments',
    },
    {
      icon: '🌿',
      text: 'Odors and bacteria cleared with care',
    },
    {
      icon: '🔒',
      text: 'Tamper-proof vault chain of custody',
    },
    {
      icon: '♨️',
      text: 'Expertly steam pressed for pristine results',
    },
    {
      icon: '✨',
      text: 'Delicate fabrics treated with expertise',
    },
    {
      icon: '🛎️',
      text: '24 Hours reception and valet open daily',
    },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1100px', margin: '0 auto', paddingTop: '16px', paddingBottom: '40px' }}>
      
      {/* 1. Centered Header & Intro */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 32px auto', padding: '0 8px' }}>
        {/* Top Tag Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--color-border)',
            marginBottom: '16px',
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
            ATELIER STEAM & WARDROBE VALET
          </span>
        </motion.div>

        {/* Main Display Headline (Responsive Font Clamp) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif hero-headline"
          style={{
            color: 'var(--color-foreground)',
            marginBottom: '16px',
          }}
        >
          Delivering excellence <br />
          every step ahead
        </motion.h1>

        {/* Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '15.5px',
            lineHeight: 1.65,
            color: 'var(--color-muted-foreground)',
            maxWidth: '640px',
            margin: '0 auto 28px auto',
          }}
        >
          Preserving the natural texture, architectural drape, and tactile longevity of fine luxury fabrics with organic French lavender steam and encrypted Smart Bag custody.
        </motion.p>

        {/* Action Button Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}
        >
          <GoldButton
            title="Get Started"
            onClick={() => navigate('/schedule')}
            showArrow={true}
          />
          <Link
            to="/help"
            style={{
              padding: '14px 26px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-foreground)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(45, 36, 28, 0.04)',
              transition: 'all 0.2s ease',
            }}
          >
            Contact with us
          </Link>
        </motion.div>
      </div>

      {/* 2. Interactive Garment Showcase with Callout Cards */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '440px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '16px',
        }}
      >
        {/* Background Sunburst Ray (Top Left) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '-20px',
            left: '8%',
            fontSize: '38px',
            opacity: 0.25,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          ☀️
        </motion.div>

        {/* Background Sparkles (Top Right) */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '10%',
            fontSize: '32px',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          ✨
        </motion.div>

        {/* Central Hands Holding Folded Garments Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            maxWidth: '460px',
            borderRadius: '28px',
            overflow: 'visible',
            boxShadow: '0 20px 50px rgba(45, 36, 28, 0.14)',
          }}
        >
          <div style={{ borderRadius: '28px', overflow: 'hidden', width: '100%', position: 'relative' }}>
            <img
              src="/hero_garment_stack.jpg"
              alt="Delivering excellence every step ahead - Rehaboth Steam"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Interactive Stack Hover Dots (Hotspots with Animated Tooltip Details) */}
          {hotspots.map((spot) => {
            const isHovered = activeHotspot === spot.id;

            return (
              <div
                key={spot.id}
                style={{
                  position: 'absolute',
                  top: spot.top,
                  left: spot.left,
                  right: spot.right,
                  zIndex: isHovered ? 40 : 20,
                }}
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(isHovered ? null : spot.id)}
              >
                {/* Hotspot Outer Pulsing Ring */}
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    left: '-6px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(184, 101, 56, 0.35)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Hotspot Inner Solid Dot */}
                <motion.button
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: 'relative',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    border: '2.5px solid #ffffff',
                    boxShadow: '0 2px 10px rgba(45, 36, 28, 0.35)',
                    cursor: 'pointer',
                    outline: 'none',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label={spot.title}
                >
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
                </motion.button>

                {/* Animated Hover Tooltip Popover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: spot.tooltipPos.includes('bottom') ? 8 : -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88, y: spot.tooltipPos.includes('bottom') ? 8 : -8 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: 'absolute',
                        top: spot.tooltipPos.includes('bottom') ? '28px' : 'auto',
                        bottom: spot.tooltipPos.includes('top') ? '28px' : 'auto',
                        left: spot.left ? '0' : 'auto',
                        right: spot.right ? '0' : 'auto',
                        width: 'min(240px, 80vw)',
                        padding: '14px 16px',
                        backgroundColor: '#2d241c',
                        color: '#ffffff',
                        borderRadius: '16px',
                        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.28)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        zIndex: 50,
                      }}
                    >
                      <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '1.2px', color: '#e5b88f', display: 'block', marginBottom: '4px' }}>
                        {spot.badge}
                      </span>
                      <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px 0' }}>
                        {spot.title}
                      </h5>
                      <p style={{ fontSize: '11.5px', color: '#cfc6be', lineHeight: 1.45, margin: 0 }}>
                        {spot.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* DESKTOP FLOATING CARDS (Hidden on screens <= 880px) */}
        <div className="hero-floating-desktop">
          {/* Left Top Card */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="luxury-card"
            style={{
              position: 'absolute',
              top: '8%',
              left: '2%',
              zIndex: 10,
              maxWidth: '210px',
              padding: '16px 18px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              boxShadow: '0 12px 30px rgba(45, 36, 28, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>
                👕
              </div>
              <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 1.4, margin: 0 }}>
                Soft, fresh, and revitalized garments
              </p>
            </div>
          </motion.div>

          {/* Left Middle Card */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="luxury-card"
            style={{
              position: 'absolute',
              top: '48%',
              left: '2%',
              zIndex: 10,
              maxWidth: '210px',
              padding: '16px 18px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              boxShadow: '0 12px 30px rgba(45, 36, 28, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>
                🌿
              </div>
              <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 1.4, margin: 0 }}>
                Odors and bacteria cleared with care
              </p>
            </div>
          </motion.div>

          {/* Left Bottom Card */}
          <motion.div
            className="luxury-card"
            style={{
              position: 'absolute',
              bottom: '4%',
              left: '2%',
              zIndex: 10,
              maxWidth: '210px',
              padding: '16px 18px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              boxShadow: '0 12px 30px rgba(45, 36, 28, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>
                🔒
              </div>
              <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 1.4, margin: 0 }}>
                Tamper-proof vault chain of custody
              </p>
            </div>
          </motion.div>

          {/* Right Top Card */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="luxury-card"
            style={{
              position: 'absolute',
              top: '8%',
              right: '2%',
              zIndex: 10,
              maxWidth: '210px',
              padding: '16px 18px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              boxShadow: '0 12px 30px rgba(45, 36, 28, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>
                ♨️
              </div>
              <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 1.4, margin: 0 }}>
                Expertly steam pressed for pristine results
              </p>
            </div>
          </motion.div>

          {/* Right Middle Card */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            className="luxury-card"
            style={{
              position: 'absolute',
              top: '48%',
              right: '2%',
              zIndex: 10,
              maxWidth: '210px',
              padding: '16px 18px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              boxShadow: '0 12px 30px rgba(45, 36, 28, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>
                ✨
              </div>
              <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 1.4, margin: 0 }}>
                Delicate fabrics treated with expertise
              </p>
            </div>
          </motion.div>

          {/* Right Bottom Card */}
          <motion.div
            className="luxury-card"
            style={{
              position: 'absolute',
              bottom: '4%',
              right: '2%',
              zIndex: 10,
              maxWidth: '210px',
              padding: '16px 18px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              boxShadow: '0 12px 30px rgba(45, 36, 28, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>
                🛎️
              </div>
              <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 1.4, margin: 0 }}>
                24 Hours reception and valet open daily
              </p>
            </div>
          </motion.div>
        </div>

        {/* MOBILE & TABLET RESPONSIVE CARDS GRID (Shown on screens <= 880px) */}
        <div className="hero-floating-mobile">
          {floatingCards.map((card, idx) => (
            <div
              key={idx}
              className="luxury-card"
              style={{
                padding: '14px 16px',
                borderRadius: '18px',
                backgroundColor: 'var(--bg-card)',
                boxShadow: '0 4px 16px rgba(45, 36, 28, 0.06)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                {card.icon}
              </div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 1.4, margin: 0 }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
