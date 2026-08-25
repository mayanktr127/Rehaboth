import React from 'react';
import { motion } from 'framer-motion';

interface GoldButtonProps {
  title: string;
  onClick?: () => void;
  showArrow?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  title,
  onClick,
  showArrow = false,
  className = '',
  type = 'button',
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`gold-btn ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98, y: 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
    >
      <span>{title}</span>
      {showArrow && <span style={{ fontSize: '16px', lineHeight: 1 }}>→</span>}
    </motion.button>
  );
};
