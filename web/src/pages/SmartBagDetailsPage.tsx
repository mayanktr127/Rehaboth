import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { WebsiteFooter } from '../components/WebsiteFooter';
import { GoldButton } from '../components/GoldButton';
import { ShoppingBagsIcon, PadlockIcon } from '../components/ServiceIcons';
import { DemoData } from '../data/demoData';

export const SmartBagDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'security' | 'care'>('specs');

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => {
      navigate('/schedule');
    }, 900);
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopHeaderNav />

      <PageTransition className="main-content" style={{ flex: 1, maxWidth: '1140px', margin: '0 auto', width: '100%', paddingBottom: '40px' }}>
        {/* Breadcrumb Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--color-muted-foreground)', marginBottom: '28px' }}>
          <Link to="/" style={{ color: 'var(--color-muted-foreground)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/schedule" style={{ color: 'var(--color-muted-foreground)', textDecoration: 'none' }}>Atelier Studio</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Signature Smart Garment Bag</span>
        </nav>

        {/* 2-Column Luxury Product Detail Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'start', marginBottom: '64px' }}>
          
          {/* Left Column: Product Imagery & Badges */}
          <div>
            <div
              className="luxury-card"
              style={{
                padding: '0',
                overflow: 'hidden',
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
                backgroundColor: '#f3ece3',
              }}
            >
              <img
                src={DemoData.smartBag.image}
                alt="Rehaboth Signature Smart Garment Bag"
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />

              {/* Floating Technology Badges */}
              <div style={{ position: 'absolute', top: '18px', left: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(26, 23, 20, 0.9)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ffffff',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                  }}
                >
                  NFC VAULT TOKEN EMBEDDED
                </span>
                <span
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    width: 'fit-content',
                  }}
                >
                  ATMOSPHERIC WEATHER SHIELD
                </span>
              </div>
            </div>

            {/* Product Key Points Mini-Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
              <div className="luxury-card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🔒</span>
                <div>
                  <h5 style={{ fontSize: '12.5px', fontWeight: 700 }}>Single-Use Zip Locks</h5>
                  <span style={{ fontSize: '11px', color: 'var(--color-muted-foreground)' }}>Tamper-proof seal</span>
                </div>
              </div>

              <div className="luxury-card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>📶</span>
                <div>
                  <h5 style={{ fontSize: '12.5px', fontWeight: 700 }}>Instant Tap-to-Track</h5>
                  <span style={{ fontSize: '11px', color: 'var(--color-muted-foreground)' }}>NFC & QR integrated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Detail, Price, Description & Purchase Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Header info */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', color: 'var(--color-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                RS-48721 • SIGNATURE COLLECTION
              </span>
              <h1 className="font-serif" style={{ fontSize: '38px', lineHeight: 1.15, letterSpacing: '-0.8px', color: 'var(--color-foreground)', marginBottom: '8px' }}>
                Rehaboth Signature Smart Garment Bag
              </h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)', fontWeight: 700 }}>
                  <span>★</span>
                  <span>4.8</span>
                </div>
                <span style={{ color: 'var(--color-border)' }}>|</span>
                <span style={{ color: 'var(--color-muted-foreground)' }}>342 Verified Atelier Reviews</span>
                <span style={{ color: 'var(--color-border)' }}>|</span>
                <span style={{ color: 'var(--color-green-accent)', fontWeight: 600 }}>In Stock (Indiranagar Hub)</span>
              </div>
            </div>

            {/* Price Card */}
            <div style={{ padding: '16px 20px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'baseline', gap: '14px' }}>
              <span className="font-serif" style={{ fontSize: '36px', fontWeight: 700, color: 'var(--color-primary)' }}>
                ₹999
              </span>
              <span style={{ fontSize: '13px', color: 'var(--color-muted-foreground)' }}>
                Includes Lifetime NFC Cryptographic Token & Presentation Box
              </span>
            </div>

            {/* Editorial Description */}
            <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--color-muted-foreground)' }}>
              Engineered specifically for bespoke wool suits, evening gowns, and fine silks. Features an encrypted cryptographic NFC token that pairs automatically with your Rehaboth Steam vault for contactless, tamper-proof valet handovers.
            </p>

            {/* Quantity Selector & Specs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-muted-foreground)' }}>
                QUANTITY:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--bg-card)', padding: '2px 8px' }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: 'var(--color-foreground)' }}
                >
                  −
                </button>
                <span style={{ padding: '0 12px', fontSize: '14px', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: 'var(--color-foreground)' }}
                >
                  +
                </button>
              </div>

              <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>
                Holds up to 4 heavy garments
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              <GoldButton
                title={added ? "ADDED TO VALET CART ✓" : `ADD TO CART • ₹${999 * quantity}`}
                onClick={handleAddToCart}
                showArrow={!added}
                className="w-full"
              />

              <Link
                to="/schedule"
                style={{
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-foreground)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                SCHEDULE PICKUP WITH SMART BAG →
              </Link>
            </div>

            {/* Packaging Assurance Note */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: 'var(--color-muted-foreground)' }}>
              <span>📦</span>
              <span>Delivered in signature Rehaboth Steam embossed presentation box with 5 serialized tamper seals.</span>
            </div>

          </div>
        </div>

        {/* Detailed Product Specifications & Tabs */}
        <section className="luxury-card" style={{ padding: '36px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '24px' }}>
            <button
              onClick={() => setActiveTab('specs')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: activeTab === 'specs' ? 700 : 500,
                color: activeTab === 'specs' ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                borderBottom: activeTab === 'specs' ? '2px solid var(--color-primary)' : 'none',
                paddingBottom: '8px',
                cursor: 'pointer',
              }}
            >
              Specifications & Material
            </button>
            <button
              onClick={() => setActiveTab('security')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: activeTab === 'security' ? 700 : 500,
                color: activeTab === 'security' ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                borderBottom: activeTab === 'security' ? '2px solid var(--color-primary)' : 'none',
                paddingBottom: '8px',
                cursor: 'pointer',
              }}
            >
              Chain of Custody Security
            </button>
            <button
              onClick={() => setActiveTab('care')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: activeTab === 'care' ? 700 : 500,
                color: activeTab === 'care' ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                borderBottom: activeTab === 'care' ? '2px solid var(--color-primary)' : 'none',
                paddingBottom: '8px',
                cursor: 'pointer',
              }}
            >
              Care & Maintenance
            </button>
          </div>

          {activeTab === 'specs' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', fontSize: '13.5px' }}>
              <div>
                <span style={{ fontWeight: 700, color: 'var(--color-foreground)', display: 'block' }}>Exterior Dimensions</span>
                <span style={{ color: 'var(--color-muted-foreground)' }}>105 cm × 60 cm × 10 cm (Full suit length)</span>
              </div>
              <div>
                <span style={{ fontWeight: 700, color: 'var(--color-foreground)', display: 'block' }}>Fabric Composition</span>
                <span style={{ color: 'var(--color-muted-foreground)' }}>Heavyweight Breathable Organic Cotton Twill</span>
              </div>
              <div>
                <span style={{ fontWeight: 700, color: 'var(--color-foreground)', display: 'block' }}>Hardware</span>
                <span style={{ color: 'var(--color-muted-foreground)' }}>Reinforced Solid Brass YKK Zips & Leather Pulls</span>
              </div>
              <div>
                <span style={{ fontWeight: 700, color: 'var(--color-foreground)', display: 'block' }}>Cryptographic Chip</span>
                <span style={{ color: 'var(--color-muted-foreground)' }}>NXP NTAG213 High-Frequency NFC Token</span>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'var(--color-muted-foreground)', lineHeight: 1.6 }}>
              <p>• <strong>Cryptographic Tagging:</strong> Each smart bag contains an encoded NFC microchip paired with your digital private reserve profile.</p>
              <p>• <strong>Serialized Single-Use Seals:</strong> When handed over to your valet, the dual brass zippers are locked with numeric tamper seals.</p>
              <p>• <strong>Real-time GPS Tracking:</strong> Your bag's custody is updated live from doorstep collection to Indiranagar studio.</p>
            </div>
          )}

          {activeTab === 'care' && (
            <div style={{ fontSize: '13.5px', color: 'var(--color-muted-foreground)', lineHeight: 1.6 }}>
              <p>Spot clean with a damp microfiber cloth. The water-repellent wax finish naturally resists dust and light moisture. Complimentary re-waxing and inspection available during every atelier studio steam press session.</p>
            </div>
          )}
        </section>

      </PageTransition>

      <WebsiteFooter />
      <FloatingDockNav />
    </div>
  );
};
