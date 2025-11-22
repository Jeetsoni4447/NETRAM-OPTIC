import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null); // true for success, false for error
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || '/profile';

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://netramoptics.onrender.com/api/auth/login', {
        email,
        password,
      });

      const user = res.data;
      const token = res.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setMessage('Login successful.');
      setIsSuccess(true);
      onLogin && onLogin(user);

      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      setMessage(err.response?.data?.message || 'Login failed.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white shadow-2xl rounded-2xl mt-10 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-300 transition-all"
        >
          Login
        </button>
        {message && (
          <p
            className={`text-center text-sm mt-2 ${
              isSuccess ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;