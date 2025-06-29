"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import {
  HomeIcon,
  KeyIcon,
  CalendarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: HomeIcon,
    title: "Wide Selection",
    description:
      "Browse thousands of rental properties across Ghana, from apartments to houses.",
  },
  {
    icon: KeyIcon,
    title: "Quick Move-in",
    description:
      "Find properties available for immediate occupancy with streamlined application process.",
  },
  {
    icon: CalendarIcon,
    title: "Flexible Terms",
    description:
      "Choose from short-term and long-term rental options that suit your needs.",
  },
  {
    icon: MapPinIcon,
    title: "Prime Locations",
    description:
      "Access to the best neighborhoods with detailed area information and amenities.",
  },
  {
    icon: UserGroupIcon,
    title: "Verified Landlords",
    description:
      "All properties are listed by verified landlords with transparent rental terms.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Rentals",
    description:
      "Safe and protected rental agreements with proper legal documentation.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Search Properties",
    description:
      "Use our advanced search filters to find rental properties that match your criteria and budget.",
    icon: HomeIcon,
  },
  {
    number: "02",
    title: "Schedule Viewings",
    description:
      "Book convenient viewing appointments to see properties in person and meet landlords.",
    icon: CalendarIcon,
  },
  {
    number: "03",
    title: "Submit Application",
    description:
      "Complete your rental application with our streamlined online process.",
    icon: CheckCircleIcon,
  },
  {
    number: "04",
    title: "Sign Agreement",
    description:
      "Review and sign your rental agreement with our legal team&apos;s support.",
    icon: KeyIcon,
  },
  {
    number: "05",
    title: "Move In",
    description:
      "Get your keys and move into your new home with our move-in assistance.",
    icon: HomeIcon,
  },
];

const testimonials = [
  {
    name: "Sarah Mensah",
    location: "Accra",
    text: "Found my perfect rental apartment within days. The process was smooth and the property exceeded my expectations.",
    rating: 5,
  },
  {
    name: "David Osei",
    location: "Kumasi",
    text: "Great selection of rental properties and excellent customer service. Highly recommend for anyone looking to rent.",
    rating: 5,
  },
  {
    name: "Grace Addo",
    location: "Tamale",
    text: "The rental application process was so easy. The team helped me find exactly what I was looking for.",
    rating: 5,
  },
];

export default function RentPropertyPage() {
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
              Find Your Perfect{" "}
              <span className="text-orange-600 dark:text-orange-400">
                Rental Home
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Discover thousands of rental properties across Ghana with our
              comprehensive rental service. From search to move-in, we&apos;ve
              got you covered.
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
                  Browse Rentals
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

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Our Rental Service?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We make finding and renting your perfect home simple and
              stress-free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-4 mb-6 inline-block">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our 5-Step Rental Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A simple and efficient process to get you into your new rental
              home quickly.
            </p>
          </motion.div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {step.description}
                  </p>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-8">
                    <step.icon className="w-16 h-16 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Tenants Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Hear from satisfied tenants who found their perfect rental home
              with Vesta Nest.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {testimonial.location}
                  </p>
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
              Ready to Find Your Rental Home?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Start your search today and find the perfect rental property for
              you.
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
                  Browse Rentals
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
