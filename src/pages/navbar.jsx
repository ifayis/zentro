import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [appsDropdown, setAppsDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login', { replace: true });
  };

  const isLoggedIn = !!user;

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex justify-center sm:justify-center">
            <h1
              onClick={() => navigate('/')}
              className="text-xl font-bold text-gray-800 cursor-pointer hover:scale-105 transition-transform"
            >
              ZENTRO APP
            </h1>
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden sm:flex space-x-6 items-center relative">
            {isLoggedIn ? (
              <>
                <button onClick={() => navigate('/')} className="text-gray-800 hover:text-blue-600 transition">Home</button>
                <button onClick={() => navigate('/about')} className="text-gray-800 hover:text-blue-600 transition">About</button>

                <div className="relative">
                  <button
                    onClick={() => setAppsDropdown(!appsDropdown)}
                    className="text-gray-800 hover:text-blue-600 transition"
                  >
                    Apps ▾
                  </button>
                  {appsDropdown && (
                    <div className="absolute mt-2 bg-white border rounded shadow-lg p-2 w-40 z-50">
                      <button onClick={() => navigate('/bg-changer')} className="block text-gray-800 w-full text-left px-2 py-1 hover:bg-indigo-100">BG Changer</button>
                      <button onClick={() => navigate('/counter')} className="block text-gray-800 w-full text-left px-2 py-1 hover:bg-indigo-100">Counter</button>
                      <button onClick={() => navigate('/timer')} className="block text-gray-800 w-full text-left px-2 py-1 hover:bg-indigo-100">Timer</button>
                      <button onClick={() => navigate('/todo')} className="block text-gray-800 w-full text-left px-2 py-1 hover:bg-indigo-100">Todo</button>
                    </div>
                  )}
                </div>

                <button onClick={handleLogout} className="text-red-600 hover:text-red-800 transition">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="text-gray-800 hover:text-blue-600 transition">Login</button>
                <button onClick={() => navigate('/register')} className="text-gray-800 hover:text-blue-600 transition">Register</button>
              </>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 animate-slide-down">
          <div className="flex flex-col items-end space-y-2">
            {isLoggedIn ? (
              <>
                <button onClick={() => { setMenuOpen(false); navigate('/'); }} className="text-gray-800 hover:text-blue-600 transition">Home</button>
                <button onClick={() => { setMenuOpen(false); navigate('/about'); }} className="text-gray-800 hover:text-blue-600 transition">About</button>
                <span className="text-gray-600 font-semibold mt-2">Apps</span>
                <button onClick={() => { setMenuOpen(false); navigate('/bg-changer'); }} className="text-gray-800 hover:text-blue-600 transition">BG Changer</button>
                <button onClick={() => { setMenuOpen(false); navigate('/counter'); }} className="text-gray-800 hover:text-blue-600 transition">Counter</button>
                <button onClick={() => { setMenuOpen(false); navigate('/timer'); }} className="text-gray-800 hover:text-blue-600 transition">Timer</button>
                <button onClick={() => { setMenuOpen(false); navigate('/todo'); }} className="text-gray-800 hover:text-blue-600 transition">Todo</button>
                <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="text-red-600 hover:text-red-800 transition">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => { setMenuOpen(false); navigate('/login'); }} className="text-gray-800 hover:text-blue-600 transition">Login</button>
                <button onClick={() => { setMenuOpen(false); navigate('/register'); }} className="text-gray-800 hover:text-blue-600 transition">Register</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;