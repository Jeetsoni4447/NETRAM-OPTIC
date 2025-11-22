import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://netramoptics.onrender.com/api/orders/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('❌ Could not load orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 to-white py-16 px-4 relative">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full opacity-20 z-0"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-500 rounded-full opacity-20 z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10">👤 Your Profile & Orders</h1> */}

        {/* Profile Card */}
        {user && (
          <div className="bg-white relative p-6 mb-10 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <i className="fa-solid fa-user text-indigo-700 text-2xl"></i>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">Welcome, {user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="absolute top-4 right-4 text-red-600 hover:text-red-700 flex items-center gap-2"
              title="Logout"
            >
              <i className="fa-solid fa-right-from-bracket text-md"></i>
              <span className="hidden sm:inline text-sm font-medium">Logout</span>
            </button>
          </div>
        )}

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-600 text-lg">😔 No orders found. Go shopping and treat yourself.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, orderIndex) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-xl shadow-md border"
              >
                <h2 className="text-xl font-semibold text-indigo-700 mb-4">
                  🧾 Order #{orderIndex + 1} — <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-4 border p-3 rounded-lg">
                      <div className="w-24 h-24 flex items-center justify-center bg-white border rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-w-full max-h-full rounded-sm object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">Lens: {item.lensType}</p>
                        <p className="text-sm text-green-700 font-semibold">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p><strong>Status:</strong> <span className="text-indigo-600">{order.status}</span></p>
                  <p><strong>Total Paid:</strong> ₹{order.totalAmount}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
