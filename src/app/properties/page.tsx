"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ContactModal from "../../components/ContactModal";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  HomeIcon,
  BuildingOfficeIcon,
  HeartIcon,
  EyeIcon,
  PhoneIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

// Property data
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
}

const properties: Property[] = [
  {
    id: 1,
    title: "Modern 3-Bedroom Apartment",
    location: "East Legon, Accra",
    price: 250000,
    priceType: "sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: "apartment",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center",
    featured: true,
    rating: 4.8,
    views: 1247,
    description:
      "Beautiful modern apartment with stunning city views, fully furnished with premium amenities.",
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    location: "Trasacco Valley, Accra",
    price: 850000,
    priceType: "sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    type: "villa",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop&crop=center",
    featured: true,
    rating: 4.9,
    views: 2156,
    description:
      "Exclusive luxury villa featuring a private pool, garden, and state-of-the-art security system.",
  },
  {
    id: 3,
    title: "Cozy 2-Bedroom House",
    location: "Adenta, Accra",
    price: 1800,
    priceType: "rent",
    bedrooms: 2,
    bathrooms: 1,
    area: 120,
    type: "house",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center",
    featured: false,
    rating: 4.6,
    views: 892,
    description:
      "Perfect family home in a quiet neighborhood with easy access to schools and shopping centers.",
  },
  {
    id: 4,
    title: "Studio Apartment",
    location: "Osu, Accra",
    price: 1200,
    priceType: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    type: "apartment",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&crop=center",
    featured: false,
    rating: 4.4,
    views: 567,
    description:
      "Modern studio apartment ideal for young professionals, fully equipped with modern appliances.",
  },
  {
    id: 5,
    title: "4-Bedroom Family Home",
    location: "Vittin, Tamale",
    price: 420000,
    priceType: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    type: "house",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&crop=center",
    featured: true,
    rating: 4.7,
    views: 1432,
    description:
      "Spacious family home with large backyard, perfect for growing families who love outdoor activities.",
  },
  {
    id: 6,
    title: "Penthouse Suite",
    location: "Airport Residential, Accra",
    price: 1200000,
    priceType: "sale",
    bedrooms: 3,
    bathrooms: 3,
    area: 320,
    type: "apartment",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&crop=center",
    featured: true,
    rating: 5.0,
    views: 2891,
    description:
      "Luxurious penthouse with panoramic city views, private terrace, and premium finishes throughout.",
  },
  {
    id: 7,
    title: "2-Bedroom Townhouse",
    location: "Kumasi, Ashanti",
    price: 280000,
    priceType: "sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    type: "townhouse",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&crop=center",
    featured: false,
    rating: 4.5,
    views: 734,
    description:
      "Modern townhouse in the heart of Kumasi, close to universities and business districts.",
  },
  {
    id: 8,
    title: "Executive Office Space",
    location: "Ridge, Accra",
    price: 3500,
    priceType: "rent",
    bedrooms: 0,
    bathrooms: 2,
    area: 200,
    type: "office",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=center",
    featured: false,
    rating: 4.3,
    views: 445,
    description:
      "Professional office space with meeting rooms, reception area, and modern business facilities.",
  },
  {
    id: 9,
    title: "Beachfront Villa",
    location: "Kokrobite, Accra",
    price: 950000,
    priceType: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 380,
    type: "villa",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center",
    featured: true,
    rating: 4.9,
    views: 1892,
    description:
      "Stunning beachfront villa with direct access to the ocean, perfect for those seeking luxury coastal living.",
  },
  {
    id: 10,
    title: "Modern Loft Apartment",
    location: "Cantonments, Accra",
    price: 3200,
    priceType: "rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 140,
    type: "apartment",
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop&crop=center",
    featured: false,
    rating: 4.7,
    views: 1023,
    description:
      "Contemporary loft-style apartment with high ceilings, exposed brick walls, and modern industrial design.",
  },
  {
    id: 11,
    title: "Garden Cottage",
    location: "Aburi, Eastern Region",
    price: 180000,
    priceType: "sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    type: "house",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center",
    featured: false,
    rating: 4.6,
    views: 678,
    description:
      "Charming garden cottage surrounded by lush greenery, offering a peaceful retreat from city life.",
  },
  {
    id: 12,
    title: "Luxury Penthouse",
    location: "Ridge, Accra",
    price: 1500000,
    priceType: "sale",
    bedrooms: 4,
    bathrooms: 4,
    area: 450,
    type: "apartment",
    image:
      "https://images.unsplash.com/photo-1568115286680-d203e08a8be6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    rating: 5.0,
    views: 3245,
    description:
      "Ultra-luxurious penthouse with 360-degree city views, private elevator, and world-class amenities.",
  },
];

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

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedPriceType, setSelectedPriceType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  // Handle URL parameters for location filtering
  useEffect(() => {
    const locationParam = searchParams.get("location");
    if (locationParam) {
      setSelectedLocation(locationParam);
      // Auto-expand filters when location is pre-selected
      setShowFilters(true);
    }
  }, [searchParams]);

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || property.type === selectedType;
    const matchesPriceType =
      selectedPriceType === "all" || property.priceType === selectedPriceType;
    const matchesLocation =
      selectedLocation === "all" ||
      property.location.toLowerCase().includes(selectedLocation.toLowerCase());

    let matchesPrice = true;
    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      if (max) {
        matchesPrice = property.price >= min && property.price <= max;
      } else {
        matchesPrice = property.price >= min;
      }
    }

    return (
      matchesSearch &&
      matchesType &&
      matchesPrice &&
      matchesPriceType &&
      matchesLocation
    );
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "views":
        return b.views - a.views;
      default:
        return b.featured ? 1 : -1;
    }
  });

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
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
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
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
                  {filteredProperties.length} properties found
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
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="views">Most Viewed</option>
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
            {sortedProperties.length > 0 ? (
              <motion.div
                key={`${selectedType}-${selectedPriceRange}-${selectedPriceType}-${selectedLocation}-${sortBy}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {sortedProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                  >
                    {/* Property Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                      {/* Featured Badge */}
                      {property.featured && (
                        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                      >
                        <HeartIcon
                          className={`w-5 h-5 ${
                            favorites.includes(property.id)
                              ? "text-red-500 fill-red-500"
                              : "text-white"
                          }`}
                        />
                      </button>

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
                      <div className="flex gap-3">
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
                            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors duration-200"
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
                    }}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
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
        propertyTitle={selectedProperty?.title}
        agentName="Vesta Nest Agent"
        agentPhone="+233 20 123 4567"
        agentEmail="info@vestanest.com"
      />

      <Footer />
    </div>
  );
}
