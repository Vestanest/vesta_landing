import {
  MapPinIcon,
  StarIcon,
  SparklesIcon,
  HomeIcon,
  BuildingOffice2Icon,
  SwatchIcon,
  Square3Stack3DIcon,
  TruckIcon,
  WifiIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { mediaUrl } from "../api/config";
import { motion } from "framer-motion";
import Link from "next/link";

export interface PropertyFeature {
  name: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  rating: number;
  price: string;
  image: string;
  gradient: string;
  delay?: number;
  features?: PropertyFeature[];
}

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({
  property,
  className = "",
}: PropertyCardProps) {
  const defaultFeatures: PropertyFeature[] = [
    {
      name: "Bedrooms",
      value: "3",
      icon: BuildingOffice2Icon,
    },
    {
      name: "Bathrooms",
      value: "2",
      icon: SwatchIcon,
    },
    {
      name: "Area",
      value: "2,500 sq ft",
      icon: Square3Stack3DIcon,
    },
    {
      name: "Parking",
      value: "2 cars",
      icon: TruckIcon,
    },
    {
      name: "WiFi",
      value: "Included",
      icon: WifiIcon,
    },
    {
      name: "Security",
      value: "24/7",
      icon: ShieldCheckIcon,
    },
  ];

  const features = property.features || defaultFeatures;

  return (
    <Link href={`/properties/${property.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: property.delay || 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className={`group relative ${className}`}
      >
        {/* Card Background with Gradient Border */}
        {/* <div
          className={`absolute inset-0 bg-gradient-to-br ${property.gradient} rounded-2xl blur-sm group-hover:blur-md transition-all duration-300 opacity-20 dark:opacity-30`}
        ></div> */}

        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-orange-100/50 dark:border-gray-700/50 overflow-hidden shadow-gray-800/20 hover:shadow-gray-800/30 transition-all duration-300">
          {/* Enhanced Image Container */}
          <div className="relative h-56 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 overflow-hidden group">
            <motion.img
              src={mediaUrl(property.image)}
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
              GH¢{property.price}
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
                delay: (property.delay || 0) * 0.5,
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
              {/* Property Features Chips */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {features.slice(0, 3).map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: (property.delay || 0) + index * 0.1,
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-200/70 dark:bg-gray-500/70 text-white px-2.5 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-1.5">
                        <feature.icon className="w-3.5 h-3.5" />
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-medium whitespace-nowrap">
                            {feature.value}
                          </span>
                          <span className="text-xs text-gray-200 whitespace-nowrap">
                            {feature.name}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2">
                  {property.description}
                </p>
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-4">
                  <MapPinIcon className="w-5 h-5" />
                  <span className="font-medium">{property.location}</span>
                </div>

                {features.length > 6 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: (property.delay || 0) + 0.6,
                    }}
                    className="mt-2 text-xs text-gray-500 dark:text-gray-400"
                  >
                    +{features.length - 6} more features
                  </motion.div>
                )}
              </div>
            </div>

            {/* Enhanced Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full bg-gradient-to-r ${property.gradient} text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 group/btn relative overflow-hidden`}
            >
              <motion.div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                <HomeIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                View Details
              </span>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <SparklesIcon className="w-5 h-5 text-orange-400" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
