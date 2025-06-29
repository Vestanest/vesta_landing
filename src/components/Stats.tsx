import { motion } from "framer-motion";
import Link from "next/link";
import {
  HomeIcon,
  MapPinIcon,
  StarIcon,
  UsersIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

const stats = [
  {
    icon: <HomeIcon className="w-8 h-8" />,
    number: "500+",
    label: "Properties",
    description: "Available across Ghana",
    gradient: "from-orange-500 to-amber-500",
    delay: 0.1,
  },
  {
    icon: <MapPinIcon className="w-8 h-8" />,
    number: "50+",
    label: "Cities",
    description: "Covered nationwide",
    gradient: "from-amber-500 to-yellow-500",
    delay: 0.2,
  },
  {
    icon: <StarIcon className="w-8 h-8" />,
    number: "4.9★",
    label: "Rating",
    description: "Customer satisfaction",
    gradient: "from-yellow-500 to-orange-500",
    delay: 0.3,
  },
  {
    icon: <UsersIcon className="w-8 h-8" />,
    number: "10K+",
    label: "Families",
    description: "Trusted our platform",
    gradient: "from-orange-600 to-amber-600",
    delay: 0.4,
  },
];

export default function Stats() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-white via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-orange-200/40 to-amber-200/40 dark:from-orange-600/20 dark:to-amber-600/20 rounded-full blur-2xl"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-amber-200/40 to-yellow-200/40 dark:from-amber-600/20 dark:to-yellow-600/20 rounded-full blur-2xl"
        />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`,
              backgroundSize: "80px 80px, 120px 120px",
            }}
          />
        </div>

        {/* Floating Particles */}
        <motion.div
          animate={{
            y: [0, -50, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/4 w-3 h-3 bg-orange-400/60 dark:bg-orange-500/40 rounded-full"
        />

        <motion.div
          animate={{
            y: [0, 40, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-amber-400/60 dark:bg-amber-500/40 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
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
            Trusted Platform
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            <span className="text-orange-600 dark:text-orange-400">
              Numbers
            </span>{" "}
            That Matter
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our platform has helped thousands of families find their perfect
            homes across Ghana. Here&apos;s what we&apos;ve achieved together.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: stat.delay }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100/50 dark:border-gray-700/50">
                {/* Icon Container with Gradient Background */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <div className="text-white">{stat.icon}</div>
                </motion.div>

                {/* Animated Number */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: stat.delay + 0.2 }}
                  className="mb-2"
                >
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.5,
                    }}
                    className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-[length:200%_100%] bg-clip-text text-transparent`}
                  >
                    {stat.number}
                  </motion.div>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {stat.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <SparklesIcon className="w-5 h-5 text-orange-400" />
                </div>

                {/* Floating Animation Line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-b-2xl"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: stat.delay + 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-orange-200/50 dark:border-gray-600/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Find Your Dream Home?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied families who have found their perfect
              home through our platform.
            </p>
            <Link href="/properties">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg group"
              >
                <HomeIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Start Your Search
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
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
