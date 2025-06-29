import {
  MapPinIcon,
  BuildingOffice2Icon,
  StarIcon,
  SparklesIcon,
  HeartIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const features = [
  {
    icon: <MapPinIcon className="w-8 h-8 text-white" />,
    title: "Prime Locations",
    description: "Easy access to schools, markets, and transport across Ghana.",
    gradient: "from-orange-500 to-amber-500",
    delay: 0.1,
  },
  {
    icon: <BuildingOffice2Icon className="w-8 h-8 text-white" />,
    title: "Modern Living",
    description:
      "Contemporary homes with all amenities for a comfortable lifestyle.",
    gradient: "from-amber-500 to-yellow-500",
    delay: 0.2,
  },
  {
    icon: <StarIcon className="w-8 h-8 text-white" />,
    title: "Growing Community",
    description: "A welcoming, diverse, and thriving real estate market.",
    gradient: "from-yellow-500 to-orange-500",
    delay: 0.3,
  },
];

const highlights = [
  {
    icon: <HeartIcon className="w-6 h-6" />,
    title: "Trusted Platform",
    description: "10,000+ families trust us",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    title: "Secure Transactions",
    description: "Safe and protected deals",
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-hidden"
    >
      {/* Enhanced Creative Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-400/30 to-amber-400/30 dark:from-orange-600/20 dark:to-amber-600/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
            x: [0, -35, 0],
            y: [0, 35, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-amber-400/30 to-yellow-400/30 dark:from-amber-600/20 dark:to-yellow-600/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 dark:from-yellow-600/15 dark:to-orange-600/15 rounded-full blur-2xl"
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
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-400/60 dark:bg-orange-500/40 rounded-full"
        />

        <motion.div
          animate={{
            y: [0, 60, 0],
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-amber-400/60 dark:bg-amber-500/40 rounded-full"
        />

        <motion.div
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.7, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400/60 dark:bg-yellow-500/40 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
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
            Discover Ghana&apos;s Finest
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            <span className="text-gray-900 dark:text-white">Why</span>{" "}
            <span className="text-orange-600 dark:text-orange-400">Ghana?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Ghana offers a vibrant and diverse real estate market, from bustling
            cities to tranquil coastal towns. Experience growth, opportunity,
            and a welcoming community as you find your perfect home.
          </motion.p>
        </motion.div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative"
            >
              <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-orange-100/50 dark:border-gray-700/50">
                {/* Enhanced Icon Container with Gradient Background */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <div className="text-white">{feature.icon}</div>
                </motion.div>

                {/* Enhanced Content */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Enhanced Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <SparklesIcon className="w-5 h-5 text-orange-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-orange-200/50 dark:border-gray-600/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                {
                  number: "500+",
                  label: "Properties Available",
                  gradient: "from-orange-600 to-amber-600",
                },
                {
                  number: "50+",
                  label: "Cities Covered",
                  gradient: "from-amber-600 to-yellow-600",
                },
                {
                  number: "4.9★",
                  label: "Customer Rating",
                  gradient: "from-yellow-600 to-orange-600",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group"
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
                    className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-[length:200%_100%] bg-clip-text text-transparent mb-2`}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-orange-200/30 dark:border-gray-600/30"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${highlight.gradient} rounded-lg flex items-center justify-center`}
                  >
                    <div className="text-white">{highlight.icon}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">
                      {highlight.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {highlight.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
