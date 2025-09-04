import { useState } from "react";
import { Link } from "react-router-dom";
import { useBooking } from "../../context/bookingContext.jsx";

export default function Card({ item }) {
  const { addItem, items } = useBooking();
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const img = item.images?.[0];
  const isInCart = items.some(i => i._id === item._id);
  const cartItem = items.find(i => i._id === item._id);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem(item, 1);
    
    // Simulate a brief loading state for better UX
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-teal-light focus-within:ring-offset-2">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Link to={`/rentals/${item.slug}`} className="block h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          <img
            loading="lazy"
            src={img?.url || "/placeholder.jpg"}
            alt={img?.alt || item.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Quick view button */}
        <Link
          to={`/rentals/${item.slug}`}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur text-gray-700 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 shadow-sm"
          aria-label={`View details for ${item.name}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </Link>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur text-xs font-medium text-gray-700 rounded-full">
            {item.category}
          </span>
        </div>

        {/* In cart indicator */}
        {isInCart && (
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-teal-400 text-white text-xs font-medium rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {cartItem?.qty > 1 ? `${cartItem.qty} in cart` : 'In cart'}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h2 className="font-semibold text-lg text-gray-900 leading-tight mb-1 group-hover:text-teal-600 transition-colors">
            <Link to={`/rentals/${item.slug}`} className="hover:underline">
              {item.name}
            </Link>
          </h2>
          
          {item.description && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${item.pricePerDay}
            </span>
            <span className="text-sm text-gray-500">/day</span>
          </div>
          
          {item.pricePerWeek && (
            <div className="text-sm text-gray-600">
              ${item.pricePerWeek}/week
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isInCart
                ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 focus:ring-green-500'
                : isAdding
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md focus:ring-teal-light'
            }`}
          >
            {isAdding ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Adding...
              </>
            ) : isInCart ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Added
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add to Quote
              </>
            )}
          </button>

          <Link 
            to="/booking"
            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-teal-light hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-teal-light focus:ring-offset-2 transition-all duration-300"
            aria-label="Go to checkout"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Additional info */}
        {(item.availability || item.minOrder) && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              {item.availability && (
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Available {item.availability}
                </span>
              )}
              {item.minOrder && (
                <span>Min. order: {item.minOrder}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}