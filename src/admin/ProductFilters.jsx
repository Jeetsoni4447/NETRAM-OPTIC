// src/admin/ProductFilters.jsx
import React from 'react';

const ProductFilters = ({
  priceFilter,
  setPriceFilter,
  styleFilter,
  setStyleFilter,
  genderFilter,
  setGenderFilter,
  brandFilter,
  setBrandFilter,
  allBrands,
}) => {
  return (
    <div className="mb-4 p-4 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-md text-gray-800 border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
          >
            <option value="all">All</option>
            <option value="0-500">₹0 - ₹500</option>
            <option value="501-1000">₹501 - ₹1000</option>
            <option value="1001-3000">₹1001 - ₹3000</option>
            <option value="3001-5000">₹3001 - ₹5000</option>
            <option value="5000+">₹5000+</option>
          </select>
        </div>

        {/* Style */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Style</label>
          <select
            value={styleFilter}
            onChange={(e) => setStyleFilter(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-md text-gray-800 border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
          >
            <option value="all">All</option>
            <option value="full_frame">Full Frame</option>
            <option value="half_frame">Half Frame</option>
            <option value="rimless">Rimless</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-md text-gray-800 border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
          >
            <option value="all">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Brand</label>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-md text-gray-800 border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
          >
            <option value="all">All</option>
            {allBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
