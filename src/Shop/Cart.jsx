import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
    
const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    // Build final cart with prescription details as separate object (if needed)
    const enrichedCart = cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      prostyle: item.prostyle,
      category: item.category,
      lensType: item.lensType,
      prescription: item.prescriptionDetails || null,
      prescriptionFile: item.uploadedPrescriptionFile || null,
    }));
    navigate("/checkout", { state: { cart: enrichedCart } });
  };
  
  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center max-md:mt-10">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          Your cart is empty. 🥺
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md gap-4 sm:gap-6"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Link to={`/product/${item.id}`} className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl border shadow-sm"
                  />
                  <div className="flex flex-col justify-between">
                    <h3 className="text-xl font-semibold text-indigo-700 hover:underline">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.prostyle}</p>
                    <p className="text-sm text-gray-600">Lens Type: {item.lensType}</p>
                    <p className="text-lg font-bold text-indigo-600">₹{item.price}</p>

                    {/* 🔍 Show prescription details if present */}
                    {/* {item.prescriptionDetails && (
                      <div className="mt-2 text-sm text-gray-700">
                        <strong>Prescription:</strong>{" "}
                        <pre className="whitespace-pre-wrap break-words bg-gray-100 rounded p-2 mt-1">
                          {typeof item.prescriptionDetails === "object"
                            ? JSON.stringify(item.prescriptionDetails, null, 2)
                            : item.prescriptionDetails}
                        </pre>
                      </div>
                    )} */}
                    
                    {/* 🔍 Show uploaded file name */}
                    {/* {item.uploadedPrescriptionFile && (
                      <p className="text-sm text-gray-600 mt-1">
                        📎 <strong>File:</strong> {item.uploadedPrescriptionFile}
                      </p>
                    )} */}
                    
                  </div>

                </Link>
              </div>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                ✖ Remove
              </button>
            </div>
          ))}
                
          {/* Total & Checkout */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-8 mt-10 gap-4 sm:gap-0">
            <div className="text-2xl font-semibold text-green-700">
              Total: ₹{totalPrice.toFixed(2)}
            </div>
            <button 
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all"
            >
              ✅ Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
