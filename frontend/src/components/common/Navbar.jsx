import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { User, Briefcase, Home, Search } from "lucide-react";
import Logo from "../../assets/jp.jpeg"

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={Logo} 
              alt="Logo" 
              className="h-10 w-10 rounded-full border-2 border-white shadow-md"
            />
            <span className="font-bold text-2xl tracking-wide">JobPortal</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {user && user.role === "EMPLOYER" && (
              <>
                <Link to="/employer/dashboard" className="flex items-center gap-1 hover:text-yellow-300 transition">
                  <Home size={18} /> Dashboard
                </Link>
                <Link to="/employer/my-jobs" className="flex items-center gap-1 hover:text-yellow-300 transition">
                  <Briefcase size={18} /> My Jobs
                </Link>
                <Link to="/employer/create-job" className="flex items-center gap-1 hover:text-yellow-300 transition">
                  <Briefcase size={18} /> Create Job
                </Link>
              </>
            )}
            {user && user.role === "SEEKER" && (
              <>
                <Link to="/seeker/dashboard" className="flex items-center gap-1 hover:text-yellow-300 transition">
                  <Home size={18} /> Dashboard
                </Link>
                <Link to="/seeker/my-applications" className="flex items-center gap-1 hover:text-yellow-300 transition">
                  <Briefcase size={18} /> My Applications
                </Link>
                <Link to="/about-us" className="flex items-center gap-1 hover:text-yellow-300 transition">
                  <Search size={18} /> About Us
                </Link>
              </>
            )}

            {user && (
              <div className="flex items-center space-x-3">
                <User size={18} />
                <span className="font-semibold">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline btn-white hover:bg-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-indigo-700 p-3 rounded-lg shadow-lg">
            {user && user.role === "EMPLOYER" && (
              <>
                <Link to="/employer/dashboard" className="block hover:text-yellow-300 transition">Dashboard</Link>
                <Link to="/employer/my-jobs" className="block hover:text-yellow-300 transition">My Jobs</Link>
                <Link to="/employer/create-job" className="block hover:text-yellow-300 transition">Create Job</Link>
              </>
            )}
            {user && user.role === "SEEKER" && (
              <>
                <Link to="/seeker/dashboard" className="block hover:text-yellow-300 transition">Dashboard</Link>
                <Link to="/seeker/my-applications" className="block hover:text-yellow-300 transition">My Applications</Link>
                <Link to="/about-us" className="block hover:text-yellow-300 transition">About us</Link>
              </>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="btn btn-error w-full mt-2"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
