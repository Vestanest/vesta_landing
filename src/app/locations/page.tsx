"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import {
  MapPinIcon,
  HomeIcon,
  StarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const locations = [
  {
    id: 1,
    name: "Accra",
    region: "Greater Accra",
    locationId: "accra",
    description:
      "The vibrant capital city with modern developments and excellent infrastructure",
    propertyCount: 245,
    avgPrice: "GHC 850,000",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    popularAreas: ["East Legon", "Cantonments", "Airport Residential", "Osu"],
    features: [
      "Modern Infrastructure",
      "Shopping Centers",
      "International Schools",
      "Business District",
    ],
  },
  {
    id: 2,
    name: "Kumasi",
    region: "Ashanti",
    locationId: "kumasi",
    description:
      "The Garden City with rich cultural heritage and growing real estate market",
    propertyCount: 156,
    avgPrice: "GHC 650,000",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    popularAreas: ["Ahodwo", "North Suntreso", "Patasi", "Bantama"],
    features: [
      "Cultural Heritage",
      "Educational Institutions",
      "Healthcare Facilities",
      "Shopping Centers",
    ],
  },
  {
    id: 3,
    name: "Takoradi",
    region: "Western",
    locationId: "takoradi",
    description:
      "The Oil City with booming economy and coastal living opportunities",
    propertyCount: 89,
    avgPrice: "GHC 750,000",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    popularAreas: ["Airport Ridge", "Fijai", "Harbor Road", "Beach Road"],
    features: [
      "Coastal Living",
      "Oil Industry",
      "Port Access",
      "Beachfront Properties",
    ],
  },
  {
    id: 4,
    name: "Tamale",
    region: "Northern",
    locationId: "tamale",
    description:
      "The fastest growing city in West Africa with affordable housing options",
    propertyCount: 67,
    avgPrice: "GHC 450,000",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    popularAreas: ["Lamashegu", "Sabonjida", "Gumbihini", "Vitting"],
    features: [
      "Affordable Housing",
      "Growing Economy",
      "Educational Hub",
      "Cultural Diversity",
    ],
  },
  {
    id: 5,
    name: "Cape Coast",
    region: "Central",
    locationId: "eastern-region",
    description:
      "Historic coastal city with beautiful beaches and educational institutions",
    propertyCount: 45,
    avgPrice: "GHC 550,000",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    popularAreas: ["University Area", "Beach Front", "City Center", "Pedu"],
    features: ["Historic Sites", "Beach Access", "Universities", "Tourism"],
  },
  {
    id: 6,
    name: "Sunyani",
    region: "Bono",
    locationId: "ashanti",
    description: "Clean and peaceful city with excellent quality of life",
    propertyCount: 34,
    avgPrice: "GHC 400,000",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
    rating: 4.3,
    popularAreas: ["New Dormaa", "Area 1", "Area 2", "Area 3"],
    features: [
      "Clean Environment",
      "Peaceful Living",
      "Healthcare",
      "Education",
    ],
  },
];

export default function LocationsPage() {
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-6"
            >
              <SparklesIcon className="w-4 h-4" />
              Explore Ghana
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Discover Our{" "}
              <span className="text-orange-600 dark:text-orange-400">
                Locations
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Explore properties across Ghana&apos;s most desirable locations.
              From the vibrant capital to peaceful regional cities, find your
              perfect home in the area that suits your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/properties"
                  className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 inline-block"
                >
                  Browse All Properties
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors duration-200 inline-block"
                >
                  Contact Our Team
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-100/50 dark:border-gray-700/50">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {location.rating}
                      </span>
                    </div>

                    {/* Property Count Badge */}
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {location.propertyCount} Properties
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPinIcon className="w-5 h-5 text-orange-500" />
                      <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                        {location.region}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {location.name}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {location.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Average Price
                        </p>
                        <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                          {location.avgPrice}
                        </p>
                      </div>
                    </div>

                    {/* Popular Areas */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Popular Areas:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {location.popularAreas.slice(0, 3).map((area, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full"
                          >
                            {area}
                          </span>
                        ))}
                        {location.popularAreas.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{location.popularAreas.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Key Features:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {location.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={`/properties?location=${location.locationId}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <HomeIcon className="w-5 h-5" />
                        View Properties
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Ready to Find Your Perfect Location?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Our expert team can help you find the ideal location that matches
              your lifestyle and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/properties"
                  className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 inline-block"
                >
                  Browse Properties
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-200 inline-block"
                >
                  Contact Our Team
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
