import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Sun, User, LogOut } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SISFS</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors">About</Link>
            <Link to="/services" className="text-gray-600 hover:text-primary-600 transition-colors">Services</Link>
            <Link to="/calculators" className="text-gray-600 hover:text-primary-600 transition-colors">Calculators</Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-gray-600 hover:text-primary-600"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                    {user.role === 'admin' ? (
                      <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Dashboard</Link>
                    ) : (
                      <Link to="/customer" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">My Dashboard</Link>
                    )}
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50">
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link to="/calculators" onClick={() => setMobileMenuOpen(false)}>Calculators</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <div className="flex gap-2 pt-2">
                {user ? (
                  <>
                    <Link to={user.role === 'admin' ? '/admin' : '/customer'} className="btn btn-primary flex-1">Dashboard</Link>
                    <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline flex-1">Login</Link>
                    <Link to="/register" className="btn btn-primary flex-1">Get Started</Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;