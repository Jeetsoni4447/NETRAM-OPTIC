import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded hover:bg-gray-700 ${
      pathname.includes(path) ? 'bg-gray-700 text-white' : 'text-gray-200'
    }`;

  return (
    <aside className="w-60 bg-gray-800 text-white h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">Admin</h1>
      <nav className="flex flex-col space-y-2">
        <Link to="/admin/dashboard" className={linkClass('dashboard')}>Dashboard</Link>
        <Link to="/admin/products" className={linkClass('products')}>Products</Link>
        <Link to="/admin/orders" className={linkClass('orders')}>Orders</Link>
        <Link to="/admin/users" className={linkClass('users')}>Users</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
