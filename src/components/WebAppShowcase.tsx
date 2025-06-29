import { motion } from "framer-motion";
import {
  SparklesIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

export default function WebAppShowcase() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            x: [0, 35, 0],
            y: [0, -35, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-300/30 to-amber-300/30 dark:from-orange-600/20 dark:to-amber-600/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-amber-300/30 to-yellow-300/30 dark:from-amber-600/20 dark:to-yellow-600/20 rounded-full blur-3xl"
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
            y: [0, -80, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-orange-400/60 dark:bg-orange-500/40 rounded-full"
        />

        <motion.div
          animate={{
            y: [0, 70, 0],
            opacity: [0.4, 0.9, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-amber-400/60 dark:bg-amber-500/40 rounded-full"
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
            Modern Technology
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            <span className="text-gray-900 dark:text-white">
              Experience Our
            </span>{" "}
            <span className="text-orange-600 dark:text-orange-400">
              Modern Web App
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Search, filter, and explore properties with ease. Our intuitive web
            app brings the best of Ghanaian real estate to your fingertips with
            advanced features and seamless navigation.
          </motion.p>
        </motion.div>

        {/* Enhanced App Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Enhanced Mockup Frame */}
          <div className="relative max-w-5xl mx-auto">
            {/* Enhanced Browser Bar */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-800 rounded-t-2xl p-4 flex items-center space-x-2 shadow-lg">
              <div className="flex space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-3 h-3 bg-red-500 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="w-3 h-3 bg-yellow-500 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
              </div>
              <div className="flex-1 bg-gray-700 dark:bg-gray-800 rounded-lg px-4 py-2 mx-4">
                <div className="text-gray-300 dark:text-gray-400 text-sm flex items-center gap-2">
                  <GlobeAltIcon className="w-4 h-4" />
                  vestanest.com
                </div>
              </div>
            </div>

            {/* Enhanced App Content */}
            <div className="relative bg-white dark:bg-gray-900 rounded-b-2xl shadow-2xl overflow-hidden border-4 border-gray-800 dark:border-gray-700">
              <motion.img
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80"
                alt="Web app mockup"
                className="w-full h-[500px] object-cover object-top"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />

              {/* Enhanced Floating UI Elements */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/4 right-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-orange-200/50 dark:border-gray-600/50"
              >
                <div className="text-sm font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4" />
                  Property Found
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  15 matches in Accra
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
                animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-1/4 left-8 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl shadow-lg p-4"
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

              {/* Additional Floating Elements */}
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
                  delay: 1,
                }}
                className="absolute top-1/3 left-1/4"
              >
                <SparklesIcon className="w-4 h-4 text-yellow-300" />
              </motion.div>
            </div>
          </div>

          {/* Enhanced Background Elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-10 -left-10 w-40 h-40 bg-orange-200/30 dark:bg-orange-600/20 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-200/30 dark:bg-amber-600/20 rounded-full blur-3xl"
          />
        </motion.div>

        {/* Enhanced Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ComputerDesktopIcon className="w-8 h-8 text-white" />,
                title: "Desktop Experience",
                description:
                  "Full-featured web app optimized for desktop browsing",
                gradient: "from-orange-500 to-amber-500",
                delay: 0.1,
              },
              {
                icon: <DevicePhoneMobileIcon className="w-8 h-8 text-white" />,
                title: "Mobile Responsive",
                description:
                  "Seamless experience across all devices and screen sizes",
                gradient: "from-amber-500 to-yellow-500",
                delay: 0.2,
              },
              {
                icon: <GlobeAltIcon className="w-8 h-8 text-white" />,
                title: "Real-time Updates",
                description: "Live property updates and instant notifications",
                gradient: "from-yellow-500 to-orange-500",
                delay: 0.3,
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/50 dark:border-gray-700/50 text-center">
                  {/* Icon Container with Gradient Background */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 mx-auto`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>

                  {/* Floating Animation Line */}
                  {/* Removed horizontal animation line */}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
