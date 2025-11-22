import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Footer from './Footer';

const Frames = () => {
  const [frames, setFrames] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [genderFilter, setGenderFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [styleFilter, setStyleFilter] = useState('all');

  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ───────────────────────────────────────────────
     Fetch once on mount
  ─────────────────────────────────────────────── */
  useEffect(() => {
    const fetchFrames = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://netramoptics.onrender.com/fetchData');
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        // API fallback keys: frames → Frames
        setFrames(
          data.frames ??
          data.frames ??
          data.Frames ??
          []
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFrames();
  }, []);

  /* ───────────────────────────────────────────────
     Reset pagination when any filter changes
  ─────────────────────────────────────────────── */
  useEffect(() => {
    setVisibleCount(9);
  }, [genderFilter, priceFilter, styleFilter]);

  /* ───────────────────────────────────────────────
     Helpers
  ─────────────────────────────────────────────── */
  const loadMore = () => setVisibleCount((c) => c + 6);
  const toggleSidebar = () => setSidebarOpen((o) => !o);

  const filteredFrames = frames.filter((f) => {
    const price = Number(f.pro_price ?? 0);
    const style = (f.pro_style ?? '').toLowerCase();
    const gender = (f.pro_gender ?? '').toLowerCase();

    const genderOk = genderFilter === 'all' || gender === genderFilter;
    const styleOk = styleFilter === 'all' || style === styleFilter;
    const priceOk = (() => {
      switch (priceFilter) {
        case '0-500': return price <= 500;
        case '501-1000': return price > 500 && price <= 1000;
        case '1001-3000': return price > 1000 && price <= 3000;
        case '3001-5000': return price > 3000 && price <= 5000;
        case '5000+': return price > 5000;
        default: return true;
      }
    })();

    return genderOk && styleOk && priceOk;
  });

  const displayedFrames = filteredFrames.slice(0, visibleCount);

  /* ───────────────────────────────────────────────
     Render
  ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen w-full flex bg-gray-100 transition-all duration-300">
      {/* ─── Sidebar ─────────────────────── */}
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

      {/* ─── Products ─────────────────────── */}
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

        <h1 className="text-2xl font-bold mb-4 text-gray-800">Frames Collection</h1>

        {loading ? (
          <h4 className="text-gray-600 mt-10">Optic-Frames Collection Loading…</h4>
        ) : error ? (
          <p className="text-red-600 mt-10">Error: {error}</p>
        ) : filteredFrames.length === 0 ? (
          <p className="text-gray-500 mt-10">No products match the selected filters.</p>
        ) : (
          <InfiniteScroll
            dataLength={displayedFrames.length}
            next={loadMore}
            hasMore={displayedFrames.length < filteredFrames.length}
            loader={<h4 className="text-center text-gray-600">Loading…</h4>}
            endMessage={
              <p className="text-center text-gray-500">
                <b>Yup, you&apos;ve reached the end.</b>
              </p>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 px-4">
              {displayedFrames.map((Frames) => (
                <ProductCard key={Frames.pro_id} product={Frames} />
              ))}
            </div>
          </InfiniteScroll>
        )}

        <Footer />
      </main>
    </div>
  );
};

export default Frames;
