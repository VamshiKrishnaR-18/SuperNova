import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      {isAuthenticated && (
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-5">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <Link to="/shop" className="text-2xl font-bold">
                <span className="supernova">SuperNova</span>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                <Link 
                  to="/shop" 
                  className={`hover:text-blue-500 transition-colors ${
                    isActive('/shop') ? 'text-blue-500 font-semibold' : 'text-gray-700'
                  }`}
                >
                  Shop
                </Link>
                <Link 
                  to="/cart" 
                  className={`hover:text-blue-500 transition-colors ${
                    isActive('/cart') ? 'text-blue-500 font-semibold' : 'text-gray-700'
                  }`}
                >
                  Cart
                </Link>
                <Link 
                  to="/profile" 
                  className={`hover:text-blue-500 transition-colors ${
                    isActive('/profile') ? 'text-blue-500 font-semibold' : 'text-gray-700'
                  }`}
                >
                  Profile
                </Link>
                <Link 
                  to="/about" 
                  className={`hover:text-blue-500 transition-colors ${
                    isActive('/about') ? 'text-blue-500 font-semibold' : 'text-gray-700'
                  }`}
                >
                  About
                </Link>

                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    Welcome, {user?.fullname}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
