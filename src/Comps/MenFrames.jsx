import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';

// Shuffle helper function
const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const MenFrames = () => {
   const [frames, setFrames] = useState([]);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [genderFilter, setGenderFilter] = useState('men');
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

  // Fetch data from API
  useEffect(() => {
    const fetchFrames = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://netramoptics.onrender.com/fetchData");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setFrames(data.frames || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFrames();
  }, []);

    // Reset visible count on filter change
    useEffect(() => {
      setVisibleCount(9);
    }, [genderFilter, priceFilter, styleFilter, shapeFilter, colorFilter, materialFilter]);
  

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };



  const getFilteredFrames = () => {
    return frames.filter((frame) => {
      const price = Number(frame.pro_price);
      const style = frame.pro_style?.toLowerCase();
      const gender = frame.pro_gender?.toLowerCase();

      const genderCheck = gender === 'men';
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
  const visibleFrames = filteredFrames.slice(0, visibleCount);

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
       {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-1/4 max-md:w-full bg-gray-900 shadow-md z-30 transition-all duration-300 transform ${sidebarOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'
          }`}
      >
        <div className="p-4 h-full overflow-y-auto scrollbar-hide relative">

          {/* ❌ Close Button */}
          <div className="absolute bottom-2 right-2 z-40">
            <button
              onClick={toggleSidebar}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 bg-red-600 text-gray-300 hover:bg-red-600 hover:text-white shadow-lg transition duration-300"
              title="Close"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          {/* ✅ Dropdown Filters */}
          {renderDropdown('Gender', 'gender', ['all', 'men', 'women', 'kids'], genderFilter, setGenderFilter)}
          {renderDropdown('Price Filter', 'price', ['all', '0-500', '501-1000', '1001-3000', '3001-5000', '5000+'], priceFilter, setPriceFilter)}
          {renderDropdown('Style Filter', 'style', ['all', 'full_frame', 'half_frame', 'rimless'], styleFilter, setStyleFilter)}
          {renderDropdown('Shape Filter', 'shape', ['all', 'round', 'square', 'rectangle', 'cateye', 'aviator', 'oval'], shapeFilter, setShapeFilter)}

          {/* 🎨 Color Filter Dropdown */}
          {renderDropdown(
            'Color',
            'color',
            [
              'all',
              'black',
              'brown',
              'blue',
              'red',
              'gold',
              'silver',
              'green',
              'orange',
              'pink',
              'white',
              'multicolor',
              'transparent'
            ],
            colorFilter,
            setColorFilter
          )}

          {/* 🧱 Material Filter */}
          {renderDropdown(
            'Material',
            'material',
            ['all', 'fiber', 'metal', 'titanium'],
            materialFilter,
            setMaterialFilter
          )}

        </div>
      </div>


      {/* Product Section */}
      <div className="flex-1 flex max-md:mt-20 flex-col items-center py-4 transition-all duration-300">
        {!sidebarOpen && (
          <div className="w-full fixed z-10 left-2 max-md:top-22 flex justify-start mb-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition duration-300 flex items-center gap-2"
            >
              <i className="fas fa-filter"></i>
              <span className="sr-only">Toggle Filters</span>
            </button>
          </div>
        )}

            {/* Desktop Filter Bar */}
                <div className="hidden sm:flex w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 gap-2 bg-white border-b border-gray-200 sticky top-[70px] z-30">
                  {[
                    { label: 'Gender', filter: genderFilter, options: ['men'], setFilter: setGenderFilter },
                    { label: 'Price', filter: priceFilter, options: ['all', '0-500', '501-1000', '1001-3000', '3001-5000', '5000+'], setFilter: setPriceFilter, isPrice: true },
                    { label: 'Style', filter: styleFilter, options: ['all', 'full_frame', 'half_frame', 'rimless'], setFilter: setStyleFilter },
                    { label: 'Shape', filter: shapeFilter, options: ['all', 'round', 'square', 'rectangle', 'cateye', 'aviator', 'oval'], setFilter: setShapeFilter },
                    { label: 'Color', filter: colorFilter, options: ['all', 'black', 'brown', 'blue', 'red', 'gold', 'silver', 'green', 'orange', 'pink', 'white', 'multicolor', 'transparent'], setFilter: setColorFilter, isColor: true },
                    { label: 'Material', filter: materialFilter, options: ['all', 'fiber', 'metal', 'titanium'], setFilter: setMaterialFilter }
                  ].map(({ label, filter, options, setFilter, isPrice, isColor }) => {
                    const [open, setOpen] = React.useState(false);
        
                    return (
                      <div
                        key={label}
                        className="relative min-w-[180px] z-[999]"
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                      >
                        {/* Main Button */}
                        <button
                          className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium border rounded-lg bg-white transition-all duration-200 shadow-sm hover:shadow-md ${filter !== 'all'
                            ? 'bg-red-100 border-red-500 text-red-700'
                            : 'text-black hover:bg-gray-100'
                            }`}
                        >
                          <span className="truncate">
                            {filter !== 'all'
                              ? isPrice
                                ? `₹${filter.replace('-', ' - ')}`
                                : filter.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
                              : label}
                          </span>
                          <i
                            className={`fas fa-chevron-down ml-2 transition-transform duration-200 ${open ? 'rotate-180 text-red-600' : 'rotate-0 text-gray-500'
                              }`}
                          />
                        </button>
        
                        {/* Floating Dropdown */}
                        {open && (
                          <div className={`absolute top-full left-0 ${isColor ? 'w-[300px]' : 'w-full'} z-[9999] bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden pointer-events-auto`}>
                            <div className={isColor ? 'grid grid-cols-2' : 'flex flex-col'}>
                              {options.map((opt) => {
                                const isActive = filter === opt;
                                const displayText = opt.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
        
                                // 🎨 Color dot logic
                                let dot = null;
                                if (isColor && opt !== 'all') {
                                  let bg = opt;
                                  if (opt === 'multicolor') {
                                    bg = 'linear-gradient(to right, red, yellow, green)';
                                  } else if (opt === 'transparent') {
                                    bg = 'radial-gradient(#eee 1px, transparent 1px)';
                                  }
        
                                  dot = (
                                    <span
                                      className="w-4 h-4 rounded-full border border-gray-300 ml-2 flex-shrink-0"
                                      style={{
                                        background: bg,
                                        backgroundSize: opt === 'transparent' ? '6px 6px' : undefined
                                      }}
                                    ></span>
                                  );
                                }
        
                                return (
                                  <button
                                    key={opt}
                                    onClick={() => {
                                      setFilter(opt);
                                      setOpen(false);
                                    }}
                                    className={`flex items-center justify-between px-5 py-3 text-left text-sm transition ${isActive ? 'bg-red-600 text-white' : 'text-gray-800 hover:bg-red-100'
                                      }`}
                                  >
                                    <span className="truncate">
                                      {isPrice && opt !== 'all' ? `₹${opt.replace('-', ' - ')}` : displayText}
                                    </span>
                                    {dot}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>


        {loading ? (
          <h4 className="text-center text-gray-600">Loading...</h4>
        ) : error ? (
          <p className="text-center text-red-600">Error: {error}</p>
        ) : filteredFrames.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No products match the selected filters.</p>
        ) : (
          <InfiniteScroll
            dataLength={visibleFrames.length}
            next={loadMore}
            hasMore={visibleFrames.length < filteredFrames.length}
            loader={<h4 className="text-center text-gray-600">Loading more...</h4>}
            endMessage={
              <p className="text-center text-gray-500"><b>Yup, you've reached the end.</b></p>
            }
          >
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-6 mb-12 mt-4 w-full max-w-7xl mx-auto">
              {visibleFrames.map((frame) => (
                <ProductCard key={frame.pro_id} product={frame} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default MenFrames;
