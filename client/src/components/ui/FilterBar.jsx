import { useState, useEffect, useRef } from "react";

const CATEGORIES = ["Tents", "Tables", "Chairs", "Linens", "Heaters", "Lighting", "Audio/Visual"];
const SORT_OPTIONS = [
  { value: "", label: "Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "newest", label: "Newest First" }
];

export default function FilterBar({ value, onChange, totalResults = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    search: value?.search || "",
    category: value?.category || "",
    min: value?.min || "",
    max: value?.max || "",
    sort: value?.sort || ""
  });
  
  const searchInputRef = useRef(null);
  const hasActiveFilters = localFilters.category || localFilters.min || localFilters.max || localFilters.search;

  // Sync with external state changes
  useEffect(() => {
    setLocalFilters({
      search: value?.search || "",
      category: value?.category || "",
      min: value?.min || "",
      max: value?.max || "",
      sort: value?.sort || ""
    });
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange?.(prev => ({ 
      ...prev, 
      page: 1, 
      ...localFilters 
    }));
  };

  const handleQuickFilter = (key, filterValue) => {
    const newFilters = { ...localFilters, [key]: filterValue };
    setLocalFilters(newFilters);
    onChange?.(prev => ({ 
      ...prev, 
      page: 1, 
      ...newFilters 
    }));
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      category: "",
      min: "",
      max: "",
      sort: localFilters.sort // Keep sort when clearing
    };
    setLocalFilters(clearedFilters);
    onChange?.(prev => ({ 
      ...prev, 
      page: 1, 
      ...clearedFilters 
    }));
  };

  const focusSearch = () => {
    searchInputRef.current?.focus();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-6">
      {/* Quick Search Bar */}
      <div className="p-4 border-b border-gray-100">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-teal-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search rentals..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-deep focus:border-teal-light transition-colors"
              value={localFilters.search}
              onChange={e => setLocalFilters(prev => ({ ...prev, search: e.target.value }))}
            />
            {localFilters.search && (
              <button
                type="button"
                onClick={() => setLocalFilters(prev => ({ ...prev, search: "" }))}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-deep hover:text-teal-light"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-teal-deep text-white rounded-xl font-medium hover:bg-teal-light focus:outline-none focus:ring-2 focus:ring-teal-deep focus:ring-offset-2 transition-colors"
          >
            Search
          </button>
          
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-4 py-3 border border-gray-300 rounded-xl font-medium transition-all ${
              isExpanded ? 'bg-cream-butter border-teal-pale-300 text-teal-deep' : 'text-teal-deep hover:bg-cream-butter'
            }`}
            aria-expanded={isExpanded}
            aria-label="Toggle advanced filters"
          >
            <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </form>
      </div>

      {/* Quick Category Filters */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-stone-mid py-2">Categories:</span>
          <button
            onClick={() => handleQuickFilter('category', '')}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              !localFilters.category 
                ? 'bg-cream-butter text-teal-deep border border-cream-butter' 
                : 'bg-gray-100 text-stone-mid hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleQuickFilter('category', category)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                localFilters.category === category
                  ? 'bg-cream-butter text-teal-deep border border-cream-butter'
                  : 'bg-gray-100 text-stone-mid hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-mid mb-2">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="number"
                    placeholder="Min $"
                    min="0"
                    step="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-deep focus:border-teal-deep text-sm"
                    value={localFilters.min}
                    onChange={e => setLocalFilters(prev => ({ ...prev, min: e.target.value }))}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Max $"
                    min="0"
                    step="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-deep focus:border-teal-deep text-sm"
                    value={localFilters.max}
                    onChange={e => setLocalFilters(prev => ({ ...prev, max: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-mid mb-2">
                Sort By
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-deep focus:border-teal-deep text-sm"
                value={localFilters.sort}
                onChange={e => {
                  const newSort = e.target.value;
                  setLocalFilters(prev => ({ ...prev, sort: newSort }));
                  // Apply sort immediately
                  onChange?.(prev => ({ ...prev, sort: newSort }));
                }}
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-2 flex items-end gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-deep text-white rounded-lg font-medium hover:bg-teal-light focus:outline-none focus:ring-2 focus:ring-teal-deep focus:ring-offset-2 transition-colors"
              >
                Apply Filters
              </button>
              
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-4 py-2 text-teal-deep hover:text-teal-light font-medium transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Results Summary */}
      <div className="px-4 py-3 bg-gray-50 rounded-b-2xl">
        <div className="flex items-center justify-between text-sm">
          <div className="text-stone-mid">
            {totalResults > 0 ? (
              <>Showing {totalResults} result{totalResults !== 1 ? 's' : ''}</>
            ) : (
              <>No results found</>
            )}
            {hasActiveFilters && (
              <span className="ml-2">
                • {Object.entries(localFilters).filter(([key, value]) => value && key !== 'sort').length} filter{Object.entries(localFilters).filter(([key, value]) => value && key !== 'sort').length !== 1 ? 's' : ''} active
              </span>
            )}
          </div>
          
          {/* Keyboard shortcut hint */}
          <div className="hidden sm:flex items-center gap-2 text-gray-400">
            <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">⌘</kbd>
            <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">K</kbd>
            <span className="text-xs">to search</span>
          </div>
        </div>
      </div>
    </div>
  );
}