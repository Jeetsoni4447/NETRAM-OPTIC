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

const contact_lenses = () => {
  const [contact_lenses, setcontact_lenses] = useState([]);
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
    const fetchcontact_lenses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://netramoptics.onrender.com/fetchData`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setcontact_lenses(data.contact_lensess || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchcontact_lenses();
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

  const getFilteredcontact_lenses = () => {
    return contact_lenses.filter((contact_lenses) => {
      const price = Number(contact_lenses.pro_price ?? 0);
      const style = contact_lenses.pro_style?.toLowerCase();
      const material = contact_lenses.pro_material?.toLowerCase();

      const styleCheck = styleFilter === 'all' || style === styleFilter;
      const materialCheck = materialFilter === 'all' || material === materialFilter;

      return styleCheck && materialCheck;
    });
  };

  const filteredcontact_lenses = getFilteredcontact_lenses();
  const displayedcontact_lenses = filteredcontact_lenses.slice(0, visibleCount);

  return (
    <div className="min-h-screen w-full flex bg-gray-100 transition-all duration-300">

      {/* Product Section */}
      <main className="flex-1 flex flex-col items-center py-4 max-md:mt-20">

        <h1 className="text-2xl font-bold mb-4 text-gray-800">Contact Lenses Collection</h1>

        {loading ? (
          <h4 className="text-center text-gray-600">Contact Lenses Collection Loading...</h4>
        ) : error ? (
          <p className="text-center text-red-600">Error: {error}</p>
        ) : filteredcontact_lenses.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">No products match the selected filters.</p>
        ) : (
          <InfiniteScroll
            dataLength={displayedcontact_lenses.length}
            next={loadMore}
            hasMore={displayedcontact_lenses.length < filteredcontact_lenses.length}
            loader={<h4 className="text-center text-gray-600">Loading...</h4>}
            endMessage={
              <p className="text-center text-gray-500">
                <b>Yup, you've reached the end.</b>
              </p>
            }
          >
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-6 mb-12 mt-4 w-full max-w-7xl mx-auto">
              {displayedcontact_lenses.map((contact_lenses) => (
                <ProductCard key={contact_lenses.pro_id} product={contact_lenses} />
              ))}
            </div>
          </InfiniteScroll>
        )}
        <Footer />
      </main>
    </div>
  );
};

export default contact_lenses;
