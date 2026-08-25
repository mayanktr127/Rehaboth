import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '', style }) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 36, scale: 0.98 }}

      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.99 }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1], // Luxury cubic-bezier
      }}
    >
      {children}
    </motion.div>
  );
};
