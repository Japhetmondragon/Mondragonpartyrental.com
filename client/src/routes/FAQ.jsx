import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import SEO from "../components/SEO";

const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: '❓' },
  { id: 'general', label: 'General', icon: '📋' },
  { id: 'pricing', label: 'Pricing', icon: '💰' },
  { id: 'delivery', label: 'Delivery & Setup', icon: '🚚' },
  { id: 'rentals', label: 'Rental Items', icon: '🎪' },
  { id: 'catering', label: 'Catering', icon: '🍽️' },
  { id: 'policies', label: 'Policies', icon: '📄' }
];

// Fallback FAQ data if API fails
const FALLBACK_FAQS = [
  {
    _id: '1',
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 2-3 weeks in advance for standard events. For weddings and large events, 6-8 weeks is ideal. However, we often accommodate last-minute requests based on availability.',
    category: 'general'
  },
  {
    _id: '2',
    question: 'What areas do you deliver to?',
    answer: 'We deliver throughout Los Angeles County and surrounding areas including Orange County, Ventura County, and parts of Riverside and San Bernardino counties. Delivery fees vary by distance.',
    category: 'delivery'
  },
  {
    _id: '3',
    question: 'Do you provide setup and breakdown services?',
    answer: 'Yes! We offer full-service setup and breakdown for all rentals. Our professional team will arrive before your event to set everything up and return after to break it down.',
    category: 'delivery'
  },
  {
    _id: '4',
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made 7+ days before the event receive a full refund minus a small processing fee. Cancellations within 7 days are subject to a 50% charge. Weather-related cancellations are handled case-by-case.',
    category: 'policies'
  },
  {
    _id: '5',
    question: 'How is pricing calculated?',
    answer: 'Pricing is based on the rental period (daily, weekly rates), delivery distance, setup requirements, and any additional services. We provide transparent, upfront pricing with no hidden fees.',
    category: 'pricing'
  },
  {
    _id: '6',
    question: 'Do you offer damage protection?',
    answer: 'Yes, we offer optional damage protection for a small fee. This covers accidental damage during your event. We also require a security deposit that is refunded after the event if items are returned in good condition.',
    category: 'policies'
  }
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState(new Set());

  const { data, isLoading, error } = useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      try {
        const response = await api.get("/faq");
        return response.data;
      } catch (error) {
        // Return fallback data if API fails
        return { faqs: FALLBACK_FAQS };
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1
  });

  const faqs = data?.faqs || FALLBACK_FAQS;

  // Filter and search FAQs
  const filteredFaqs = useMemo(() => {
    let filtered = faqs;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [faqs, selectedCategory, searchQuery]);

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const expandAll = () => {
    setOpenItems(new Set(filteredFaqs.map(faq => faq._id)));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  return (
    <>
      <SEO
        title="Frequently Asked Questions | LA Party & Catering"
        description="Get answers to common questions about our party rentals, catering services, delivery, pricing, and policies in Los Angeles."
        og={{
          title: "FAQ - LA Party & Catering",
          description: "Find answers to all your questions about our party rental and catering services"
        }}
      />

      <section className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our party rentals and catering services
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {FAQ_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Results Summary and Controls */}
          {!isLoading && (
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-600">
                {filteredFaqs.length > 0 ? (
                  <>Showing {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''}</>
                ) : (
                  <>No questions found</>
                )}
                {searchQuery && (
                  <span className="ml-2">for "{searchQuery}"</span>
                )}
              </div>
              
              {filteredFaqs.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={expandAll}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Expand All
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={collapseAll}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Collapse All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !data && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load FAQs</h3>
            <p className="text-gray-600 mb-4">Please try again or contact us directly.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or browse a different category.
            </p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Search
              </button>
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Show All Questions
              </button>
            </div>
          </div>
        )}

        {/* FAQ Items */}
        {!isLoading && filteredFaqs.length > 0 && (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div 
                key={faq._id} 
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => toggleItem(faq._id)}
                  className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={openItems.has(faq._id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 transition-transform duration-200 ${
                      openItems.has(faq._id) ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                <div className={`px-6 overflow-hidden transition-all duration-300 ${
                  openItems.has(faq._id) 
                    ? 'max-h-96 pb-4 opacity-100' 
                    : 'max-h-0 pb-0 opacity-0'
                }`}>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our friendly team is here to help! Get in touch and we'll get back to you within a few hours.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <a 
                href="tel:+15551234567"
                className="flex flex-col items-center p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                <p className="text-sm text-gray-600">(555) 123-4567</p>
              </a>

              <a 
                href="mailto:hello@lapartycatering.com"
                className="flex flex-col items-center p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                <p className="text-sm text-gray-600">hello@lapartycatering.com</p>
              </a>

              <Link 
                to="/booking"
                className="flex flex-col items-center p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Get Quote</h3>
                <p className="text-sm text-gray-600">Fast online quote</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Popular Topics
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FAQ_CATEGORIES.slice(1).map(category => {
              const categoryCount = faqs.filter(faq => faq.category === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {categoryCount} question{categoryCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}