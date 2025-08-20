import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import Card from "../components/ui/Card";
import FilterBar from "../components/ui/FilterBar";
import SEO from "../components/SEO";
import { useBooking } from "../context/bookingContext";

export default function Rentals() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const { addItem, items } = useBooking();
  
  // Initialize params from URL
  const [params, setParams] = useState(() => ({
    page: parseInt(searchParams.get('page')) || 1,
    limit: 24,
    category: searchParams.get('category') || "",
    min: searchParams.get('min') || "",
    max: searchParams.get('max') || "",
    search: searchParams.get('search') || "",
    sort: searchParams.get('sort') || ""
  }));

  // Update URL when params change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "" && key !== 'limit') {
        newSearchParams.set(key, value.toString());
      }
    });
    setSearchParams(newSearchParams, { replace: true });
  }, [params, setSearchParams]);

  const queryKey = useMemo(() => ["items", params], [params]);
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const qs = new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).filter(([, v]) => v !== "" && v !== undefined)
        )
      ).toString();
      const { data } = await api.get(`/items?${qs}`);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  const handleParamsChange = (newParams) => {
    setParams(newParams);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className={`${viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse ${
          viewMode === 'list' ? 'p-6' : ''
        }`}>
          {viewMode === 'grid' ? (
            <>
              <div className="aspect-[4/3] bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="flex gap-2">
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                  <div className="h-10 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex gap-6">
              <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-16">
      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-4">We couldn't load the rentals. Please try again.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-16">
      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
      <p className="text-gray-600 mb-4">
        Try adjusting your filters or search terms to find what you're looking for.
      </p>
      <button 
        onClick={() => setParams({ page: 1, limit: 24, category: "", min: "", max: "", search: "", sort: "" })}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  const totalResults = data?.total || 0;
  const currentPage = data?.page || 1;
  const totalPages = data?.totalPages || 1;

  return (
    <>
      <SEO
        title={`Party Rentals ${params.category ? `- ${params.category}` : ''} | LA Party & Catering`}
        description={`Browse our extensive collection of party rentals including tents, tables, chairs, and more. Professional event equipment in Los Angeles.`}
        og={{
          title: `Party Rentals${params.category ? ` - ${params.category}` : ''} in Los Angeles`,
          description: "Premium event rental equipment for any occasion"
        }}
      />

      <section className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {params.category ? `${params.category} Rentals` : 'All Rentals'}
              </h1>
              <p className="text-gray-600">
                Professional-grade equipment for your perfect event
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label="Grid view"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label="List view"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Breadcrumb for category */}
          {params.category && (
            <nav className="text-sm mb-6" aria-label="Category breadcrumb">
              <ol className="flex items-center gap-2">
                <li>
                  <button 
                    onClick={() => setParams(prev => ({ ...prev, category: "", page: 1 }))}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    All Rentals
                  </button>
                </li>
                <li className="text-gray-400">›</li>
                <li className="text-gray-900 font-medium">{params.category}</li>
              </ol>
            </nav>
          )}
        </div>

        {/* Filter Bar */}
        <FilterBar 
          value={params} 
          onChange={handleParamsChange}
          totalResults={totalResults}
        />

        {/* Main Content */}
        {error ? (
          <ErrorState />
        ) : isLoading ? (
          <LoadingSkeleton />
        ) : !data?.items?.length ? (
          <EmptyState />
        ) : (
          <div className="space-y-8">
            {/* Results Grid/List */}
            <div className={`transition-all duration-300 ${
              viewMode === 'grid' 
                ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
            }`}>
              {data.items.map((item, index) => (
                <div 
                  key={item._id} 
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {viewMode === 'grid' ? (
                    <Card item={item} />
                  ) : (
                    <ListCard item={item} />
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * params.limit) + 1} to {Math.min(currentPage * params.limit, totalResults)} of {totalResults} results
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setParams(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setParams(prev => ({ ...prev, page: pageNum }))}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setParams(prev => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Finding Something?
            </h2>
            <p className="text-gray-600 mb-6">
              Our event specialists are here to help you find the perfect rentals for your occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (555) 123-4567
              </a>
              <a 
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Get Custom Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// List view card component
function ListCard({ item }) {
  const { addItem, items } = useBooking();
  const [isAdding, setIsAdding] = useState(false);
  const isInCart = items.some(i => i._id === item._id);
  const cartItem = items.find(i => i._id === item._id);
  const img = item.images?.[0];

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem(item, 1);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex gap-6">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            loading="lazy"
            src={img?.url || "/placeholder.jpg"}
            alt={img?.alt || item.name}
            className="w-24 h-24 object-cover rounded-xl"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-gray-900">
                  <a href={`/rentals/${item.slug}`} className="hover:text-blue-600 transition-colors">
                    {item.name}
                  </a>
                </h3>
                {isInCart && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    {cartItem?.qty > 1 ? `${cartItem.qty} in cart` : 'In cart'}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.category}</p>
              {item.description && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {item.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="text-right ml-4">
              <div className="text-2xl font-bold text-gray-900">
                ${item.pricePerDay}
              </div>
              <div className="text-sm text-gray-500">/day</div>
              {item.pricePerWeek && (
                <div className="text-xs text-gray-400">
                  ${item.pricePerWeek}/week
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isInCart
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : isAdding
                  ? 'bg-blue-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isAdding ? 'Adding...' : isInCart ? 'Added to Quote' : 'Add to Quote'}
            </button>
            <a 
              href={`/rentals/${item.slug}`}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}