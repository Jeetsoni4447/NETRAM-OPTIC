import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ExtraPhotos from '../ExtraPhotos.json';

const floatIn = {
  hidden: (i) => ({
    opacity: 0,
    x: 100 + i * 20,
    y: 20 * ((i % 2 === 0) ? 1 : -1),
  }),
  show: (i) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: 'spring',
      stiffness: 80,
    },
  }),
};

// Helper to get a random image from an array
const getRandomImage = (images) =>
  images[Math.floor(Math.random() * images.length)];

const categories = [
  {
    label: 'Men',
    image: getRandomImage(ExtraPhotos.men),
    path: '/frames',
  },
  {
    label: 'Women',
    image: getRandomImage(ExtraPhotos.women),
    path: '/frames',
  },
  {
    label: 'Kids',
    image: getRandomImage(ExtraPhotos.kids),
    path: '/frames',
  },
];

const CategoryBoxes = () => {
  return (
    <div
      className="w-full px-4 py-6 flex justify-between items-center gap-3
      md:justify-center md:gap-8"
    >
      {categories.map((cat, i) => (
        <Link key={i} to={cat.path} className="flex-shrink-0">
          <motion.div
            custom={i}
            variants={floatIn}
            initial="hidden"
            animate="show"
            whileHover={{
              scale: 1.05,
              rotate: [0, 1.5, -1.5, 0],
              boxShadow: '0px 8px 20px rgba(0,0,0,0.15)',
            }}
            className={`relative overflow-hidden rounded-2xl
            flex items-end justify-center text-white font-bold text-sm md:text-xl cursor-pointer group
            h-32 w-24 md:h-60 md:w-52`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300 max-md:scale-105 opacity-70 group-hover:opacity-100 group-hover:scale-110 rounded-xl scale-100"
              style={{ backgroundImage: `url(${cat.image})` }}
            />
            <span className="z-10">{cat.label}</span>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};


export default CategoryBoxes;
