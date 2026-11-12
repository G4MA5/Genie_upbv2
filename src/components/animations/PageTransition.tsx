import React from 'react';
import { motion } from 'framer-motion';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className="w-full"
  >
    {children}
  </motion.div>
);
