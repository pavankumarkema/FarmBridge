import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, X, ArrowRight, User, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/compare', label: 'Compare' },
    { to: '/markets', label: 'Mandis' },
    { to: '/compare', label: 'Crops' },
    { to: '/markets', label: 'Logistics' },
  ];

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'te', label: 'తెలుగు', short: 'తె' },
    { code: 'hi', label: 'हिंदी', short: 'हि' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const displayName = user?.name ? (user.name.length > 12 ? user.name.slice(0, 12) + '...' : user.name) : 'Farmer';
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <header className="w-full relative z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-6">
        <nav className="flex items-center justify-between py-2.5">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-black tracking-tighter text-gray-900 transition-transform hover:scale-105 select-none"
          >
            frambridge
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-gray-700">
            {navLinks.map((l, i) => (
              <Link
                key={i}
                to={l.to}
                className="hover:text-black transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Pill Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="bg-white/80 backdrop-blur-md border border-gray-200 hover:bg-white text-gray-800 text-xs font-bold px-3 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>{languages.find((l) => l.code === language)?.short || 'EN'}</span>
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-2xl shadow-xl p-1 z-50 animate-fade-in">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                        language === l.code ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{l.label}</span>
                      {language === l.code && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Find Mandi Pill Button */}
            <Link
              to="/compare"
              className="bg-white hover:bg-gray-50 text-gray-900 text-xs font-extrabold px-5 py-2.5 rounded-full border border-gray-200/80 shadow-sm hover:shadow transition-all"
            >
              Find a mandi
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200/80 rounded-full pl-1 pr-3 py-1 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {initial}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-gray-900 leading-tight">{displayName}</div>
                    <div className="text-[10px] uppercase font-semibold text-emerald-700 leading-tight">
                      {user.role || 'farmer'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl p-1.5 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                      <div className="text-xs font-bold text-gray-900">{user.name}</div>
                      <div className="text-[11px] text-gray-400 truncate">{user.email}</div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs text-gray-700 hover:text-black font-bold px-3 py-2"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                const next = language === 'en' ? 'te' : language === 'te' ? 'hi' : 'en';
                setLanguage(next);
              }}
              className="px-2.5 py-1 text-xs font-bold bg-white rounded-full border border-gray-200"
            >
              {languages.find((l) => l.code === language)?.short}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-800 bg-white/80 rounded-full border border-gray-200"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-3xl p-4 shadow-xl space-y-3 animate-fade-in">
            {user && (
              <div className="p-3 bg-emerald-50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    {initial}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">{user.name}</div>
                    <div className="text-[10px] text-emerald-700 font-semibold uppercase">{user.role}</div>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-xl font-bold"
                >
                  Dashboard
                </Link>
              </div>
            )}
            {navLinks.map((l, i) => (
              <Link
                key={i}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-bold text-gray-800 hover:text-emerald-600 px-3 py-2 rounded-xl"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 flex gap-2">
              <Link
                to="/compare"
                onClick={() => setMenuOpen(false)}
                className="btn-pill-dark flex-1 text-xs text-center py-2.5"
              >
                Find a mandi
              </Link>
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                    navigate('/login');
                  }}
                  className="text-xs font-bold text-red-600 px-3 py-2.5 rounded-full border border-red-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-bold text-gray-800 px-4 py-2.5 rounded-full border border-gray-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
