import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Video, Menu, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAvatarColor, getInitials } from '../../utils/avatar';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-md border-b border-zinc-800 h-16 flex items-center px-4 justify-between z-50">
      <div className="flex items-center gap-4">
        <Menu className="text-zinc-400 cursor-pointer lg:hidden" />
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl group">
          <div className="bg-red-600 p-1 rounded-lg group-hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
            <Video size={20} fill="white" className="text-white" />
          </div>
          Vtube
        </Link>
      </div>

      <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-full px-6 py-2 pr-12 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all font-light"
        />
        <button type="submit" className="absolute right-0 top-0 h-full px-5 text-zinc-500 hover:text-white transition-colors">
          <Search size={18} />
        </button>
      </form>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              onClick={toggleDropdown}
              className="w-9 h-9 rounded-full cursor-pointer flex items-center justify-center text-white ring-2 ring-transparent bg-zinc-800 hover:ring-red-600 transition-all font-bold text-sm shadow-md"
              style={{ backgroundColor: getAvatarColor(user.username || user.email) }}
            >
              {getInitials(user.username || user.email)}
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl py-2 overflow-hidden ring-1 ring-black animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-zinc-800 mb-1">
                  <p className="text-sm font-bold text-white truncate">{user.name || 'User'}</p>
                  <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                </div>
                
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LayoutDashboard size={18} className="text-red-500" /> Admin Panel
                  </Link>
                )}
                
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User size={18} /> My Profile
                </Link>
                
                <hr className="my-2 border-zinc-800" />
                
                <button 
                  onClick={logout}
                  className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={18} /> Logout Session
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
