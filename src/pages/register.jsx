import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }

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

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post(`https://zentro-1qs5.onrender.com/users`, {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        setForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/login')
      } catch (err) {
        setErrors({ api: 'Failed to register. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-text px-4">
      <div className="bg-secondary rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-accent mb-8 text-center">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7">
          {['name', 'email', 'password', 'confirmPassword'].map((field) => {
            const isEmail = field === 'email';
            const isPassword = field.toLowerCase().includes('password');
            const label =
              field === 'confirmPassword'
                ? 'Confirm Password'
                : field.charAt(0).toUpperCase() + field.slice(1);

            return (
              <div
                key={field}
                className={`relative border-b ${errors[field] ? 'border-red-500' : 'border-accent'
                  } focus-within:${errors[field] ? 'border-red-500' : 'border-highlight'
                  }`}
              >
                <input
                  type={isPassword ? 'password' : isEmail ? 'email' : 'text'}
                  name={field}
                  id={field}
                  required
                  value={form[field]}
                  onChange={handleChange}
                  placeholder=" "
                  className={`peer w-full bg-transparent text-text placeholder-transparent focus:outline-none py-4 ${errors[field] ? 'text-red-300' : ''
                    }`}
                />
                <label
                  htmlFor={field}
                  className={`absolute left-0 text-gray-400 transition-all duration-200 
                  ${form[field]
                      ? 'top-0 text-sm'
                      : 'peer-placeholder-shown:top-3 peer-focus:top-0 peer-focus:text-sm'
                    } ${errors[field]
                      ? 'text-red-500'
                      : 'peer-focus:text-accent peer-valid:text-accent'
                    }`}
                >
                  {label}
                </label>
                {errors[field] && (
                  <p className="text-sm text-red-400 mt-1">{errors[field]}</p>
                )}
              </div>
            );
          })}

          {errors.api && (
            <p className="text-red-500 text-sm text-center">{errors.api}</p>
          )}


          <button
            type="submit"
            className="w-full bg-accent text-primary py-3 rounded-lg font-bold text-lg 
              hover:bg-highlight hover:text-white transition-all duration-300 shadow-md hover:shadow-xl 
              transform hover:scale-105"
          >
            SIGN UP
          </button>
        </form>

        <p className="text-sm text-center text-lightText mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-highlight font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;