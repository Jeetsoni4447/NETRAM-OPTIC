import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [prescriptionType, setPrescriptionType] = useState("none"); // 'upload', 'manual', 'none'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = 50;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login or register to continue to checkout.");
      navigate("/auth", { state: { from: location.pathname } });
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.cart) {
      const cartItems = location.state.cart;
      setCart(cartItems);

      const fileItem = cartItems.find(item => item.prescriptionFile instanceof File);
      if (fileItem) {
        setPrescriptionFile(fileItem.prescriptionFile);
        setPrescriptionType("upload");
      }
    } else {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    }
  }, [location.state]);

  const subtotal = cart.reduce((acc, item) => acc + Number(item.price), 0);
  const totalPrice = subtotal + shippingFee;

  const [showForm, setShowForm] = useState(false);

  // replace handlePlaceOrder with:
  const handleShowForm = () => {
    if (cart.length === 0) return alert("No items in cart.");
    setShowForm(true);
  };

  // new function to handle final submit
  const handleFinalSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      const formPayload = new FormData();
      formPayload.append("items", JSON.stringify(cart));
      formPayload.append("prescriptionType", prescriptionType);
      formPayload.append("totalPrice", totalPrice);
      formPayload.append("userData", JSON.stringify(formData));
      formPayload.append("paymentMethod", formData.paymentMethod);


      if (prescriptionFile) {
        formPayload.append("prescriptionFile", prescriptionFile);
      }

      const response = await axios.post("https://netramoptics.onrender.com/api/orders", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("✅ Order placed:", response.data);
      localStorage.removeItem("cart");
      alert("Order placed successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("❌ Order failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Section */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-8 text-indigo-700">🛍️ Your Cart</h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-gray-600 text-lg">😕 No products selected. Please go back and add items to your cart.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-5 rounded-xl shadow border hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-20 object-cover rounded-lg border"
                    />
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-indigo-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.prostyle}</p>
                      <p className="text-sm text-gray-600">Lens Type: {item.lensType}</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-600 min-w-[70px] text-right">
                    ₹{item.price}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary & Order Box */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-fit sticky top-10 lg:top-20">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">🧾 Order Summary</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between text-sm sm:text-base">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Shipping</span>
              <span className="text-green-600">₹{shippingFee.toFixed(2)}</span>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between text-xl font-bold text-green-800">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleShowForm}
            disabled={isSubmitting || cart.length === 0}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            🛒 Proceed to Checkout
          </button>
        </div>
      </div>

      {showForm && (
        <div className="max-w-2xl mx-auto mt-12">
          <CheckoutForm onSubmit={handleFinalSubmit} isSubmitting={isSubmitting} />
        </div>
      )}

    </>
  );
};

export default Checkout;
