import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setAuthError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.get(
          `http://localhost:5000/users?email=${form.email}&password=${form.password}`
        );

        if (response.data.length > 0) {
          const user = response.data[0];
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('zentro_user_email', form.email);
          localStorage.setItem('zentro_user_email', user.email);

          navigate('/');
        } else {
          setAuthError('Incorrect email or password');
        }
      } catch (error) {
        console.error('Login error:', error);
        setAuthError('Server error during login');
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4 text-text">
      <div className="bg-secondary rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-accent mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {['email', 'password'].map((field) => (
            <div
              key={field}
              className={`relative border-b ${errors[field] || authError ? 'border-red-500' : 'border-accent'
                } focus-within:${errors[field] || authError ? 'border-red-500' : 'border-highlight'
                }`}
            >
              <input
                type={field}
                name={field}
                id={field}
                value={form[field]}
                onChange={handleChange}
                placeholder=" "
                required
                className="peer w-full bg-transparent text-text placeholder-transparent focus:outline-none py-4"
              />
              <label
                htmlFor={field}
                className={`absolute left-0 top-0 text-gray-400 transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-focus:top-0 peer-focus:text-sm
                  peer-valid:top-0 peer-valid:text-sm
                  ${errors[field] || authError
                    ? 'text-red-500'
                    : 'peer-focus:text-accent peer-valid:text-accent'
                  }`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {errors[field] && (
                <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          {authError && (
            <p className="text-sm text-red-500 text-center -mt-4">{authError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-accent text-primary py-3 rounded-lg font-bold text-lg hover:bg-highlight hover:text-white transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
          >
            SIGN IN
          </button>
        </form>

        <p className="text-sm text-center text-lightText mt-6">
          Don’t have an account?{' '}
          <a href="/register" className="text-highlight font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;