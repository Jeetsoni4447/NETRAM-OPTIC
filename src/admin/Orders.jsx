import React from 'react';

const orders = [
  { id: '#1001', customer: 'Amit Sharma', date: '2025-07-05', amount: '₹1,499', status: 'Delivered' },
  { id: '#1002', customer: 'Sneha Patel', date: '2025-07-04', amount: '₹899', status: 'Pending' },
  { id: '#1003', customer: 'Ravi Kumar', date: '2025-07-04', amount: '₹2,199', status: 'Shipped' },
  { id: '#1004', customer: 'Pooja Mehta', date: '2025-07-03', amount: '₹3,999', status: 'Cancelled' },
  { id: '#1005', customer: 'Karan Verma', date: '2025-07-02', amount: '₹749', status: 'Delivered' },
  { id: '#1006', customer: 'Deepika Joshi', date: '2025-07-01', amount: '₹1,249', status: 'Pending' },
];

const statusColor = {
  Delivered: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const Orders = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h1>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-gray-100 border-b text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.amount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-blue-600 hover:underline text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
