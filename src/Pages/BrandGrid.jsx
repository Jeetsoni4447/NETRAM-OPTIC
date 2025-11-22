import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import ExtraPhotos from '../ExtraPhotos.json';

const brands = [
  'Wolfeyes', 'Scott', 'Enfys', 'knighthorse',
  'kyaans', 'Tomhardy', 'vins', 'Raw7'
];

const BrandGrid = () => {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { threshold: 0.8 });

  return (
    <div className="w-full px-4 py-8 sm:py-10">
      {/* Heading with animation underline */}
      <div className="relative w-full flex justify-center mb-6">
        <h2
          ref={headingRef}
          className="text-xl sm:text-xl mb-2 font-semibold text-center text-white tracking-wide uppercase"
        >
          Brands You May Like
        </h2>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={
            isInView
              ? { width: '60%', opacity: 1 }
              : { width: 0, opacity: 0 }
          }
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute bottom-0 h-[2px] bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300"
          style={{ left: '20%' }}
        />
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {brands.map((brand, index) => {
          const formattedName = brand.replace(/\s+/g, '-').toLowerCase();
          const keyForLogo = `${formattedName}_logo`;
          const logo = ExtraPhotos[keyForLogo];

          return (
            <Link key={index} to={`/brands/${formattedName}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.07,
                  boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.15)',
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: 'tween',
                  ease: 'easeOut',
                  duration: 0.35,
                }}
                className="bg-white border border-gray-200 rounded-2xl 
                           h-24 sm:h-48 md:h-40 
                           flex items-center justify-center 
                           cursor-pointer shadow-md"
              >
                {logo ? (
                  <img
                    src={logo}
                    alt={`${brand} logo`}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-black text-sm sm:text-base font-medium text-center">
                    {brand}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BrandGrid;
