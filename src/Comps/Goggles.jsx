import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

// Shuffle helper function
const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const Goggles = () => {
  const [goggles, setGoggles] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [genderFilter, setGenderFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [styleFilter, setStyleFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(9);
  const [shapeFilter, setShapeFilter] = useState('all');
  const [colorFilter, setColorFilter] = useState('all');
  const [materialFilter, setMaterialFilter] = useState('all');
  const [shapeOpen, setShapeOpen] = useState(false); // For desktop dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genderOpen, setGenderOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null); // 'gender' | 'price' | 'style' | etc.

  useEffect(() => {
    const fetchGoggles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://netramoptics.onrender.com/fetchData`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setGoggles(data.goggles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGoggles();
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(9);
  }, [genderFilter, priceFilter, styleFilter, shapeFilter, colorFilter, materialFilter]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getFilteredGoggles = () => {
    return goggles.filter((goggle) => {
      const price = Number(goggle.pro_price ?? 0);
      const style = goggle.pro_style?.toLowerCase();
      const gender = goggle.pro_gender?.toLowerCase();
      const shape = goggle.pro_shape?.toLowerCase();
      const color = goggle.pro_color?.toLowerCase();
      const material = goggle.pro_material?.toLowerCase();

      const genderCheck = genderFilter === 'all' || gender === genderFilter;
      const styleCheck = styleFilter === 'all' || style === styleFilter;
      const shapeCheck = shapeFilter === 'all' || shape === shapeFilter;
      const colorCheck = colorFilter === 'all' || color === colorFilter;
      const materialCheck = materialFilter === 'all' || material === materialFilter;

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

      return genderCheck && styleCheck && shapeCheck && colorCheck && materialCheck && priceCheck;
    });
  };


  const filteredGoggles = getFilteredGoggles();
  const displayedGoggles = filteredGoggles.slice(0, visibleCount);

  const renderDropdown = (label, name, options, selectedValue, onSelect) => {
    const getDisplayText = () => {
      if (selectedValue === 'all') return label;
      if (name === 'price') return `₹${selectedValue.replace('-', ' - ')}`;
      return selectedValue.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    };

    const isFiltered = selectedValue !== 'all';

    return (
      <div className="mb-4">
        {/* Dropdown Toggle Button */}
        <button
          onClick={() => setActiveDropdown((prev) => (prev === name ? null : name))}
          className={`w-full flex justify-between items-center font-semibold py-2 px-4 rounded transition ${isFiltered
            ? 'bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 text-gray-900'
            : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
        >
          <span>{getDisplayText()}</span>
          <i
            className={`fa-solid fa-chevron-${activeDropdown === name ? 'up' : 'down'} transition-transform duration-300`}
          ></i>
        </button>

        {/* Dropdown Content */}
        <div
          className={`transition-all duration-300 overflow-hidden ${activeDropdown === name ? 'max-h-96 mt-2' : 'max-h-0'
            }`}
        >
          <div
            className={`${name === 'color'
              ? 'grid grid-rows-3 auto-cols-auto grid-flow-col gap-4 p-3'
              : 'flex flex-wrap gap-3 p-2'
              }`}
          >
            {options.map((option) => {
              const isActive = selectedValue === option;
              const displayName = option.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());

              if (name === 'color') {
                let dotClass =
                  'w-12 h-12 rounded-full border-2 shadow transition-all duration-200';
                let bgStyle = {};

                if (option === 'multicolor') {
                  dotClass += ' bg-gradient-to-tr from-red-400 via-yellow-300 to-green-400';
                } else if (option === 'transparent') {
                  dotClass += ' bg-white/20 backdrop-blur-sm';
                } else if (option !== 'all') {
                  bgStyle.backgroundColor = option;
                }

                dotClass += isActive ? ' border-yellow-400 scale-110' : ' border-gray-400';

                return (
                  <button
                    key={option}
                    onClick={() => {
                      onSelect(option);
                      setActiveDropdown(null);
                    }}
                    className="flex flex-col items-center space-y-1"
                  >
                    <div className={dotClass} style={bgStyle}></div>
                    <span
                      className={`text-xs font-medium text-center ${isActive ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                      {displayName}
                    </span>
                  </button>
                );
              }

              // Default filters (e.g. gender, style, shape, price, material)
              return (
                <button
                  key={option}
                  onClick={() => {
                    onSelect(option);
                    setActiveDropdown(null);
                  }}
                  className={`px-4 py-2 rounded-full border font-semibold transition duration-300 ${isActive
                    ? 'bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 text-gray-900 border-yellow-400'
                    : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'
                    }`}
                >
                  {name === 'price' && option !== 'all'
                    ? `₹${option.replace('-', ' - ')}`
                    : displayName}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-100 transition-all duration-300">
      <aside
        className={`fixed top-0 left-0 h-screen w-1/4 max-md:w-full bg-gray-900 z-30 shadow-md transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white shadow-lg transition"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>

          {/* Gender */}
          <h2 className="text-xl font-bold mb-4 text-white">Gender</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {['all', 'men', 'women', 'kids'].map((opt) => (
              <button
                key={opt}
                onClick={() => setGenderFilter(opt)}
                className={`px-4 py-2 rounded-full border font-semibold transition
                  ${genderFilter === opt
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'}`}
              >
                {opt[0].toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>

          {/* Price */}
          <h2 className="text-xl font-bold mb-4 text-white">Price</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {['all', '0-500', '501-1000', '1001-3000', '3001-5000', '5000+'].map((rng) => (
              <button
                key={rng}
                onClick={() => setPriceFilter(rng)}
                className={`px-4 py-2 rounded-full border font-semibold transition
                  ${priceFilter === rng
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'}`}
              >
                {rng === 'all' ? 'All' : `₹${rng.replace('-', ' - ₹')}`}
              </button>
            ))}
          </div>

          {/* Style */}
          <h2 className="text-xl font-bold mb-4 text-white">Style</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {['all', 'full_frames', 'half_frames', 'rimless'].map((sty) => (
              <button
                key={sty}
                onClick={() => setStyleFilter(sty)}
                className={`px-4 py-2 rounded-full border font-semibold transition
                  ${styleFilter === sty
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'}`}
              >
                {sty === 'all'
                  ? 'All'
                  : sty.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Product Section */}
      <main className="flex-1 flex flex-col items-center py-4 max-md:mt-20">
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="fixed left-2 max-md:top-22 z-10 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition flex items-center gap-2"
          >
            <i className="fas fa-filter" />
            <span className="sr-only">Toggle Filters</span>
          </button>
        )}

        <h1 className="text-2xl font-bold mb-4 text-gray-800">Goggles Collection</h1>

        {loading ? (
          <h4 className="text-center text-gray-600">Goggles Collection Loading...</h4>
        ) : error ? (
          <p className="text-center text-red-600">Error: {error}</p>
        ) : filteredGoggles.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No products match the selected filters.</p>
        ) : (
          <InfiniteScroll
            dataLength={displayedGoggles.length}
            next={loadMore}
            hasMore={displayedGoggles.length < filteredGoggles.length}
            loader={<h4 className="text-center text-gray-600">Loading...</h4>}
            endMessage={
              <p className="text-center text-gray-500">
                <b>Yup, you've reached the end.</b>
              </p>
            }
          >
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-6 mb-12 mt-4 w-full max-w-7xl mx-auto">
              {displayedGoggles.map((goggle) => (
                <ProductCard key={goggle.pro_id} product={goggle} />
              ))}
            </div>
          </InfiniteScroll>
        )}
        <Footer />
      </main>
    </div>
  );
};

export default Goggles;
