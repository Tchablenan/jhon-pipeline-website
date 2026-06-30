'use client';

import { motion } from 'framer-motion';
import React from 'react';

const Logo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2"
    >
      <img
        src="https://www.jhonpipeline.com/wp-content/uploads/2024/12/logo-jhon-pipeline-copie.jpg"
        alt="JHON PIPELINE Logo"
        className="h-10 w-auto rounded-md object-contain bg-white p-1"
      />
    </motion.div>
  );
};

export default Logo;

