import { motion } from "framer-motion";
import {
  HomeIcon,
  MapPinIcon,
  StarIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-300/30 to-amber-300/30 dark:from-orange-600/20 dark:to-amber-600/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-amber-300/30 to-yellow-300/30 dark:from-amber-600/20 dark:to-yellow-600/20 rounded-full blur-3xl"
        />

        {/* Floating Animated Particles */}
        <motion.div
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-400/60 dark:bg-orange-500/40 rounded-full"
        />

        <motion.div
          animate={{
            y: [0, 80, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-amber-400/60 dark:bg-amber-500/40 rounded-full"
        />

        <motion.div
          animate={{
            y: [0, -60, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-yellow-400/60 dark:bg-yellow-500/40 rounded-full"
        />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`,
              backgroundSize: "100px 100px, 150px 150px",
            }}
          />
        </div>

        {/* Rotating Geometric Lines */}
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-orange-200/30 dark:border-orange-600/20 rounded-full"
        />

        <motion.div
          animate={{
            rotate: [360, 180, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-amber-200/30 dark:border-amber-600/20 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Enhanced Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Enhanced Badge with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium shadow-lg border border-orange-200/50 dark:border-orange-700/50 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <SparklesIcon className="w-4 h-4" />
              </motion.div>
              <span>Trusted by 10,000+ families</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 bg-orange-500 rounded-full"
              />
            </motion.div>

            {/* Enhanced Animated Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <motion.span
                className="text-gray-900 dark:text-white"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background:
                    "linear-gradient(90deg, #111827, #374151, #111827)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Find Your
              </motion.span>
              <br />
              <motion.span
                className="text-orange-600 dark:text-orange-400"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background:
                    "linear-gradient(90deg, #ea580c, #f97316, #ea580c)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dream Home
              </motion.span>
              <br />
              <span className="text-gray-900 dark:text-white">in Ghana</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
            >
              Discover exceptional properties across Ghana with our innovative
              platform. Experience modern living with elegance, comfort, and
              style.
            </motion.p>

            {/* Enhanced Buttons with Gradient Effects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-500 dark:to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg group overflow-hidden"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-600 dark:to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div className="relative flex items-center gap-3">
                  <HomeIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Explore Properties
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
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-3 px-8 py-4 border-2 border-orange-600 dark:border-orange-400 text-orange-600 dark:text-orange-400 font-semibold rounded-xl hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all duration-300 text-lg group overflow-hidden"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div className="relative flex items-center gap-3">
                  <MapPinIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  View Locations
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Enhanced Right Visual with More Creative Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Enhanced Main House Card */}
            <motion.div
              initial={{ scale: 0.8, rotateY: -15 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform perspective-1000 border border-gray-200/50 dark:border-gray-700/50"
            >
              {/* Enhanced Image Container with Hover Effects */}
              <div className="relative h-80 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 rounded-xl overflow-hidden mb-4 group">
                <motion.img
                  src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80"
                  alt="Dream Home"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Enhanced Rating Badge with Animation */}
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
                    4.9
                  </span>
                </motion.div>

                {/* Enhanced Price Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                >
                  $450,000
                </motion.div>

                {/* Floating Sparkles Animation */}
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
                  }}
                  className="absolute top-1/4 left-1/4"
                >
                  <SparklesIcon className="w-4 h-4 text-yellow-300" />
                </motion.div>
              </div>

              {/* Enhanced Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Modern Villa
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Spacious 4-bedroom villa with modern amenities
                </p>
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <MapPinIcon className="w-5 h-5" />
                  <span className="font-medium">Accra, Ghana</span>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Floating Elements with More Animation */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-orange-200/50 dark:border-gray-600/50"
            >
              <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                Property Found
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                15 matches nearby
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl shadow-xl p-4"
            >
              <div className="text-sm font-semibold">Quick View</div>
              <div className="text-xs opacity-90">Tap to explore</div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"
              />
            </motion.div>

            {/* Enhanced Decorative Elements with More Complex Animations */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute -top-12 -right-12 w-20 h-20 border-4 border-orange-200/50 dark:border-orange-600/30 border-t-orange-600 dark:border-t-orange-400 rounded-full"
            />

            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              }}
              className="absolute -bottom-12 -left-12 w-16 h-16 bg-gradient-to-br from-orange-200/60 to-amber-200/60 dark:from-orange-600/40 dark:to-amber-600/40 rounded-full"
            />

            {/* Additional Floating Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -left-8 w-6 h-6 bg-yellow-400/60 dark:bg-yellow-500/40 rounded-full"
            />

            <motion.div
              animate={{
                y: [0, 25, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/2 -right-6 w-4 h-4 bg-orange-400/60 dark:bg-orange-500/40 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
