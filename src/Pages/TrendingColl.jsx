import React, { useEffect, useRef, useState } from 'react';
import Prods from '../pro2.json';
import TrendingCard from './TrendingCard';

// Shuffle helper
const shuffleArray = (array) => {
  return array
    .map(item => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const TrendingColl = () => {
  const scrollRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [trendingFrames, setTrendingFrames] = useState([]);

  // Prepare shuffled and filtered trending frames
 useEffect(() => {
  const filtered = Prods.frames
    .filter(frame => frame.pro_rating >= 4.8) // ✅ Only 4.8+ ratings
    .sort((a, b) => b.pro_rating - a.pro_rating);
    
  const shuffled = shuffleArray(filtered).slice(0, 10); // Pick top 10 randomly
  setTrendingFrames(shuffled);
}, []);


  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll for desktop
  useEffect(() => {
    if (!isDesktop) return;
    const container = scrollRef.current;
    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (container) {
        scrollAmount += 240;
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 0;
        }
        container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isDesktop]);

  // Group into columns of 2 (for mobile layout)
  const groupedFrames = [];
  for (let i = 0; i < trendingFrames.length; i += 2) {
    groupedFrames.push(trendingFrames.slice(i, i + 2));
  }

  return (
    <section className="w-full bg-black py-10 px-4">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        🔥 Trending Collection
      </h2>

      {/* Desktop: Horizontal scroll */}
      {isDesktop && (
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 hide-scrollbar px-1"
        >
          {trendingFrames.map((frame) => (
            <div key={frame.pro_id} className="snap-start flex-shrink-0">
              <TrendingCard product={frame} />
            </div>
          ))}
        </div>
      )}

      {/* Mobile: Horizontal scroll with vertical pairs */}
      {!isDesktop && (
        <div
          className="flex overflow-x-auto gap-3 hide-scrollbar px-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {groupedFrames.map((group, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 snap-start flex-shrink-0"
              style={{ width: '170px' }} // Card width for each column
            >
              {group.map((frame) => (
                <TrendingCard key={frame.pro_id} product={frame} small />
              ))}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TrendingColl;
