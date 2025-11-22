import React, { useState } from 'react';
import axios from 'axios';

const API = 'https://netramoptics.onrender.com'; // Change to Railway domain when deployed

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Invalid email format';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password });
      const { token, user } = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setMessage('Login successful.');
      onLogin && onLogin(user);
      window.location.href = '/profile';
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="...">
      <h2 className="...">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          className="..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <button
          type="submit"
          className="..."
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
              </svg>
              Logging in...
            </span>
          ) : 'Login'}
        </button>

        {message && <p className="text-center text-sm text-red-500">{message}</p>}
      </form>
          
      {/* Google Login Button */}
      <div className="mt-4 text-center">
        <a href="https://netramoptics.onrender.com/api/auth/google">
          <button className="google-btn flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:shadow">
            <img src="/google-icon.svg" alt="Google icon" className="w-5 h-5" />
            Continue with Google
          </button>
        </a>
      </div>
    </div>
  );
};

export const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (formData.username.trim().length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/auth/register`, formData);
      setMessage('Registration successful.');
      onRegister && onRegister(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="...">
      <h2 className="...">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="..."
          value={formData.username}
          onChange={handleChange}
          required
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="..."
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="..."
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <button
          type="submit"
          className="..."
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
              </svg>
              Registering...
            </span>
          ) : 'Register'}
        </button>

        {message && <p className="text-center text-sm text-red-500">{message}</p>}
      </form>
    </div>
  );
};
