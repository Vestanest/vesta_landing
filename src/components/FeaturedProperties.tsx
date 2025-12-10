import { SparklesIcon, HomeIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PropertyCard, { Property } from "./PropertyCard";
import { PropertiesService } from "../api/services/properties.service";
import { mediaUrl } from "../api/config";
import { FeaturedProperty } from "../api/models";

// No fallback; relies solely on API

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    let isMounted = true;
    PropertiesService.featured(6)
      .then((items) => {
        if (!isMounted) return;
        const mapped: Property[] = items.map((p: FeaturedProperty, idx: number) => {
          let images: string[] = [];
          if (Array.isArray(p.images)) images = p.images as string[];
          else if (typeof p.images === "string") {
            try {
              images = JSON.parse(p.images);
            } catch {
              images = [];
            }
          }
          const image = mediaUrl(images[0] || p.image) ||
            "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80";
          const rawPrice = String(p.formatted_price ?? p.price ?? "0");
          const priceSanitized = rawPrice
            // strip currency symbols and leading non-digits
            .replace(/^\D+/, "")
            // normalize spaces
            .trim();
          // optionally drop trailing .00 for display symmetry with samples
          const priceDisplay = priceSanitized.replace(/\.00$/, "");
          return {
            id: Number(p.id ?? idx + 1),
            title: String(p.title ?? "Property"),
            description: String(p.description ?? "Beautiful property with modern amenities."),
            location: String(p.location ?? p.city ?? "Ghana"),
            rating: Number(p.rating ?? 4.7),
            price: priceDisplay,
            image,
            gradient: "from-orange-500 to-amber-500",
            delay: 0.1 + idx * 0.1,
            features: undefined,
          } as Property;
        });
        setProperties(mapped);
        // loaded
      })
      .catch(() => {
        if (!isMounted) return;
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="properties"
      className="overflow-hidden relative px-4 py-20 bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
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
          className="absolute top-20 right-20 w-28 h-28 bg-gradient-to-br rounded-full blur-3xl from-orange-300/30 to-amber-300/30 dark:from-orange-600/20 dark:to-amber-600/20"
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
          className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-br rounded-full blur-3xl from-amber-300/30 to-yellow-300/30 dark:from-amber-600/20 dark:to-yellow-600/20"
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
          className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-orange-400/60 dark:bg-orange-500/40"
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
          className="absolute bottom-1/4 left-1/4 w-3 h-3 rounded-full bg-amber-400/60 dark:bg-amber-500/40"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex gap-2 items-center px-4 py-2 mb-6 text-sm font-medium text-orange-700 bg-orange-100 rounded-full dark:bg-orange-900/50 dark:text-orange-300"
          >
            <SparklesIcon className="w-4 h-4" />
            Premium Selection
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 text-4xl font-bold sm:text-5xl"
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
            className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Discover our handpicked selection of premium properties across
            Ghana, each carefully curated for exceptional living experiences.
          </motion.p>
        </motion.div>

        {/* Enhanced Properties Grid */}
        {properties.length > 0 ? (
          <div className="overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
            <div className="flex gap-6 pr-4 snap-x snap-mandatory">
              {properties.map((property, i) => (
                <div key={i} className="snap-start shrink-0">
                  <PropertyCard
                    property={property}
                    className="w-80 md:w-96"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="p-10 mx-auto max-w-md bg-white rounded-2xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                No featured properties yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check back soon. New featured listings will appear here once available.
              </p>
            </div>
          </div>
        )}

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="p-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border dark:from-gray-800 dark:to-gray-700 border-orange-200/50 dark:border-gray-600/50">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Can&apos;t Find What You&apos;re Looking For?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600 dark:text-gray-300">
              Explore our complete property database with advanced filters and personalized recommendations.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex gap-3 items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group"
            >
              <HomeIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
              Browse All Properties
              <motion.svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
