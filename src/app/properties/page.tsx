"use client";
import { useState, useEffect, Suspense, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ContactModal from "../../components/ContactModal";
import PropertyCardSkeleton from "../../components/PropertyCardSkeleton";
import AdvancedSearchModal from "../../components/AdvancedSearchModal";
import SearchHistory from "../../components/SearchHistory";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  HomeIcon,
  BuildingOfficeIcon,
  EyeIcon,
  PhoneIcon,
  StarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import { PropertiesService, PropertiesListParams } from "../../api/services/properties.service";
import { toApiError } from "../../api/errors";
import { PropertyModel } from "../../api/models";
import { mediaUrl } from "../../api/config";
import { useSearch } from "../../contexts/SearchContext";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  priceType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  image: string;
  featured: boolean;
  rating: number;
  views: number;
  description: string;
  agentName: string;
  agentEmail: string;
  agentPhone: string;
}

const propertyTypes = [
  { id: "all", name: "All Types", icon: HomeIcon },
  { id: "apartment", name: "Apartment", icon: BuildingOfficeIcon },
  { id: "house", name: "House", icon: HomeIcon },
  { id: "villa", name: "Villa", icon: HomeIcon },
  { id: "townhouse", name: "Townhouse", icon: HomeIcon },
  { id: "office", name: "Office", icon: BuildingOfficeIcon },
];

const priceRanges = [
  { id: "all", name: "All Prices" },
  { id: "0-1000", name: "Under GH¢1,000" },
  { id: "1000-5000", name: "GH¢1,000 - GH¢5,000" },
  { id: "5000-50000", name: "GH¢5,000 - GH¢50,000" },
  { id: "50000-200000", name: "GH¢50,000 - GH¢200,000" },
  { id: "200000+", name: "Over GH¢200,000" },
];

const locations = [
  { id: "all", name: "All Locations" },
  { id: "accra", name: "Accra" },
  { id: "kumasi", name: "Kumasi" },
  { id: "tamale", name: "Tamale" },
  { id: "tema", name: "Tema" },
  { id: "takoradi", name: "Takoradi" },
  { id: "eastern-region", name: "Eastern Region" },
  { id: "ashanti", name: "Ashanti Region" },
];

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { 
    currentFilters, 
    updateFilters, 
    saveSearchToHistory, 
    getSearchSummary,
    hasActiveFilters,
    getFilterCount 
  } = useSearch();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<{
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedPriceType, setSelectedPriceType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("created_at_desc");
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  
  // Advanced search modal states
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  // Build API parameters from current filters
  const buildApiParams = useCallback((): PropertiesListParams => {
    const params: PropertiesListParams = {
      page: currentPage,
      per_page: perPage,
      sort_by: sortBy,
    };

    // Add search term
    if (searchTerm.trim()) {
      params.search = searchTerm.trim();
    }

    // Add property type filter
    if (selectedType !== "all") {
      params.property_type = selectedType;
    }

    // Add price type filter
    if (selectedPriceType !== "all") {
      params.price_type = selectedPriceType;
    }

    // Add location filter
    if (selectedLocation !== "all") {
      params.location = selectedLocation;
    }

    // Add price range filter
    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      if (max) {
        params.min_price = min;
        params.max_price = max;
      } else {
        params.min_price = min;
      }
    }

    return params;
  }, [currentPage, perPage, sortBy, searchTerm, selectedType, selectedPriceType, selectedLocation, selectedPriceRange]);

  // Fetch properties from API
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = buildApiParams();
      const response = await PropertiesService.list(params);
      
      const mapped: Property[] = response.properties.map((p: PropertyModel) => ({
        id: p.id,
        title: p.title,
        location: `${p.location}, ${p.city}, ${p.region}`,
        price: parseFloat(p.price),
        priceType: p.price_type,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        area: parseFloat(p.area_sqm),
        type: p.property_type,
        image: mediaUrl(p.image),
        featured: p.is_featured,
        rating: parseFloat(p.rating),
        views: p.views_count,
        description: p.description,
        agentName: p.agent.name,
        agentEmail: p.agent.email,
        agentPhone: p.agent.phone || "",
      }));
      
      setProperties(mapped);
      setPagination(response.pagination);
    } catch (e) {
      console.error("Properties fetch error:", e);
      const apiErr = toApiError(e);
      setError(`Error loading properties: ${apiErr.message}`);
      setProperties([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [buildApiParams]);

  // Initial load and when filters change
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Handle URL parameters for location filtering
  useEffect(() => {
    const locationParam = searchParams.get("location");
    if (locationParam) {
      setSelectedLocation(locationParam);
      // Auto-expand filters when location is pre-selected
      setShowFilters(true);
    }
  }, [searchParams]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedPriceType, selectedLocation, selectedPriceRange, sortBy]);

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  // Advanced search handler
  const handleAdvancedSearch = async (filters: {
    searchTerm: string;
    propertyType: string;
    priceRange: [number, number];
    priceType: string;
    location: string;
    bedrooms: [number, number];
    bathrooms: [number, number];
    areaRange: [number, number];
    amenities: string[];
    propertyStatus: string;
    featured: boolean | null;
    minRating: number;
    sortBy: string;
    sortOrder: string;
  }) => {
    try {
      // Update the search context with new filters
      updateFilters(filters);
      
      // Update local state to match advanced search filters
      setSearchTerm(filters.searchTerm || "");
      setSelectedType(filters.propertyType || "all");
      setSelectedPriceType(filters.priceType || "all");
      setSelectedLocation(filters.location || "all");
      setSortBy(filters.sortBy || "created_at_desc");
      
      // Reset to first page
      setCurrentPage(1);
      
      // Save search to history if user is logged in
      if (filters.searchTerm || hasActiveFilters()) {
        await saveSearchToHistory(
          filters.searchTerm || "Advanced Search",
          filters,
          properties.length
        );
      }
      
      // Fetch properties with new filters
      await fetchProperties();
    } catch (error) {
      console.error("Failed to perform advanced search:", error);
    }
  };

  // Handle search history selection
  const handleSearchHistorySelect = (query: string, filters: Record<string, unknown>) => {
    setSearchTerm(query);
    updateFilters(filters);
    setCurrentPage(1);
    fetchProperties();
  };


  const formatPrice = (price: number, type: string) => {
    if (type === "rent") {
      return `GH¢${price.toLocaleString()}/month`;
    }
    return `GH¢${price.toLocaleString()}`;
  };

  const handleContactClick = (property: Property) => {
    setSelectedProperty(property);
    setShowContactModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Find Your{" "}
              <span className="text-orange-600 dark:text-orange-400">
                Dream Property
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Discover exceptional properties across Ghana. From cozy apartments
              to luxury villas, we have the perfect home waiting for you.
            </p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      Unable to load properties
                    </h3>
                    <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                      {error}
                    </p>
                    <div className="mt-3">
                      <button
                        onClick={fetchProperties}
                        className="text-sm bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-3 py-1 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Location Filter Success Message */}
            {selectedLocation !== "all" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto mb-6"
              >
                <div className="bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-700 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
                    <MapPinIcon className="w-5 h-5" />
                    <span className="font-semibold">
                      Showing properties in{" "}
                      {locations.find((loc) => loc.id === selectedLocation)
                        ?.name || selectedLocation}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Use the filters below to refine your search further
                  </p>
                </div>
              </motion.div>
            )}

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location, property type, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-32 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                
                {/* Search Action Buttons */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  {/* Search History Button */}
                  <button
                    onClick={() => setShowSearchHistory(true)}
                    className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                    title="Search History"
                  >
                    <ClockIcon className="w-5 h-5" />
                  </button>
                  
                  {/* Advanced Search Button */}
                  <button
                    onClick={() => setShowAdvancedSearch(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                    title="Advanced Search"
                  >
                    <FunnelIcon className="w-4 h-4" />
                    {getFilterCount() > 0 && (
                      <span className="bg-white text-orange-500 text-xs px-1.5 py-0.5 rounded-full">
                        {getFilterCount()}
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Active Filters Summary */}
              {hasActiveFilters() && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <FunnelIcon className="w-4 h-4" />
                  <span>Active filters: {getSearchSummary()}</span>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedType("all");
                      setSelectedPriceType("all");
                      setSelectedLocation("all");
                      setSortBy("created_at_desc");
                      updateFilters({
                        searchTerm: "",
                        propertyType: "all",
                        priceType: "all",
                        location: "all",
                        sortBy: "created_at_desc",
                      });
                    }}
                    className="text-orange-500 hover:text-orange-600 underline"
                  >
                    Clear all
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Filter Toggle */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-gray-700 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <FunnelIcon className="w-5 h-5" />
                  Filters
                </motion.button>

                <span className="text-gray-600 dark:text-gray-300">
                  {pagination ? `${pagination.total} properties found` : `${properties.length} properties found`}
                </span>

                {/* Active Location Filter Indicator */}
                {selectedLocation !== "all" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-3 py-1 bg-orange-500 text-white rounded-full text-sm"
                  >
                    <MapPinIcon className="w-4 h-4" />
                    <span>
                      {locations.find((loc) => loc.id === selectedLocation)
                        ?.name || selectedLocation}
                    </span>
                    <button
                      onClick={() => setSelectedLocation("all")}
                      className="ml-1 hover:bg-orange-600 rounded-full p-0.5 transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="created_at_desc">Newest First</option>
                  <option value="created_at_asc">Oldest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating_desc">Highest Rated</option>
                  <option value="views_desc">Most Viewed</option>
                </select>
                
                <select
                  value={perPage}
                  onChange={(e) => handlePerPageChange(Number(e.target.value))}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value={12}>12 per page</option>
                  <option value={24}>24 per page</option>
                  <option value={48}>48 per page</option>
                </select>
              </div>
            </div>

            {/* Expandable Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Property Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Property Type
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {propertyTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                              selectedType === type.id
                                ? "bg-orange-500 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600"
                            }`}
                          >
                            <type.icon className="w-4 h-4" />
                            {type.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Location
                      </label>
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {locations.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Price Range
                      </label>
                      <select
                        value={selectedPriceRange}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {priceRanges.map((range) => (
                          <option key={range.id} value={range.id}>
                            {range.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Price Type
                      </label>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setSelectedPriceType("all")}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                            selectedPriceType === "all"
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setSelectedPriceType("sale")}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                            selectedPriceType === "sale"
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          For Sale
                        </button>
                        <button
                          onClick={() => setSelectedPriceType("rent")}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                            selectedPriceType === "rent"
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          For Rent
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {Array.from({ length: perPage }, (_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </motion.div>
            ) : (
              <>
                {properties.length > 0 ? (
              <motion.div
                key={`${selectedType}-${selectedPriceRange}-${selectedPriceType}-${selectedLocation}-${sortBy}-${currentPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                  >
                    {/* Property Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={mediaUrl(property.image)}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                      {/* Featured Badge */}
                      {property.featured && (
                        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </div>
                      )}


                      {/* Price */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg">
                          <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                            {formatPrice(property.price, property.priceType)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                          {property.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <MapPinIcon className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">
                          {property.location}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {property.description}
                      </p>

                      {/* Property Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <HomeIcon className="w-4 h-4" />
                            {property.bedrooms} beds
                          </span>
                          <span className="flex items-center gap-1">
                            <BuildingOfficeIcon className="w-4 h-4" />
                            {property.bathrooms} baths
                          </span>
                          <span>{property.area} m²</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {property.rating}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleContactClick(property)}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <PhoneIcon className="w-4 h-4" />
                          Contact
                        </motion.button>
                        
                        <Link href={`/properties/${property.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-4 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors duration-200"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 max-w-md mx-auto">
                  <HomeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your search criteria or filters to find more
                    properties.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedType("all");
                      setSelectedPriceRange("all");
                      setSelectedPriceType("all");
                      setSelectedLocation("all");
                      setSortBy("created_at_desc");
                      setCurrentPage(1);
                    }}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
                )}
                
                {/* Pagination */}
                {pagination && pagination.last_page > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Showing {pagination.from} to {pagination.to} of {pagination.total} properties
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                          let pageNum;
                          if (pagination.last_page <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= pagination.last_page - 2) {
                            pageNum = pagination.last_page - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-3 py-2 rounded-lg transition-colors ${
                                currentPage === pageNum
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pagination.last_page}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Let our expert team help you find the perfect property that
              matches your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 inline-block"
                >
                  Contact Our Team
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/about"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-200 inline-block"
                >
                  Learn About Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        propertyId={selectedProperty?.id}
        propertyTitle={selectedProperty?.title}
        agentName={selectedProperty?.agentName}
        agentPhone={selectedProperty?.agentPhone}
        agentEmail={selectedProperty?.agentEmail}
      />

      {/* Advanced Search Modal */}
      <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        onSearch={handleAdvancedSearch}
        initialFilters={currentFilters}
      />

      {/* Search History Modal */}
      <SearchHistory
        isOpen={showSearchHistory}
        onClose={() => setShowSearchHistory(false)}
        onSelectSearch={handleSearchHistorySelect}
      />

      <Footer />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
