import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { BrandLogoIcon } from '../components/BrandLogoIcon';
import { GoldButton } from '../components/GoldButton';
import { DemoData } from '../data/demoData';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Multi-step onboarding: 'welcome' | 'credentials' | 'otp'
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

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Clean, Minimalist Brand Header */}
      <header style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
        <span className="font-serif" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-foreground)', letterSpacing: '-0.5px' }}>
          Rehaboth Steam
        </span>
      </header>


      {/* Main Landing & Onboarding Content */}
      <PageTransition className="main-content" style={{ flex: 1, maxWidth: '1080px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '440px', width: '100%', margin: '0 auto' }}>
          
          {/* STEP 1: WELCOME SCREEN */}
          {step === 'welcome' && (
            <div
              className="luxury-card"
              style={{
                padding: '40px 32px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-md)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              {/* Brand Emblem Puck matching App Screen */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '18px',
                    backgroundColor: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 18px rgba(184, 101, 56, 0.3)',
                  }}
                >
                  <span style={{ fontSize: '28px', color: '#ffffff' }}>♨</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif" style={{ fontSize: '36px', lineHeight: 1.15, letterSpacing: '-0.6px', marginBottom: '14px' }}>
                Welcome<br />to Rehaboth
              </h1>

              {/* Artistic Doodle Shapes Pattern */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: 'var(--color-border)', fontSize: '18px', marginBottom: '16px', userSelect: 'none' }}>
                <span>◯</span>
                <span>✕</span>
                <span>△</span>
                <span>✱</span>
                <span>〜</span>
              </div>

              {/* Subtitle Lines */}
              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-foreground)' }}>
                  Made for wardrobes.
                </p>
                <p style={{ fontSize: '13.5px', color: 'var(--color-muted-foreground)' }}>
                  Designed for people.
                </p>
              </div>

              {/* Auth Action Buttons Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* 1. Continue with Google */}
                <button
                  onClick={handleStartAuth}
                  style={{
                    padding: '14px 20px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: '#2b2621',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease',
                    border: 'none',
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: '15px' }}>G</span>
                  <span>Continue with Google</span>
                </button>

                {/* 2. Sign in with Apple */}
                <button
                  onClick={handleStartAuth}
                  style={{
                    padding: '14px 20px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: '#2b2621',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease',
                    border: 'none',
                  }}
                >
                  <span style={{ fontSize: '16px' }}></span>
                  <span>Sign in with Apple</span>
                </button>

                {/* 3. Continue with Email */}
                <button
                  onClick={handleStartAuth}
                  style={{
                    padding: '14px 20px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-foreground)',
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

                {/* 4. Demo Credentials Primary Access */}
                <button
                  onClick={handleStartAuth}
                  style={{
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(184, 101, 56, 0.3)',
                    marginTop: '6px',
                    transition: 'all 0.2s ease',
                    border: 'none',
                  }}
                >
                  <span>GET STARTED (DEMO CREDENTIALS) →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DEMO CREDENTIALS FORM */}
          {step === 'credentials' && (
            <div
              className="luxury-card"
              style={{
                padding: '36px 32px',
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-md)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                  DEMO ONBOARDING
                </span>
                <h2 className="font-serif" style={{ fontSize: '28px', letterSpacing: '-0.3px', marginTop: '4px' }}>
                  Member Registration
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--color-muted-foreground)', marginTop: '4px' }}>
                  Pre-filled with demo credentials for instant access.
                </p>
              </div>

              {/* Language Selector */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)', display: 'block', marginBottom: '10px' }}>
                  CHOOSE YOUR LANGUAGE
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
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-pill)',
                          backgroundColor: isSelected ? 'var(--color-foreground)' : 'var(--bg-secondary)',
                          color: isSelected ? '#ffffff' : 'var(--color-foreground)',
                          fontSize: '12px',
                          fontWeight: isSelected ? 600 : 500,
                          cursor: 'pointer',
                          border: 'none',
                        }}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)', display: 'block', marginBottom: '6px' }}>
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--bg-secondary)',
                      fontSize: '14px',
                      color: 'var(--color-foreground)',
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)', display: 'block', marginBottom: '6px' }}>
                    MOBILE NUMBER
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--color-border)', fontSize: '13.5px', fontWeight: 700 }}>
                      IN +91
                    </div>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--bg-secondary)',
                        fontSize: '14px',
                        color: 'var(--color-foreground)',
                      }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)', display: 'block', marginBottom: '6px' }}>
                    EMAIL ADDRESS (OPTIONAL)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--bg-secondary)',
                      fontSize: '14px',
                      color: 'var(--color-foreground)',
                    }}
                  />
                </div>

                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <GoldButton
                    title="SEND VERIFICATION OTP"
                    type="submit"
                    showArrow={true}
                  />
                  <button
                    type="button"
                    onClick={() => setStep('welcome')}
                    style={{ fontSize: '12.5px', color: 'var(--color-muted-foreground)', cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}
                  >
                    ← Back to Welcome Options
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: OTP VERIFICATION SCREEN */}
          {step === 'otp' && (
            <div
              className="luxury-card"
              style={{
                padding: '40px 32px',
                textAlign: 'center',
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-md)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px auto' }}>
                🔒
              </div>

              <h2 className="font-serif" style={{ fontSize: '28px', letterSpacing: '-0.3px', marginBottom: '8px' }}>
                Verify Your Number
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--color-muted-foreground)', lineHeight: 1.5, marginBottom: '28px' }}>
                Enter the 4-digit code sent to <strong>+91 {mobileNumber}</strong> to elevate your wardrobe care.
              </p>

              {/* Pre-filled 4-Digit OTP Boxes */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
                {otp.map((digit, idx) => (
                  <div
                    key={idx}
                    className="font-serif"
                    style={{
                      width: '58px',
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

              <span style={{ fontSize: '12.5px', color: 'var(--color-muted-foreground)', display: 'block', marginBottom: '28px' }}>
                Resend code in <strong>01:30</strong>
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <GoldButton
                  title="VERIFY & ENTER STUDIO"
                  onClick={handleVerifyOtp}
                  showArrow={true}
                />
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  style={{ fontSize: '12.5px', color: 'var(--color-muted-foreground)', cursor: 'pointer', padding: '6px', background: 'none', border: 'none' }}
                >
                  ← Edit Phone Number
                </button>
              </div>
            </div>
          )}

        </div>
      </PageTransition>
    </div>
  );
};
