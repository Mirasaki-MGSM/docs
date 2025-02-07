'use client';

import React from 'react';
import { motion, useScroll } from 'motion/react';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="w-full h-1 fixed top-0 left-0">
      <motion.div
        className="h-full bg-blue-400 transform origin-left transition-transform rounded-r-xl"
        initial={{ scaleX: 0 }}
        style={{ scaleX: scrollYProgress }}
        transition={{
          type: 'spring',
          damping: 300,
          stiffness: 50,
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
