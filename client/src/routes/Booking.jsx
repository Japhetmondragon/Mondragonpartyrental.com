import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeadForm from "../components/forms/LeadForm";
import { useBooking } from "../context/bookingContext.jsx";
import SEO from "../components/SEO";

export default function Booking() {
  const { items, updateQty, removeItem, clear, totalItems, totalPrice } = useBooking();
  const [showEmptyCartMessage, setShowEmptyCartMessage] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.pricePerDay * item.qty), 0);
  const estimatedDelivery = subtotal > 500 ? 0 : 75; // Free delivery over $500
  const discount = (subtotal * promoDiscount) / 100;
  const estimatedTotal = subtotal + estimatedDelivery - discount;

  useEffect(() => {
    if (items.length === 0) {
      setShowEmptyCartMessage(true);
    } else {
      setShowEmptyCartMessage(false);
    }
  }, [items.length]);

  const handleFormSubmitted = () => {
    clear();
    setShowEmptyCartMessage(true);
  };

  const handlePromoCode = () => {
    // Simple promo code logic (in real app, this would call an API)
    const validCodes = {
      'SAVE10': 10,
      'WEDDING20': 20,
      'FIRST15': 15
    };
    
    if (validCodes[promoCode.toUpperCase()]) {
      setPromoDiscount(validCodes[promoCode.toUpperCase()]);
      toast.success(`Promo code applied! ${validCodes[promoCode.toUpperCase()]}% off`);
    } else {
      toast.error('Invalid promo code');
    }
  };

  return (
    <>
      <SEO
        title="Get Your Custom Quote | LA Party & Catering"
        description="Get a personalized quote for your event. Professional party rentals and catering services in Los Angeles with transparent pricing."
        og={{
          title: "Get Your Custom Quote - LA Party & Catering",
          description: "Fast, personalized quotes for party rentals and catering in LA"
        }}
      />

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Get Your Custom Quote
              </h1>
              <p className="text-lg text-gray-600">
                Tell us about your event and we'll prepare a personalized quote with transparent pricing.
              </p>
              
              {/* Benefits */}
              <div className="mt-6 grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-blue-900">24hr Response</div>
                    <div className="text-xs text-blue-700">Fast turnaround</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-green-900">No Hidden Fees</div>
                    <div className="text-xs text-green-700">Transparent pricing</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-purple-900">Expert Support</div>
                    <div className="text-xs text-purple-700">Professional guidance</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <LeadForm selectedItems={items} onSubmitted={handleFormSubmitted} />
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Events Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">On-Time Delivery</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">24hr</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
              </div>
            </div>

            {/* Popular Add-ons */}
            {items.length > 0 && (
              <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Add-ons
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <PopularAddon
                    name="Professional Setup"
                    description="White-glove setup and breakdown"
                    price="150"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    }
                  />
                  <PopularAddon
                    name="Event Coordinator"
                    description="Day-of coordination service"
                    price="300"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    }
                  />
                  <PopularAddon
                    name="Emergency Kit"
                    description="Weather protection & backup power"
                    price="75"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Cart Summary */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Your Quote Summary
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {totalItems} item{totalItems !== 1 ? 's' : ''} selected
                  </p>
                </div>

                <div className="p-6">
                  {items.length === 0 ? (
                    <EmptyCartState showEmptyCartMessage={showEmptyCartMessage} />
                  ) : (
                    <div className="space-y-4">
                      {/* Cart Items */}
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {items.map(item => (
                          <CartItem 
                            key={item._id} 
                            item={item} 
                            onUpdateQty={updateQty}
                            onRemove={removeItem}
                          />
                        ))}
                      </div>

                      {/* Promo Code */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={handlePromoCode}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        {promoDiscount > 0 && (
                          <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {promoDiscount}% discount applied
                          </div>
                        )}
                      </div>

                      {/* Pricing Breakdown */}
                      <div className="pt-4 border-t border-gray-100 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal (per day)</span>
                          <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        
                        {promoDiscount > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              Discount ({promoDiscount}%)
                            </span>
                            <span className="font-medium text-green-600">
                              -${discount.toFixed(2)}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Est. Delivery & Setup
                            {estimatedDelivery === 0 && (
                              <span className="ml-1 text-green-600 font-medium">(Free)</span>
                            )}
                          </span>
                          <span className="font-medium">
                            ${estimatedDelivery.toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-100">
                          <span>Estimated Total</span>
                          <span>${estimatedTotal.toFixed(2)}</span>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-2">
                          *Final pricing may vary based on event specifics, duration, and additional services
                        </p>

                        {/* Savings Callout */}
                        {subtotal >= 500 && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 text-green-700">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm font-medium">
                                You saved $75 on delivery!
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Cart Actions */}
                      <div className="pt-4 space-y-3">
                        <button
                          onClick={clear}
                          className="w-full py-2 text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-lg font-medium transition-colors"
                        >
                          Clear All Items
                        </button>
                        <Link
                          to="/rentals"
                          className="block w-full py-2 text-center text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-lg font-medium transition-colors"
                        >
                          Add More Items
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our event specialists are here to help you plan the perfect event.
                </p>
                <div className="space-y-2">
                  <a 
                    href="tel:+15551234567"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call (555) 123-4567
                  </a>
                  <a 
                    href="mailto:hello@lapartycatering.com"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email us
                  </a>
                  <Link
                    to="/faq"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View FAQ
                  </Link>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Secure & Private</div>
                    <div className="text-xs text-gray-600">Your information is protected</div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  "Amazing service! Everything was perfect for our wedding."
                </p>
                <p className="text-xs text-gray-500">- Sarah M., Beverly Hills</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Empty Cart State Component
function EmptyCartState({ showEmptyCartMessage }) {
  if (showEmptyCartMessage) {
    return (
      <div className="text-center py-8">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Quote Submitted!</h3>
            <p className="text-sm text-gray-600 mb-4">
              We'll get back to you within 24 hours with your personalized quote.
            </p>
            <Link 
              to="/rentals"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              Browse more rentals
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <div className="space-y-4">
        <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 5H3m4 8a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-sm text-gray-600 mb-4">
            Add items from our rentals page to get started.
          </p>
          <Link 
            to="/rentals"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Rentals
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Cart Item Component
function CartItem({ item, onUpdateQty, onRemove }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQtyChange = async (newQty) => {
    if (newQty < 1) return;
    setIsUpdating(true);
    onUpdateQty(item._id, newQty);
    setTimeout(() => setIsUpdating(false), 300);
  };

  const handleRemove = () => {
    onRemove(item._id);
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm leading-tight">
          {item.name}
        </h4>
        <p className="text-xs text-gray-600 mt-1">
          ${item.pricePerDay}/day • {item.category}
        </p>
        
        <div className="flex items-center gap-3 mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQtyChange(item.qty - 1)}
              disabled={item.qty <= 1 || isUpdating}
              className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <input
              type="number"
              min="1"
              max="99"
              value={item.qty}
              onChange={(e) => handleQtyChange(parseInt(e.target.value) || 1)}
              className="w-12 px-2 py-1 text-center text-sm border-0 focus:outline-none"
              disabled={isUpdating}
            />
            
            <button
              onClick={() => handleQtyChange(item.qty + 1)}
              disabled={isUpdating}
              className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 transition-colors"
            aria-label="Remove item"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <div className="font-medium text-gray-900 text-sm">
          ${(item.pricePerDay * item.qty).toFixed(2)}
        </div>
        <div className="text-xs text-gray-500">
          {item.qty > 1 && `${item.qty} × $${item.pricePerDay}`}
        </div>
      </div>
    </div>
  );
}

// Popular Add-on Component
function PopularAddon({ name, description, price, icon }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    setIsAdded(true);
    // In a real app, this would add the addon to the cart
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm">{name}</h4>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-semibold text-gray-900">${price}</span>
            <button
              onClick={handleAdd}
              disabled={isAdded}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                isAdded
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isAdded ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}