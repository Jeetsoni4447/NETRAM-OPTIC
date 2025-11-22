import React, { useState, useEffect } from 'react';
import ProductFilters from './ProductFilters';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [priceFilter, setPriceFilter] = useState("all");
  const [styleFilter, setStyleFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://netramoptics.onrender.com/fetchData`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const allFrames = data.frames || [];
        const allGoggles = data.goggles || [];
        const combinedProducts = [...allFrames, ...allGoggles];

        setProducts(combinedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const price = Number(p.pro_price);
    const style = p.pro_style?.toLowerCase();
    const gender = p.pro_gender?.toLowerCase();
    const brand = p.pro_brand?.toLowerCase();

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "0-500" && price <= 500) ||
      (priceFilter === "501-1000" && price > 500 && price <= 1000) ||
      (priceFilter === "1001-3000" && price > 1000 && price <= 3000) ||
      (priceFilter === "3001-5000" && price > 3000 && price <= 5000) ||
      (priceFilter === "5000+" && price > 5000);

    const matchesStyle = styleFilter === "all" || style === styleFilter;
    const matchesGender = genderFilter === "all" || gender === genderFilter;
    const matchesBrand = brandFilter === "all" || brand === brandFilter;

    return matchesPrice && matchesStyle && matchesGender && matchesBrand;
  });

  const handleEdit = (product) => {
    console.log('Edit:', product.pro_id);
    // TODO: Open edit modal or redirect
  };

  const handleDelete = (product) => {
    console.log('Delete:', product.pro_id);
    // TODO: Confirm and call delete API
  };

  return (
    <div>
      {/* <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1> */}

      <ProductFilters
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        styleFilter={styleFilter}
        setStyleFilter={setStyleFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        brandFilter={brandFilter}
        setBrandFilter={setBrandFilter}
        allBrands={[
          ...new Set(products.map((p) => p.pro_brand?.toLowerCase()).filter(Boolean)),
        ]}
      />

      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
  <tr>
    <th className="px-4 py-3">Image</th>
    <th className="px-4 py-3">Product ID</th> {/* 👈 New column */}
    <th className="px-4 py-3">Name</th>
    <th className="px-4 py-3">Price</th>
    <th className="px-4 py-3">Gender</th>
    <th className="px-4 py-3">Style</th>
    <th className="px-4 py-3">Brand</th>
    <th className="px-4 py-3">Stock</th>
    <th className="px-4 py-3 text-center">Actions</th>
  </tr>
</thead>
<tbody>
  {filteredProducts.map((p) => (
    <tr key={p.pro_id} className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">
        <img
          src={p.pro_image}
          alt={p.pro_name}
          className="w-12 h-12 object-cover rounded"
        />
      </td>
      <td className="px-4 py-3 text-gray-900">{p.pro_id}</td> {/* 👈 Product ID */}
      <td className="px-4 py-3 text-gray-900">{p.pro_name}</td>
      <td className="px-4 py-3 text-gray-900">₹{p.pro_price}</td>
      <td className="px-4 py-3 capitalize text-gray-900">{p.pro_gender}</td>
      <td className="px-4 py-3 capitalize text-gray-900">{p.pro_style?.replace('_', ' ')}</td>
      <td className="px-4 py-3 capitalize text-gray-900">{p.pro_brand}</td>
      <td className="px-4 py-3 text-gray-900">{p.pro_stock ?? '—'}</td>
      <td className="px-4 py-3 text-center space-x-2">
        <button
          onClick={() => handleEdit(p)}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(p)}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
