import { useState, useEffect } from "react";
// Optional: import toast for better UX
// import { toast } from "react-hot-toast";

const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    pincode: "",
    paymentMethod: "cod", // Default to Cash on Delivery
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;

    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!pincodeRegex.test(formData.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    onSubmit(formData);
  };

  // Optional: Reset form after submit
  useEffect(() => {
    if (!isSubmitting) {
      setFormData({
        fullName: "",
        email: "",
        address: "",
        phone: "",
        city: "",
        pincode: "",
        paymentMethod: "cod",
      });

    }
  }, [isSubmitting]);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 space-y-8"
    >
      <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        📦 Shipping Information
      </h2>
              
      {/* Two-column layout for name/email/phone/city */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="John Doe"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-2 rounded-lg text-gray-900"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-2 rounded-lg text-gray-900"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            autoComplete="tel"
            placeholder="1234567890"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-2 rounded-lg text-gray-900"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            autoComplete="address-level2"
            placeholder="Mumbai"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-2 rounded-lg text-gray-900"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Address and Pincode row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">
            Shipping Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            autoComplete="street-address"
            placeholder="123 Main Street, Apartment 4B"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-2 rounded-lg text-gray-900"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-1">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            autoComplete="postal-code"
            placeholder="400001"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 px-4 py-2 rounded-lg text-gray-900"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Method</label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === "cod"}
              onChange={handleChange}
              className="form-radio text-indigo-600"
            />
            <span className="text-black">Cash on Delivery</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={formData.paymentMethod === "online"}
              onChange={handleChange}
              className="form-radio text-indigo-600"
            />
            <span className="text-black">Online Payment</span>
          </label>
        </div>
      </div>


      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? "Placing Order..." : "✅ Confirm & Place Order"}
      </button>
    </form>

  );
};

export default CheckoutForm;
