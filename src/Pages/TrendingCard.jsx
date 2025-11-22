import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TrendingCard = ({ product, small = false }) => {
  return (
    <Link
      to={`/product/${product.pro_id}`}
      state={{ product }}
      className="no-underline"
    >
      <motion.div
        className={`
          bg-zinc-900 text-white rounded-xl shadow-md border border-zinc-800 p-3
          ${small ? 'w-[160px] h-[220px]' : 'w-[220px] h-[280px]'}
          flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-95
        `}
        whileHover={{ rotate: 1, transition: { type: 'spring', stiffness: 300 } }}
      >
        {/* Image */}
        <div className={`${small ? 'h-24' : 'h-36'} rounded-lg overflow-hidden mb-3`}>
          <img
            src={product.pro_image}
            alt={product.pro_name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Info */}
        <div className="space-y-1 px-1">
          <h3 className={`${small ? 'text-xs' : 'text-sm'} font-semibold truncate`}>
            {product.pro_name}
          </h3>
          <p className={`${small ? 'text-xs' : 'text-sm'} text-red-500 font-bold`}>
            ₹{product.pro_price}
          </p>
          <div className="flex justify-between text-xs text-gray-400">
            <span className="rounded-full font-semibold">
              ⭐ {product.pro_rating}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default TrendingCard;
