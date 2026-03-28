/**
 * Top navigation bar with glassmorphism styling.
 */
import { Link, useLocation } from 'react-router-dom';
import { BookUser, Plus, Home } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'text-primary-600 bg-primary-50/80'
      : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50/50';

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-200 group-hover:shadow-xl group-hover:shadow-primary-300 transition-all duration-300">
              <BookUser className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              AddressBook
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive('/')}`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <Link
              to="/add"
              className="btn-primary text-sm !py-2.5 !px-4"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
