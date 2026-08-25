import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BentoHeroCollageProps {
  imageSrc?: string;
  className?: string;
}

export const BentoHeroCollage: React.FC<BentoHeroCollageProps> = ({
  imageSrc = '/atelier_models_hero.png',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 540 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth || 500;
        const h = Math.round(w * 1.08); // 540px at 500px width
        setDimensions({ width: w, height: h });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const gap = 16;
  const colWidth = (dimensions.width - gap) / 2;
  
  // Exact row heights matching Image 2 reference:
  // Row 0: 125px (Ceiling & lights)
  // Row 1: 230px (Full heads, faces, torsos & dress - NO facial cuts!)
  // Row 2: remaining ~153px (Cart, wheels & jeans)
  const row0Height = Math.round(dimensions.height * 0.23);
  const row1Height = Math.round(dimensions.height * 0.44);
  const row2Height = dimensions.height - row0Height - row1Height - 2 * gap;

  // 2:3 aspect ratio photo mapping (750px height on 500px width)
  const imgWidth = dimensions.width;
  const imgHeight = Math.round(dimensions.width * 1.5);
  // Shift image vertically so full faces sit comfortably in the middle block (matching Image 2)
  const verticalOffset = Math.round(dimensions.height * 0.11);

  // Exact coordinates for all 6 window puzzle pieces
  const blocks = [
    { row: 0, col: 0, top: 0, left: 0, height: row0Height, width: colWidth },
    { row: 0, col: 1, top: 0, left: colWidth + gap, height: row0Height, width: colWidth },
    { row: 1, col: 0, top: row0Height + gap, left: 0, height: row1Height, width: colWidth },
    { row: 1, col: 1, top: row0Height + gap, left: colWidth + gap, height: row1Height, width: colWidth },
    { row: 2, col: 0, top: row0Height + row1Height + 2 * gap, left: 0, height: row2Height, width: colWidth },
    { row: 2, col: 1, top: row0Height + row1Height + 2 * gap, left: colWidth + gap, height: row2Height, width: colWidth },
  ];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`bento-hero-collage ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        height: `${dimensions.height}px`,
        margin: '0 auto',
      }}
    >
      {blocks.map((block, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.025, zIndex: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: `${block.top}px`,
            left: `${block.left}px`,
            width: `${block.width}px`,
            height: `${block.height}px`,
            borderRadius: '28px',
            overflow: 'hidden',
            backgroundColor: '#e6ded3',
            boxShadow: '0 8px 24px rgba(45, 36, 28, 0.1)',
            border: '1.5px solid rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            // 100% Mathematical Puzzle Continuity (Matching Image 2 Reference)
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${imgWidth}px ${imgHeight}px`,
            backgroundPosition: `-${block.left}px -${block.top + verticalOffset}px`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Luxury soft ambient glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at top left, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.03) 100%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
