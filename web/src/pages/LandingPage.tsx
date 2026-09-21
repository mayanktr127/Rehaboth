import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoldButton } from '../components/GoldButton';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { DemoData } from '../data/demoData';
import '../styles/landing.css';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Multi-step onboarding states: 'welcome' | 'credentials' | 'otp'
  const [step, setStep] = useState<'welcome' | 'credentials' | 'otp'>('welcome');
  const [selectedLang, setSelectedLang] = useState('English');
  const [fullName, setFullName] = useState(DemoData.user.fullName);
  const [mobileNumber, setMobileNumber] = useState('98765 43210');
  const [email, setEmail] = useState('devendra@gmail.com');
  const [otp] = useState(['2', '1', '9', '4']);

  const languages = ['English', 'हिन्दी', 'தமிழ்', 'తెలుగు'];

  const handleStartAuth = () => {
    setStep('credentials');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    navigate('/');
  };

  const scrollToAuth = () => {
    const el = document.getElementById('concierge-portal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-root">
      {/* 1. Luxury Sticky Top Header */}
      <header className="landing-nav-header">
        <div className="landing-nav-inner">
          <Link to="/" className="landing-logo">
            <div className="landing-logo-emblem">♨</div>
            <span>Rehaboth Steam</span>
          </Link>

          <nav className="landing-nav-links">
            <a href="#the-craft" className="landing-nav-link">The Craft</a>
            <a href="#smart-bag" className="landing-nav-link">Smart Bag</a>
            <a href="#fragrances" className="landing-nav-link">Botanical Scents</a>
            <a href="#journey" className="landing-nav-link">Valet Journey</a>
            <a href="#comparison" className="landing-nav-link">Atelier Standard</a>
          </nav>

          <div className="landing-nav-cta-group">
            <button
              type="button"
              className="landing-btn-secondary"
              onClick={scrollToAuth}
            >
              Member Sign In
            </button>
            <Link to="/schedule" className="landing-btn-primary">
              Book Valet →
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Modern Asymmetrical Hero Section */}
      <section className="landing-hero-section">
        <div className="landing-hero-grid">
          {/* Left: Brand Narrative & Key Metrics */}
          <div>
            <div className="landing-eyebrow">
              <span>✦</span>
              <span>BENGALURU'S PRIVATE VALET STEAM ATELIER</span>
            </div>

            <h1 className="landing-hero-title">
              Master Garment Finishing, <em>Preserved</em> for Generations.
            </h1>

            <p className="landing-hero-subtitle">
              Low-pressure French lavender steam relaxation, tamper-proof Smart Bag custody,
              and 24-hour white-glove valet return for silks, cashmere, wool suits, and bespoke couture.
            </p>

            {/* Quick Metrics Bar */}
            <div className="landing-hero-stats-row">
              <div className="landing-stat-item">
                <span className="landing-stat-value">42,000+</span>
                <span className="landing-stat-label">Garments Restored</span>
              </div>
              <div className="landing-stat-item">
                <span className="landing-stat-value">0%</span>
                <span className="landing-stat-label">Thermal Scorching</span>
              </div>
              <div className="landing-stat-item">
                <span className="landing-stat-value">24h</span>
                <span className="landing-stat-label">Doorstep Return</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <Link to="/schedule" className="landing-btn-primary" style={{ padding: '13px 26px', fontSize: '0.9rem' }}>
                Schedule Doorstep Pickup →
              </Link>
              <button
                type="button"
                className="landing-btn-secondary"
                style={{ padding: '13px 24px', fontSize: '0.9rem' }}
                onClick={scrollToAuth}
              >
                Instant Member Access
              </button>
            </div>

            <div className="landing-service-strip">
              <span className="landing-service-pin">📍</span>
              <span>Daily valet corridors: Indiranagar, Defence Colony, Koramangala &amp; Central Bengaluru</span>
            </div>
          </div>

          {/* Right: Embedded Interactive Concierge Card */}
          <div className="landing-auth-wrapper" id="concierge-portal">
            <div className="landing-auth-card">
              {/* STEP 1: WELCOME ONBOARDING */}
              {step === 'welcome' && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '16px',
                        backgroundColor: 'var(--color-primary, #b86538)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 6px 20px rgba(184, 101, 56, 0.35)',
                      }}
                    >
                      <span style={{ fontSize: '26px', color: '#ffffff' }}>♨</span>
                    </div>
                  </div>

                  <h2
                    className="font-serif"
                    style={{
                      fontSize: '32px',
                      lineHeight: 1.15,
                      letterSpacing: '-0.5px',
                      marginBottom: '12px',
                      color: 'var(--color-foreground, #1a1714)',
                    }}
                  >
                    Welcome<br />to Rehaboth
                  </h2>

                  {/* Aesthetic Doodle Shapes */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '18px',
                      color: '#d6cbbe',
                      fontSize: '17px',
                      marginBottom: '14px',
                      userSelect: 'none',
                    }}
                  >
                    <span>◯</span>
                    <span>✕</span>
                    <span>△</span>
                    <span>✱</span>
                    <span>〜</span>
                  </div>

                  <div style={{ marginBottom: '28px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-foreground, #1a1714)' }}>
                      Made for wardrobes.
                    </p>
                    <p style={{ fontSize: '13.5px', color: 'var(--color-muted-foreground, #7d7265)' }}>
                      Designed for people.
                    </p>
                  </div>

                  {/* Auth Actions Stack */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={handleStartAuth}
                      style={{
                        padding: '13px 20px',
                        borderRadius: '9999px',
                        backgroundColor: '#1f1a16',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span style={{ fontWeight: 800, fontSize: '15px' }}>G</span>
                      <span>Continue with Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStartAuth}
                      style={{
                        padding: '13px 20px',
                        borderRadius: '9999px',
                        backgroundColor: '#1f1a16',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span style={{ fontSize: '16px' }}></span>
                      <span>Sign in with Apple</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStartAuth}
                      style={{
                        padding: '13px 20px',
                        borderRadius: '9999px',
                        backgroundColor: '#f2e8dc',
                        border: '1.5px solid #e6dcce',
                        color: 'var(--color-foreground, #1a1714)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>✉</span>
                      <span>Continue with email</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStartAuth}
                      style={{
                        padding: '14px 20px',
                        borderRadius: '9999px',
                        backgroundColor: 'var(--color-primary, #b86538)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        letterSpacing: '0.8px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(184, 101, 56, 0.3)',
                        marginTop: '4px',
                        border: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>INSTANT DEMO ACCESS →</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CREDENTIALS FORM */}
              {step === 'credentials' && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary, #b86538)' }}>
                      ATELIER ONBOARDING
                    </span>
                    <h3 className="font-serif" style={{ fontSize: '26px', letterSpacing: '-0.3px', margin: '4px 0' }}>
                      Member Registration
                    </h3>
                    <p style={{ fontSize: '12.5px', color: 'var(--color-muted-foreground, #7d7265)' }}>
                      Pre-filled credentials for instant studio access.
                    </p>
                  </div>

                  {/* Language Selector */}
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-muted-foreground, #7d7265)', display: 'block', marginBottom: '8px' }}>
                      SELECT LANGUAGE
                    </span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {languages.map((lang) => {
                        const isSelected = selectedLang === lang;
                        return (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setSelectedLang(lang)}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '9999px',
                              backgroundColor: isSelected ? 'var(--color-primary, #b86538)' : '#f2e8dc',
                              color: isSelected ? '#ffffff' : 'var(--color-foreground, #1a1714)',
                              fontSize: '11.5px',
                              fontWeight: isSelected ? 700 : 600,
                              cursor: 'pointer',
                              border: 'none',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {lang}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-muted-foreground, #7d7265)', display: 'block', marginBottom: '5px' }}>
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--color-border, #e6dcce)',
                          backgroundColor: '#ffffff',
                          fontSize: '13.5px',
                          color: 'var(--color-foreground, #1a1714)',
                          boxSizing: 'border-box',
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-muted-foreground, #7d7265)', display: 'block', marginBottom: '5px' }}>
                        MOBILE NUMBER
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ padding: '11px 12px', borderRadius: '10px', backgroundColor: '#f2e8dc', border: '1.5px solid var(--color-border, #e6dcce)', fontSize: '13px', fontWeight: 700 }}>
                          IN +91
                        </div>
                        <input
                          type="text"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          style={{
                            flex: 1,
                            padding: '11px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid var(--color-border, #e6dcce)',
                            backgroundColor: '#ffffff',
                            fontSize: '13.5px',
                            color: 'var(--color-foreground, #1a1714)',
                            boxSizing: 'border-box',
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-muted-foreground, #7d7265)', display: 'block', marginBottom: '5px' }}>
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--color-border, #e6dcce)',
                          backgroundColor: '#ffffff',
                          fontSize: '13.5px',
                          color: 'var(--color-foreground, #1a1714)',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <GoldButton
                        title="SEND VERIFICATION OTP"
                        type="submit"
                        showArrow={true}
                      />
                      <button
                        type="button"
                        onClick={() => setStep('welcome')}
                        style={{ fontSize: '12px', color: 'var(--color-muted-foreground, #7d7265)', cursor: 'pointer', padding: '6px', background: 'none', border: 'none', fontWeight: 600 }}
                      >
                        ← Back to Options
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 3: OTP VERIFICATION */}
              {step === 'otp' && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#f2e8dc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', margin: '0 auto 12px auto' }}>
                    🔒
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '24px', letterSpacing: '-0.3px', marginBottom: '6px' }}>
                    Verify Your Mobile
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-muted-foreground, #7d7265)', lineHeight: 1.5, marginBottom: '20px' }}>
                    Enter the code sent to <strong>+91 {mobileNumber}</strong>.
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
                    {otp.map((digit, idx) => (
                      <div
                        key={idx}
                        className="font-serif"
                        style={{
                          width: '52px',
                          height: '58px',
                          borderRadius: '10px',
                          backgroundColor: '#faf6ef',
                          border: '2px solid var(--color-primary, #b86538)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '26px',
                          fontWeight: 700,
                          color: 'var(--color-foreground, #1a1714)',
                        }}
                      >
                        {digit}
                      </div>
                    ))}
                  </div>

                  <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground, #7d7265)', display: 'block', marginBottom: '24px' }}>
                    Resend code in <strong>01:30</strong>
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <GoldButton
                      title="VERIFY &amp; ENTER ATELIER"
                      onClick={handleVerifyOtp}
                      showArrow={true}
                    />
                    <button
                      type="button"
                      onClick={() => setStep('credentials')}
                      style={{ fontSize: '12px', color: 'var(--color-muted-foreground, #7d7265)', cursor: 'pointer', padding: '6px', background: 'none', border: 'none', fontWeight: 600 }}
                    >
                      ← Change Phone Number
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Fabric Science Bento Grid */}
      <section className="landing-bento-section" id="the-craft">
        <div className="landing-section-header">
          <div className="landing-eyebrow">
            <span>THE FABRIC SCIENCE</span>
          </div>
          <h2 className="landing-section-title">
            Engineered for Delicate Fibers, Refined for Modern Living.
          </h2>
          <p className="landing-section-desc">
            Traditional industrial flat-bed irons subject fabrics to up to 220°C of metal contact pressure,
            flattening fibers and generating an unnatural glossy sheen. Our process is different.
          </p>
        </div>

        <div className="landing-bento-grid">
          {/* Card 1: Low-Pressure Micro-Steam */}
          <div className="landing-bento-card">
            <div>
              <div className="landing-bento-icon">♨️</div>
              <h3 className="landing-bento-title">Low-Pressure Vapor Relaxation</h3>
              <p className="landing-bento-text">
                Rather than compressing fabrics between hot metal plates, our master artisans use continuous
                micro-mist vapor to relax weave tension from within. Natural drape, volume, and softness are restored.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ padding: '6px 12px', borderRadius: '8px', background: '#faf5ee', fontSize: '12px', fontWeight: 700, color: 'var(--color-primary, #b86538)' }}>
                Zero Fiber Sheen
              </span>
              <span style={{ padding: '6px 12px', borderRadius: '8px', background: '#faf5ee', fontSize: '12px', fontWeight: 700, color: 'var(--color-primary, #b86538)' }}>
                Silk &amp; Tweed Safe
              </span>
              <span style={{ padding: '6px 12px', borderRadius: '8px', background: '#faf5ee', fontSize: '12px', fontWeight: 700, color: 'var(--color-primary, #b86538)' }}>
                Hand Shape Resetting
              </span>
            </div>
          </div>

          {/* Card 2: Smart Bag & NFC Tech */}
          <div className="landing-bento-card" id="smart-bag">
            <div>
              <div className="landing-bento-icon">🛍️</div>
              <h3 className="landing-bento-title">NFC Encrypted Smart Bag</h3>
              <p className="landing-bento-text">
                Every wardrobe order travels in a water-repellent, heavy-duty canvas Smart Bag equipped with
                serialized tamper-proof numeric locks and NFC verification.
              </p>
            </div>
            <div style={{ padding: '12px 14px', borderRadius: '12px', background: '#faf5ee', border: '1px solid var(--color-border, #e6dcce)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary, #b86538)', display: 'block', letterSpacing: '1px' }}>
                CHAIN OF CUSTODY
              </span>
              <span style={{ fontSize: '13px', color: 'var(--color-foreground, #1a1714)', fontWeight: 600 }}>
                Locked at your doorstep. Unsealed only inside the studio.
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Botanical Fragrance Infusions */}
        <div className="landing-bento-card" id="fragrances" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div className="landing-bento-icon">🌿</div>
              <h3 className="landing-bento-title">Artisan Botanical Fragrance Infusions</h3>
              <p className="landing-bento-text" style={{ maxWidth: '640px', marginBottom: 0 }}>
                Finished garments are gently misted with calibrated natural botanical essences,
                leaving your wardrobe subtly refreshed without synthetic chemical perfumes.
              </p>
            </div>
            <Link to="/schedule" className="landing-btn-secondary">
              Select Your Fragrance →
            </Link>
          </div>

          <div className="landing-scents-grid">
            <div className="landing-scent-pill">
              <span>🪻</span>
              <div>
                <span style={{ display: 'block' }}>Kashmir Lavender</span>
                <small style={{ fontSize: '11px', color: 'var(--color-muted-foreground, #7d7265)', fontWeight: 500 }}>
                  French organic lavender for evening wear &amp; relaxation
                </small>
              </div>
            </div>

            <div className="landing-scent-pill">
              <span>🪵</span>
              <div>
                <span style={{ display: 'block' }}>Mysore Royal Sandalwood</span>
                <small style={{ fontSize: '11px', color: 'var(--color-muted-foreground, #7d7265)', fontWeight: 500 }}>
                  Warm regal sandalwood crafted for formal suits &amp; silks
                </small>
              </div>
            </div>

            <div className="landing-scent-pill">
              <span>🧺</span>
              <div>
                <span style={{ display: 'block' }}>Fresh Crisp Cotton</span>
                <small style={{ fontSize: '11px', color: 'var(--color-muted-foreground, #7d7265)', fontWeight: 500 }}>
                  Light sunny morning breeze for daily linens &amp; shirts
                </small>
              </div>
            </div>

            <div className="landing-scent-pill">
              <span>✨</span>
              <div>
                <span style={{ display: 'block' }}>Hypoallergenic Pure Neutral</span>
                <small style={{ fontSize: '11px', color: 'var(--color-muted-foreground, #7d7265)', fontWeight: 500 }}>
                  100% steam distilled pure water for sensitive skin
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The 4-Pillar Valet Journey */}
      <section className="landing-steps-section" id="journey">
        <div className="landing-section-header">
          <div className="landing-eyebrow">
            <span>THE VALET JOURNEY</span>
          </div>
          <h2 className="landing-section-title">
            Four Steps from Your Hanger to Perfection.
          </h2>
          <p className="landing-section-desc">
            Experience effortless white-glove wardrobe maintenance without leaving your home.
          </p>
        </div>

        <div className="landing-steps-grid">
          <div className="landing-step-card">
            <div className="landing-step-num">01</div>
            <h4 className="landing-step-title">Doorstep Collection</h4>
            <p className="landing-step-desc">
              Your valet arrives in your scheduled morning or evening window. Garments are sealed into a serialized Smart Bag.
            </p>
          </div>

          <div className="landing-step-card">
            <div className="landing-step-num">02</div>
            <h4 className="landing-step-title">Fabric Diagnostics</h4>
            <p className="landing-step-desc">
              In-studio technician inspects seams, buttons, and fabric weave. Pre-existing wear is flagged before processing.
            </p>
          </div>

          <div className="landing-step-card">
            <div className="landing-step-num">03</div>
            <h4 className="landing-step-title">Artisan Steam Press</h4>
            <p className="landing-step-desc">
              Low-pressure botanical steam relaxes creases and restores natural drape. Hand-shaped on tailored atelier forms.
            </p>
          </div>

          <div className="landing-step-card">
            <div className="landing-step-num">04</div>
            <h4 className="landing-step-title">Pristine Return</h4>
            <p className="landing-step-desc">
              Delivered on contoured wooden hangers in breathable covers within 24 to 36 hours. Handed over via 4-digit PIN.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Comparison Matrix Section */}
      <section className="landing-comparison-section" id="comparison">
        <div className="landing-section-header">
          <div className="landing-eyebrow">
            <span>THE ATELIER ADVANTAGE</span>
          </div>
          <h2 className="landing-section-title">
            Conventional Pressing vs. Rehaboth Steam
          </h2>
        </div>

        <table className="landing-compare-table">
          <thead>
            <tr>
              <th>WARDROBE STANDARD</th>
              <th>REHABOTH STEAM ATELIER</th>
              <th>CONVENTIONAL DRY CLEANERS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 700 }}>Finishing Heat Source</td>
              <td className="landing-badge-rehaboth">
                <span>✓</span> Low-pressure organic botanical vapor
              </td>
              <td className="landing-badge-conventional">
                Flat high-heat metal plates (up to 220°C)
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>Chain of Custody</td>
              <td className="landing-badge-rehaboth">
                <span>✓</span> Encrypted NFC Smart Bag with serialized locks
              </td>
              <td className="landing-badge-conventional">
                Stapled paper tags without security seals
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>Fabric Longevity</td>
              <td className="landing-badge-rehaboth">
                <span>✓</span> Zero fiber compression, preserves natural weave
              </td>
              <td className="landing-badge-conventional">
                Gradual thinning, shiny seams, and scorched edges
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>Fragrance &amp; Freshness</td>
              <td className="landing-badge-rehaboth">
                <span>✓</span> 4 organic botanical essences or pure neutral
              </td>
              <td className="landing-badge-conventional">
                Chemical solvent fumes and stale steam odors
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>Valet Turnaround</td>
              <td className="landing-badge-rehaboth">
                <span>✓</span> Scheduled 24-hour return with GPS tracking
              </td>
              <td className="landing-badge-conventional">
                Unpredictable 3-to-5 day waits with manual visits
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 6. Member Testimonials */}
      <section className="landing-reviews-section">
        <div className="landing-section-header">
          <div className="landing-eyebrow">
            <span>MEMBER EXPERIENCES</span>
          </div>
          <h2 className="landing-section-title">
            Trusted by Bangalore's Most Discerning Wardrobes.
          </h2>
        </div>

        <div className="landing-reviews-grid">
          <div className="landing-review-card">
            <p className="landing-review-text">
              "My bespoke Italian suits never go to ordinary dry cleaners anymore. The lavender steam finishing restores the lapel roll without leaving that awful shiny glare."
            </p>
            <div className="landing-reviewer-info">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Devendra Sharma"
                className="landing-reviewer-avatar"
              />
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-foreground, #1a1714)', display: 'block' }}>
                  Devendra Sharma
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-primary, #b86538)', fontWeight: 600 }}>
                  Private Reserve Member • Indiranagar
                </span>
              </div>
            </div>
          </div>

          <div className="landing-review-card">
            <p className="landing-review-text">
              "The Smart Bag concept is brilliant. The bag is locked at my door and only opened at the atelier. When my silk saris came back with the Mysore Sandalwood aroma, I was sold."
            </p>
            <div className="landing-reviewer-info">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Priya Sundaram"
                className="landing-reviewer-avatar"
              />
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-foreground, #1a1714)', display: 'block' }}>
                  Priya Sundaram
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-primary, #b86538)', fontWeight: 600 }}>
                  Couture Collector • Defence Colony
                </span>
              </div>
            </div>
          </div>

          <div className="landing-review-card">
            <p className="landing-review-text">
              "Punctual valet runs, spotless hangers, and zero chemical odor. Rehaboth Steam has completely changed how our household handles luxury garments."
            </p>
            <div className="landing-reviewer-info">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Arvind Swamy"
                className="landing-reviewer-avatar"
              />
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-foreground, #1a1714)', display: 'block' }}>
                  Arvind Swamy
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-primary, #b86538)', fontWeight: 600 }}>
                  Architectural Director • Koramangala
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. High-Impact Closing Banner */}
      <section className="landing-cta-banner">
        <h2>Your finest garments deserve more than a hot metal plate.</h2>
        <p>
          Schedule your first doorstep valet collection today. Complimentary Smart Bag provided with all first-time atelier wardrobe reservations.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/schedule"
            className="landing-btn-primary"
            style={{ padding: '14px 32px', fontSize: '0.95rem' }}
          >
            Book Doorstep Valet →
          </Link>
          <button
            type="button"
            className="landing-btn-secondary"
            style={{ padding: '14px 28px', fontSize: '0.95rem' }}
            onClick={scrollToAuth}
          >
            Member Sign In
          </button>
        </div>
      </section>

      {/* 8. Full Luxury Website Footer */}
      <WebsiteFooter />
    </div>
  );
};
