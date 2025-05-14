import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const { name, email, password, confirmPassword } = formData;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!name || !email || !password || !confirmPassword) {
      return 'All fields are required.';
    }
    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await API.post('/auth/signup', formData);
      alert('Sign up successful!');
      navigate('/login');
    } catch (err) {
    let msg = 'Sign up failed. Try again.';
    const raw = err.response?.data?.message;

    if (raw === 'User already exists') {
        msg = 'This email is already registered.';
    }

    setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Sign up to start using Our Diary.
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={signupHandler} className="space-y-4">
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
