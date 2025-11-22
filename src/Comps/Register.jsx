import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null); // true for success, false for error

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
    
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://netramoptics.onrender.com/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const user = res.data;
      const token = res.data.token;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setMessage('Registration successful.');
      setIsSuccess(true);
      onRegister && onRegister(user);

      window.location.href = '/profile';
    } catch (err) {
      console.error('Registration failed:', err);
      setMessage(err.response?.data?.message || 'Registration failed.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white shadow-2xl rounded-2xl mt-10 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-300 transition-all"
        >
          Register
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

export default Register;
