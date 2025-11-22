import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GlassHover from './GlassHover';
import ExtraPhotos from '../ExtraPhotos.json';

// Helper function to get random hero_back image
const getRandomHeroImage = () => {
  const images = ExtraPhotos.hero_back;
  return images[Math.floor(Math.random() * images.length)];
};

const sentence = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const word = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Welcome = () => {
  const randomBackground = getRandomHeroImage();

  const highlightRef = useRef(null);
  const isInView = useInView(highlightRef, { once: true });

  return (
    <motion.div
      variants={sentence}
      initial="hidden"
      animate="show"
      className="relative flex flex-col justify-center items-center text-white text-center h-full w-full gap-4 px-4 overflow-hidden rounded-xl"
    >
      {/* ✅ Random Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
        style={{ backgroundImage: `url(${randomBackground})` }}
      />

      <GlassHover />

      <motion.p
        variants={word}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight z-10"
      >
        Frames That Fit Your Life.
      </motion.p>

      {/* ✅ Bottom-Aligned Paragraph with Sweep Animation */}
      <div className="absolute bottom-4 z-10 max-w-md px-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }} // 🔥 faster
          className="absolute left-0 top-0 h-full bg-white/20 rounded"
          style={{ zIndex: -1 }}
        />
        <p className="relative text-xs sm:text-sm md:text-base font-medium text-white">
          Explore classic to bold styles — curated to match your vibe and vision.
        </p>
      </div>


    </motion.div>
  );
};

export default Welcome;
