import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import ExtraPhotos from '../ExtraPhotos.json'

const categories = [
  {
    title: 'Titanium Frames',
    image: ExtraPhotos.show[0],
    hoverImage: ExtraPhotos.show[1],
    path: '/collections/titanium',
  },
  {
    title: 'Polarised Goggles',
    image: ExtraPhotos.show[2],
    hoverImage: ExtraPhotos.show[3],
    path: '/collections/polarised',
  },
]

const ProductCategorySlider = () => {
  const headingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { threshold: 1.0 })

  return (
    <div className="w-full bg-black px-4 py-6">
      {/* Heading */}
      <div className="relative w-full flex justify-center max-md:mb-4">
        <h2
          ref={headingRef}
          className="text-white text-lg max-md:mt-4 mb-3 font-semibold text-center tracking-wider uppercase"
        >
          Special Ones
        </h2>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={
            isHeadingInView
              ? { width: '60%', opacity: 1 }
              : { width: 0, opacity: 0 }
          }
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute bottom-0 h-[2px] bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300"
          style={{ left: '20%' }}
        />
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex w-full mt-3 h-[380px] gap-4 items-center">
        {categories.map((category, index) => {
          const ref = useRef(null)
          const inView = useInView(ref, { margin: '-10% 0px' })

          return (
            <Link to={category.path} key={index} className="w-1/2 h-full">
              <motion.div
                ref={ref}
                custom={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full h-full bg-gray-800 rounded-2xl overflow-hidden relative cursor-pointer group"
              >
                {/* Images */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover absolute transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                  />
                  <img
                    src={category.hoverImage}
                    alt={category.title + ' hover'}
                    className="w-full h-full object-cover absolute transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  />
                </div>

                {/* Text */}
                <div className="relative z-10 w-full h-full flex items-end justify-center pb-5 px-4">
                  <h3 className="text-white text-lg font-semibold text-center group-hover:text-xl transition-all duration-300">
                    {category.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* Mobile View */}
      <div className="w-full h-[40vh] grid grid-cols-2 gap-3 md:hidden">
        {categories.map((category, index) => {
          const ref = useRef(null)
          const inView = useInView(ref, { margin: '-10% 0px' })

          return (
            <Link to={category.path} key={index}>
              <motion.div
                ref={ref}
                custom={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full h-full bg-gray-800 rounded-xl overflow-hidden relative cursor-pointer group"
              >
                {/* Images */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover absolute transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                  />
                  <img
                    src={category.hoverImage}
                    alt={category.title + ' hover'}
                    className="w-full h-full object-cover absolute transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  />
                </div>

                {/* Text */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-3">
                  <h3 className="text-white text-base font-semibold text-center group-hover:text-lg transition-all duration-300">
                    {category.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ProductCategorySlider
