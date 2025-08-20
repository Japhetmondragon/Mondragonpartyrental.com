import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBooking } from "./context/bookingContext";
import Breadcrumbs from "./components/Breadcrumbs";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useBooking();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/90 backdrop-blur'
      } border-b`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
              LA Party & Catering
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/rentals">Rentals</NavLink>
              <NavLink to="/booking">Booking</NavLink>
              <NavLink to="/faq">FAQ</NavLink>
            </nav>

            {/* CTA and Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Cart Icon with Badge */}
              <Link 
                to="/booking" 
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 5H3m4 8a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* CTA Button */}
              <Link 
                to="/booking" 
                className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get Quote
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          }`}>
            <nav className="flex flex-col space-y-3 pt-4 border-t">
              <MobileNavLink to="/">Home</MobileNavLink>
              <MobileNavLink to="/rentals">Rentals</MobileNavLink>
              <MobileNavLink to="/booking">Booking</MobileNavLink>
              <MobileNavLink to="/faq">FAQ</MobileNavLink>
              <Link 
                to="/booking" 
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get Quote
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Breadcrumbs />
        <Outlet />
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <Link to="/" className="font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors">
                LA Party & Catering
              </Link>
              <p className="mt-3 text-gray-600 max-w-md">
                Professional party rentals and catering services across Los Angeles. 
                Making your special events memorable since 2020.
              </p>
              <div className="mt-4 flex space-x-4">
                <SocialLink href="#" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </SocialLink>
                <SocialLink href="#" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.938 16.91c.875.875 2.026 1.297 3.323 1.297h7.133c1.297 0 2.448-.49 3.323-1.297l1.188-1.219c-.875.875-2.026 1.297-3.323 1.297H8.449z"/>
                  </svg>
                </SocialLink>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/rentals" className="text-gray-600 hover:text-blue-600 transition-colors">Browse Rentals</Link></li>
                <li><Link to="/booking" className="text-gray-600 hover:text-blue-600 transition-colors">Get Quote</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>(555) 123-4567</li>
                <li>hello@lapartycatering.com</li>
                <li>Los Angeles, CA</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
            © {new Date().getFullYear()} LA Party & Catering • Los Angeles, CA • All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to}
      className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive 
          ? 'text-blue-600 bg-blue-50' 
          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-600 rounded-full transform -translate-x-1/2 translate-y-2"></span>
      )}
    </Link>
  );
}

function MobileNavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to}
      className={`px-3 py-2 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'text-blue-600 bg-blue-50' 
          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, children, ...props }) {
  return (
    <a 
      href={href}
      className="text-gray-400 hover:text-blue-600 transition-colors"
      {...props}
    >
      {children}
    </a>
  );
}