"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  XMarkIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  HomeIcon,
  FunnelIcon,
  StarIcon,
  WifiIcon,
  TruckIcon,
  ShieldCheckIcon,
  SunIcon,
  CloudIcon,
  TvIcon,
  ComputerDesktopIcon,
  PhoneIcon,
  LockClosedIcon,
  FireIcon,
  HeartIcon,
  MapIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ShoppingBagIcon,
  BeakerIcon,
  CogIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

interface AdvancedSearchFilters {
  // Basic filters
  searchTerm: string;
  propertyType: string;
  priceRange: [number, number];
  priceType: string;
  location: string;
  
  // Property features
  bedrooms: [number, number];
  bathrooms: [number, number];
  areaRange: [number, number];
  
  // Amenities
  amenities: string[];
  
  // Additional filters
  propertyStatus: string;
  featured: boolean | null;
  minRating: number;
  sortBy: string;
  sortOrder: string;
}

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: AdvancedSearchFilters) => void;
  initialFilters?: Partial<AdvancedSearchFilters>;
}

const propertyTypes = [
  { value: "all", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
  { value: "penthouse", label: "Penthouse" },
];

const priceTypes = [
  { value: "all", label: "All" },
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
];

const propertyStatuses = [
  { value: "all", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
  { value: "rented", label: "Rented" },
  { value: "pending", label: "Pending" },
];

const sortOptions = [
  { value: "created_at_desc", label: "Newest First" },
  { value: "created_at_asc", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "area_desc", label: "Largest First" },
  { value: "area_asc", label: "Smallest First" },
  { value: "rating_desc", label: "Highest Rated" },
  { value: "views_desc", label: "Most Popular" },
];

const amenities = [
  { id: "wifi", label: "WiFi", icon: WifiIcon },
  { id: "parking", label: "Parking", icon: TruckIcon },
  { id: "security", label: "Security", icon: ShieldCheckIcon },
  { id: "balcony", label: "Balcony", icon: SunIcon },
  { id: "air_conditioning", label: "Air Conditioning", icon: CloudIcon },
  { id: "tv", label: "TV", icon: TvIcon },
  { id: "computer", label: "Computer", icon: ComputerDesktopIcon },
  { id: "phone", label: "Phone", icon: PhoneIcon },
  { id: "safe", label: "Safe", icon: LockClosedIcon },
  { id: "fireplace", label: "Fireplace", icon: FireIcon },
  { id: "gym", label: "Gym", icon: HeartIcon },
  { id: "pool", label: "Pool", icon: MapIcon },
  { id: "garden", label: "Garden", icon: SunIcon },
  { id: "playground", label: "Playground", icon: UserGroupIcon },
  { id: "school", label: "School Nearby", icon: AcademicCapIcon },
  { id: "shopping", label: "Shopping", icon: ShoppingBagIcon },
  { id: "kitchen", label: "Kitchen", icon: BeakerIcon },
  { id: "laundry", label: "Laundry", icon: CogIcon },
];

const locations = [
  "Accra", "Kumasi", "Tamale", "Sekondi-Takoradi", "Sunyani", 
  "Cape Coast", "Koforidua", "Ho", "Bolgatanga", "Wa"
];

export default function AdvancedSearchModal({ 
  isOpen, 
  onClose, 
  onSearch, 
  initialFilters = {} 
}: AdvancedSearchModalProps) {
  const [filters, setFilters] = useState<AdvancedSearchFilters>({
    searchTerm: "",
    propertyType: "all",
    priceRange: [0, 10000000],
    priceType: "all",
    location: "all",
    bedrooms: [0, 10],
    bathrooms: [0, 10],
    areaRange: [0, 1000],
    amenities: [],
    propertyStatus: "all",
    featured: null,
    minRating: 0,
    sortBy: "created_at_desc",
    sortOrder: "desc",
    ...initialFilters,
  });

  const [activeTab, setActiveTab] = useState<"basic" | "features" | "amenities" | "advanced">("basic");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Search suggestions effect
  useEffect(() => {
    if (filters.searchTerm.length > 2) {
      const suggestions = locations
        .filter(location => 
          location.toLowerCase().includes(filters.searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [filters.searchTerm]);

  const handleInputChange = (field: keyof AdvancedSearchFilters, value: string | number | boolean | number[] | null) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFilters(prev => ({ ...prev, searchTerm: suggestion }));
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      searchTerm: "",
      propertyType: "all",
      priceRange: [0, 10000000],
      priceType: "all",
      location: "all",
      bedrooms: [0, 10],
      bathrooms: [0, 10],
      areaRange: [0, 1000],
      amenities: [],
      propertyStatus: "all",
      featured: null,
      minRating: 0,
      sortBy: "created_at_desc",
      sortOrder: "desc",
    });
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `GH¢${(price / 1000000).toFixed(1)}M`;
    }
    return `GH¢${price.toLocaleString()}`;
  };

  const tabs = [
    { id: "basic", label: "Basic", icon: MagnifyingGlassIcon },
    { id: "features", label: "Features", icon: HomeIcon },
    { id: "amenities", label: "Amenities", icon: StarIcon },
    { id: "advanced", label: "Advanced", icon: FunnelIcon },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Advanced Search
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Find your perfect property with detailed filters
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "basic" | "features" | "amenities" | "advanced")}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 dark:border-orange-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Basic Tab */}
              {activeTab === "basic" && (
                <div className="space-y-6">
                  {/* Search Term */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Search Location or Property
                    </label>
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={filters.searchTerm}
                        onChange={(e) => handleInputChange("searchTerm", e.target.value)}
                        onFocus={() => setShowSuggestions(filters.searchTerm.length > 2)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter location, property name, or keywords..."
                      />
                      {showSuggestions && searchSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
                          {searchSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg"
                            >
                              <MapPinIcon className="inline w-4 h-4 mr-2 text-gray-400" />
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Type & Price Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Property Type
                      </label>
                      <select
                        value={filters.propertyType}
                        onChange={(e) => handleInputChange("propertyType", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        {propertyTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price Type
                      </label>
                      <select
                        value={filters.priceType}
                        onChange={(e) => handleInputChange("priceType", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        {priceTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="100000"
                        value={filters.priceRange[0]}
                        onChange={(e) => handleInputChange("priceRange", [parseInt(e.target.value), filters.priceRange[1]])}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="100000"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleInputChange("priceRange", [filters.priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Features Tab */}
              {activeTab === "features" && (
                <div className="space-y-6">
                  {/* Bedrooms & Bathrooms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bedrooms: {filters.bedrooms[0]} - {filters.bedrooms[1]}
                      </label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={filters.bedrooms[0]}
                          onChange={(e) => handleInputChange("bedrooms", [parseInt(e.target.value), filters.bedrooms[1]])}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={filters.bedrooms[1]}
                          onChange={(e) => handleInputChange("bedrooms", [filters.bedrooms[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bathrooms: {filters.bathrooms[0]} - {filters.bathrooms[1]}
                      </label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={filters.bathrooms[0]}
                          onChange={(e) => handleInputChange("bathrooms", [parseInt(e.target.value), filters.bathrooms[1]])}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={filters.bathrooms[1]}
                          onChange={(e) => handleInputChange("bathrooms", [filters.bathrooms[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Area Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Area: {filters.areaRange[0]} - {filters.areaRange[1]} m²
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={filters.areaRange[0]}
                        onChange={(e) => handleInputChange("areaRange", [parseInt(e.target.value), filters.areaRange[1]])}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={filters.areaRange[1]}
                        onChange={(e) => handleInputChange("areaRange", [filters.areaRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Amenities Tab */}
              {activeTab === "amenities" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Select Amenities ({filters.amenities.length} selected)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {amenities.map((amenity) => {
                      const Icon = amenity.icon;
                      const isSelected = filters.amenities.includes(amenity.id);
                      return (
                        <button
                          key={amenity.id}
                          onClick={() => handleAmenityToggle(amenity.id)}
                          className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                            isSelected
                              ? "bg-orange-100 dark:bg-orange-900/30 border-orange-500 text-orange-700 dark:text-orange-300"
                              : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{amenity.label}</span>
                          {isSelected && <CheckIcon className="w-4 h-4 ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === "advanced" && (
                <div className="space-y-6">
                  {/* Property Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Property Status
                    </label>
                    <select
                      value={filters.propertyStatus}
                      onChange={(e) => handleInputChange("propertyStatus", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {propertyStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Featured Properties */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Featured Properties
                    </label>
                    <div className="flex gap-4">
                      {[
                        { value: null, label: "All" },
                        { value: true, label: "Featured Only" },
                        { value: false, label: "Non-Featured" },
                      ].map((option) => (
                        <button
                          key={String(option.value)}
                          onClick={() => handleInputChange("featured", option.value)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            filters.featured === option.value
                              ? "bg-orange-500 text-white border-orange-500"
                              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Minimum Rating: {filters.minRating} ⭐
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={filters.minRating}
                      onChange={(e) => handleInputChange("minRating", parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleInputChange("sortBy", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleReset}
                className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Reset All Filters
              </button>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Search Properties
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
