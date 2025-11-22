import React, { useState, useEffect } from 'react';
import ProductCard from '../Comps/ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const TitaniumFrames = () => {

  const [frames, setFrames] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [genderFilter, setGenderFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [styleFilter, setStyleFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://netramoptics.onrender.com/fetchData');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        const titaniumFrames = data.frames?.filter(f => f.pro_material?.toLowerCase() === 'titanium') || [];
        setFrames(titaniumFrames);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFrames();
  }, []);

  useEffect(() => {
    setVisibleCount(9);
  }, [genderFilter, priceFilter, styleFilter]);

  const loadMore = () => setVisibleCount(prev => prev + 6);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getFilteredFrames = () => {
    return frames.filter((frame) => {
      const price = Number(frame.pro_price ?? 0);
      const style = frame.pro_style?.toLowerCase();
      const gender = frame.pro_gender?.toLowerCase();

      const genderCheck = genderFilter === 'all' || gender === genderFilter;
      const styleCheck = styleFilter === 'all' || style === styleFilter;
      const priceCheck = (() => {
        switch (priceFilter) {
          case '0-500': return price <= 500;
          case '501-1000': return price > 500 && price <= 1000;
          case '1001-3000': return price > 1000 && price <= 3000;
          case '3001-5000': return price > 3000 && price <= 5000;
          case '5000+': return price > 5000;
          default: return true;
        }
      })();

      return genderCheck && priceCheck && styleCheck;
    });
  };

  const filteredFrames = getFilteredFrames();
  const displayedFrames = filteredFrames.slice(0, visibleCount);

  return (
    <div className="min-h-screen w-full flex bg-gray-100 transition-all duration-300">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen w-1/4 max-md:w-full bg-gray-900 shadow-md z-30 transition-all duration-300 transform ${sidebarOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'}`}>
        <div className="p-4">
          <div className="absolute top-4 right-4 z-40">
            <button onClick={toggleSidebar} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white shadow-lg transition duration-300" title="Close">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4 text-white">Gender</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {['all', 'men', 'women', 'kids'].map((option) => (
              <button key={option} onClick={() => setGenderFilter(option)} className={`px-4 py-2 rounded-full border font-semibold transition duration-300 ${genderFilter === option ? 'bg-red-600 text-white border-red-600' : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'}`}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4 text-white">Price Filter</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {['all', '0-500', '501-1000', '1001-3000', '3001-5000', '5000+'].map((range) => (
              <button key={range} onClick={() => setPriceFilter(range)} className={`px-4 py-2 rounded-full border font-semibold transition duration-300 ${priceFilter === range ? 'bg-red-600 text-white border-red-600' : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'}`}>
                {range === 'all' ? 'All' : `₹${range.replace('-', ' - ')}`}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4 text-white">Style Filter</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {['all', 'full_frame', 'half_frame', 'rimless'].map((style) => (
              <button key={style} onClick={() => setStyleFilter(style)} className={`px-4 py-2 rounded-full border font-semibold transition duration-300 ${styleFilter === style ? 'bg-red-600 text-white border-red-600' : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'}`}>
                {style === 'all' ? 'All' : style.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="flex-1 flex max-md:mt-20 flex-col items-center py-4 transition-all duration-300">
        {!sidebarOpen && (
          <div className="w-full fixed z-10 left-2 max-md:top-22 flex justify-start mb-4">
            <button onClick={toggleSidebar} className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition duration-300 flex items-center gap-2">
              <i className="fas fa-filter"></i>
              <span className="sr-only">Toggle Filters</span>
            </button>
          </div>
        )}

        <h1 className="text-2xl font-bold mb-4 text-gray-800">Titanium Frames Collection</h1>

        {loading ? (
          <h4 className="text-center text-gray-600">Titanium Collection Loading...</h4>
        ) : error ? (
          <p className="text-center text-red-600">Error: {error}</p>
        ) : filteredFrames.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No products match the selected filters.</p>
        ) : (
          <InfiniteScroll
            dataLength={displayedFrames.length}
            next={loadMore}
            hasMore={displayedFrames.length < filteredFrames.length}
            loader={<h4 className="text-center text-gray-600">Loading...</h4>}
            endMessage={<p className="text-center text-gray-500"><b>Yup, you've reached the end.</b></p>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 px-4">
              {displayedFrames.map((frame) => (
                <ProductCard key={frame.pro_id} product={frame} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default TitaniumFrames;
