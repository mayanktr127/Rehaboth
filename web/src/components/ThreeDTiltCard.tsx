import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ThreeDTiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  icon?: React.ReactNode;
  delay?: number;
}

export const ThreeDTiltCard: React.FC<ThreeDTiltCardProps> = ({
  children,
  className = '',
  style = {},
  onClick,
  icon,
  delay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position values normalized from -0.5 to 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for silky buttery movement
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  // 3D rotation mappings
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  // Dynamic light glare effect
  const glareOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0.15, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        ...style,
      }}
      className={`luxury-card ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Card Content with 3D Depth */}
        <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>

        {/* Animated 3D Floating Icon Badge (Uniform & Equal) */}
        {icon && (
          <motion.div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              transform: 'translateZ(50px)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {icon}
          </motion.div>
        )}


        {/* Glossy Dynamic Sheen Overlay */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%)',
            opacity: glareOpacity,
            pointerEvents: 'none',
            transform: 'translateZ(10px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};
