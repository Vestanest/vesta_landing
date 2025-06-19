import {
  MapPinIcon,
  StarIcon,
  SparklesIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const properties = [
  {
    title: "Modern Villa",
    description:
      "Spacious, sunlit, and located in a serene neighborhood with modern amenities.",
    location: "Accra, Ghana",
    rating: 4.8,
    price: "$450,000",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    gradient: "from-orange-500 to-amber-500",
    delay: 0.1,
  },
  {
    title: "Urban Apartment",
    description:
      "Contemporary design with city views and modern amenities in the heart of the city.",
    location: "Kumasi, Ghana",
    rating: 4.7,
    price: "$280,000",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
    gradient: "from-amber-500 to-yellow-500",
    delay: 0.2,
  },
  {
    title: "Family Home",
    description:
      "Perfect for families, close to schools and parks with a beautiful garden.",
    location: "Takoradi, Ghana",
    rating: 4.9,
    price: "$520,000",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
    gradient: "from-yellow-500 to-orange-500",
    delay: 0.3,
  },
];

export default function FeaturedProperties() {
  return (
    <section
      id="properties"
      className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* Creative Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            x: [0, 25, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-28 h-28 bg-gradient-to-br from-orange-300/30 to-amber-300/30 dark:from-orange-600/20 dark:to-amber-600/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-br from-amber-300/30 to-yellow-300/30 dark:from-amber-600/20 dark:to-yellow-600/20 rounded-full blur-3xl"
        />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 70% 70%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`,
              backgroundSize: "100px 100px, 140px 140px",
            }}
          />
        </div>

        {/* Floating Particles */}
        <motion.div
          animate={{
            y: [0, -60, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-orange-400/60 dark:bg-orange-500/40 rounded-full"
        />

        <motion.div
          animate={{
            y: [0, 50, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-amber-400/60 dark:bg-amber-500/40 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-6"
          >
            <SparklesIcon className="w-4 h-4" />
            Premium Selection
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            <span className="text-gray-900 dark:text-white">Featured</span>{" "}
            <span className="text-orange-600 dark:text-orange-400">
              Properties
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our handpicked selection of premium properties across
            Ghana, each carefully curated for exceptional living experiences.
          </motion.p>
        </motion.div>

        {/* Enhanced Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: property.delay }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card Background with Gradient Border */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${property.gradient} rounded-2xl blur-sm group-hover:blur-md transition-all duration-300 opacity-20 dark:opacity-30`}
              ></div>

              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-orange-100/50 dark:border-gray-700/50 overflow-hidden">
                {/* Enhanced Image Container */}
                <div className="relative h-56 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 overflow-hidden group">
                  <motion.img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Enhanced Rating Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {property.rating}
                    </span>
                  </motion.div>

                  {/* Enhanced Price Badge */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`absolute bottom-4 left-4 bg-gradient-to-r ${property.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}
                  >
                    {property.price}
                  </motion.div>

                  {/* Floating Sparkles */}
                  <motion.div
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                    className="absolute top-1/4 left-1/4"
                  >
                    <SparklesIcon className="w-4 h-4 text-yellow-300" />
                  </motion.div>
                </div>

                {/* Enhanced Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {property.description}
                    </p>
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-3">
                      <MapPinIcon className="w-5 h-5" />
                      <span className="font-medium">{property.location}</span>
                    </div>
                  </div>

                  {/* Enhanced Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-gradient-to-r ${property.gradient} text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 group/btn relative overflow-hidden`}
                  >
                    <motion.div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center gap-2">
                      <HomeIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      View Details
                    </span>
                  </motion.button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <SparklesIcon className="w-5 h-5 text-orange-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-orange-200/50 dark:border-gray-600/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Explore our complete property database with advanced filters and
              personalized recommendations.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg group"
            >
              <HomeIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Browse All Properties
              <motion.svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
