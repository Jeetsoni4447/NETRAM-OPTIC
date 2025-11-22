const Dashboard = () => {
  const orders = [
    { id: '#1001', name: 'Amit Sharma', date: '2025-07-05', amount: '₹1,499', status: 'Delivered' },
    { id: '#1002', name: 'Sneha Patel', date: '2025-07-04', amount: '₹899', status: 'Pending' },
    { id: '#1003', name: 'Ravi Kumar', date: '2025-07-04', amount: '₹2,199', status: 'Shipped' },
    { id: '#1004', name: 'Pooja Mehta', date: '2025-07-03', amount: '₹3,999', status: 'Cancelled' },
    { id: '#1005', name: 'Karan Verma', date: '2025-07-02', amount: '₹749', status: 'Delivered' },
  ];

  const statusColor = {
    Delivered: 'text-green-600',
    Pending: 'text-yellow-600',
    Shipped: 'text-blue-600',
    Cancelled: 'text-red-600',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
          <h2 className="text-sm text-gray-500 uppercase">Orders</h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">124</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
          <h2 className="text-sm text-gray-500 uppercase">Revenue</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">₹56,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-purple-500">
          <h2 className="text-sm text-gray-500 uppercase">Users</h2>
          <p className="text-2xl font-bold text-purple-600 mt-2">540</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-orange-500">
          <h2 className="text-sm text-gray-500 uppercase">Products</h2>
          <p className="text-2xl font-bold text-orange-600 mt-2">89</p>
        </div>
      </div>

      {/* Recent Orders Table */}
     <div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>

  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-left text-gray-800">
      <thead className="bg-gray-100">
        <tr className="border-b border-gray-200">
          <th className="px-4 py-2 font-medium text-gray-700">Order ID</th>
          <th className="px-4 py-2 font-medium text-gray-700">Customer</th>
          <th className="px-4 py-2 font-medium text-gray-700">Date</th>
          <th className="px-4 py-2 font-medium text-gray-700">Amount</th>
          <th className="px-4 py-2 font-medium text-gray-700">Status</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="px-4 py-2 font-medium text-gray-900">{order.id}</td>
            <td className="px-4 py-2">{order.name}</td>
            <td className="px-4 py-2">{order.date}</td>
            <td className="px-4 py-2">₹{order.amount}</td>
            <td
              className={`px-4 py-2 font-semibold capitalize ${
                statusColor[order.status] || 'text-gray-700'
              }`}
            >
              {order.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
