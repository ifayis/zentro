import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [appsDropdown, setAppsDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setMenuOpen(false);
    setAppsDropdown(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login", { replace: true });
  };

  const isLoggedIn = !!user;
  const isActive = (path) => location.pathname === path;

  const baseBtnClasses =
    "transition-transform duration-200 ease-in-out px-3 py-1 rounded font-semibold cursor-pointer select-none text-black";

  const activeGlow = "text-white shadow-[0_0_8px_2px_rgba(139,92,246,0.7)]";

  return (
    <nav className="bg-purple-700 fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex justify-center sm:justify-center">
            <h1
              onClick={() => navigate("/")}
              className="text-xl font-bold text-white cursor-pointer hover:scale-105 transition-transform select-none"
              aria-label="Go to home"
            >
              ZENTRO APP
            </h1>
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden sm:flex space-x-6 items-center relative">
            {isLoggedIn ? (
              <>
                {["/", "/about"].map((path) => {
                  const label = path === "/" ? "Home" : "About";
                  return (
                    <button
                      key={path}
                      onClick={() => navigate(path)}
                      className={`${baseBtnClasses} ${
                        isActive(path) ? activeGlow : ""
                      } hover:text-white hover:scale-105`}
                    >
                      {label}
                    </button>
                  );
                })}

                <div className="relative">
                  <button
                    onClick={() => setAppsDropdown(!appsDropdown)}
                    className={`${baseBtnClasses} hover:text-white hover:scale-105 flex items-center`}
                    aria-haspopup="true"
                    aria-expanded={appsDropdown}
                    aria-controls="apps-menu"
                  >
                    Apps ▾
                  </button>
                  {appsDropdown && (
                    <div
                      id="apps-menu"
                      className="absolute mt-2 bg-white border rounded shadow-lg p-2 w-40 z-50"
                    >
                      {[
                        { label: "BG Changer", path: "/bg-changer" },
                        { label: "Counter", path: "/counter" },
                        { label: "Timer", path: "/timer" },
                        { label: "Todo", path: "/todo" },
                        { label: "Calculator", path: "/calculator" },
                      ].map(({ label, path }) => (
                        <button
                          key={path}
                          onClick={() => {
                            setAppsDropdown(false);
                            navigate(path);
                          }}
                          className={`block text-gray-800 w-full text-left px-2 py-1 rounded hover:bg-purple-100`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className={`${baseBtnClasses} hover:text-white hover:scale-105`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {[
                  { label: "Login", path: "/login" },
                  { label: "Register", path: "/register" },
                ].map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    className={`${baseBtnClasses} ${
                      isActive(path) ? activeGlow : ""
                    } hover:text-white hover:scale-105`}
                  >
                    {label}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 animate-slide-down bg-purple-700">
          <div className="flex flex-col items-end space-y-2">
            {isLoggedIn ? (
              <>
                {[
                  { label: "Home", path: "/" },
                  { label: "About", path: "/about" },
                  { label: "BG Changer", path: "/bg-changer" },
                  { label: "Counter", path: "/counter" },
                  { label: "Timer", path: "/timer" },
                  { label: "Todo", path: "/todo" },
                  { label: "calculator", path: "/calculator" },
                ].map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(path);
                    }}
                    className={`text-black px-3 py-1 rounded font-semibold transition-transform duration-200 ease-in-out cursor-pointer select-none
                      ${
                        isActive(path) ? activeGlow : ""
                      } hover:text-white hover:scale-105`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-red-600 hover:text-red-800 transition-transform duration-200 ease-in-out px-3 py-1 rounded font-semibold cursor-pointer select-none"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {[
                  { label: "Login", path: "/login" },
                  { label: "Register", path: "/register" },
                ].map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(path);
                    }}
                    className={`text-black px-3 py-1 rounded font-semibold transition-transform duration-200 ease-in-out cursor-pointer select-none
                      ${
                        isActive(path) ? activeGlow : ""
                      } hover:text-white hover:scale-105`}
                  >
                    {label}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;