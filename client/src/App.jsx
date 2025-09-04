import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBooking } from "./context/bookingContext";

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
            <div className="flex items-center space-x-3">
             {/*<Link to='/' className="hover:scale-105 transition-transform">
                <img src="/Mondragonpartrentals.com.svg" alt="Mondragon Party Rentals & Catering" className="h-14 w-auto"/>
              </Link>*/}
              <Link to="/" className="font-bold font-[Meow_Script] text-3xl bg-gradient-to-r from-teal-deep to-teal-light bg-clip-text text-transparent hover:scale-105 transition-transform"> 
                Mondragon <span class="ml-1 text-base font-[Inter]">Party Rental</span>
              </Link>
            </div>

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
                className="relative p-2 text-gray-600 hover:text-teal-deep transition-colors"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 5H3m4 8a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-deep text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* CTA Button */}
              <Link 
                to="/booking" 
                className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-deep to-teal-light rounded-lg font-medium hover:from-teal-deep hover:to-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
              >
              <div className="text-white">Get Quote</div>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-deep rounded-lg"
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
                className="inline-flex items-center justify-center px-4 py-2 bg-teal-deep rounded-lg font-medium hover:bg-teal-light transition-colors"
              >
                <div className="text-white">Get Quote</div>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3">
                <Link to='/' className="hover:scale-105 transition-transform">
                  <img src="/Mondragonpartrentals.com.svg" alt="Mondragon Party Rentals & Catering" className="h-20 w-auto"/>
                </Link>
                <Link to="/" className="font-bold font-[Meow_Script] text-4xl bg-gradient-to-r from-teal-deep to-teal-light bg-clip-text text-transparent hover:scale-105 transition-transform">
                    Mondragon <span class="ml-2 text-xl font-[Inter]">Party Rental</span> 
                </Link>
              </div>
              <p className="mt-3 text-stone-mid max-w-md">
                Professional party rentals and catering services across San Diego. 
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
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </SocialLink>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-teal-deep mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/rentals" className="hover:text-teal-deep transition-colors">Browse Rentals</Link></li>
                <li><Link to="/booking" className="hover:text-teal-deep transition-colors">Get Quote</Link></li>
                <li><Link to="/faq" className="hover:text-teal-deep transition-colors">FAQ</Link></li>
                <li><a href="#" className="hover:text-teal-deep transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-teal-deep mb-3">Contact</h3>
              <ul className="space-y-2 text-sm text-stone-mid">
                <li>(555) 123-4567</li>
                <li>hello@lapartycatering.com</li>
                <li>San Diego, CA</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-stone-mid">
            © {new Date().getFullYear()} Mondragon Party Rentals & Catering • San Diego, CA • All rights reserved
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
          ? 'text-teal-deep bg-teal-50' 
          : 'text-gray-700 hover:text-teal-deep hover:bg-gray-50'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-teal-deep rounded-full transform -translate-x-1/2 translate-y-2"></span>
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
          ? 'text-teal-deep bg-teal-50' 
          : 'text-gray-700 hover:text-teal-deep hover:bg-gray-50'
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
      className="text-gray-400 hover:text-teal-deep transition-colors"
      {...props}
    >
      {children}
    </a>
  );
}