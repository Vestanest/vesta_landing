"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import {
  HomeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CameraIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckCircleIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: CurrencyDollarIcon,
    title: "Maximum Value",
    description:
      "Get the best possible price for your property with our market analysis and pricing strategies.",
  },
  {
    icon: ChartBarIcon,
    title: "Market Insights",
    description:
      "Access real-time market data and trends to make informed selling decisions.",
  },
  {
    icon: CameraIcon,
    title: "Professional Photography",
    description:
      "High-quality photos and virtual tours to showcase your property in the best light.",
  },
  {
    icon: MegaphoneIcon,
    title: "Wide Marketing Reach",
    description:
      "Your property gets maximum exposure across multiple platforms and channels.",
  },
  {
    icon: UserGroupIcon,
    title: "Expert Guidance",
    description:
      "Professional support throughout the entire selling process from listing to closing.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Transactions",
    description:
      "Safe and protected transactions with verified buyers and secure payment processes.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Property Assessment",
    description:
      "Our experts evaluate your property and provide a comprehensive market analysis and pricing strategy.",
    icon: HomeIcon,
  },
  {
    number: "02",
    title: "Professional Listing",
    description:
      "We create compelling listings with professional photography and detailed property information.",
    icon: CameraIcon,
  },
  {
    number: "03",
    title: "Marketing Campaign",
    description:
      "Your property gets maximum exposure through our multi-channel marketing strategy.",
    icon: MegaphoneIcon,
  },
  {
    number: "04",
    title: "Showings & Offers",
    description:
      "We coordinate viewings and help you evaluate and negotiate offers from potential buyers.",
    icon: UserGroupIcon,
  },
  {
    number: "05",
    title: "Closing Process",
    description:
      "We handle all paperwork and legal requirements to ensure a smooth and timely closing.",
    icon: CheckCircleIcon,
  },
];

const testimonials = [
  {
    name: "Efua Addo",
    location: "Accra",
    text: "Vesta Nest helped me sell my property for 15% above market value. Their marketing strategy was incredible!",
    rating: 5,
  },
  {
    name: "Kwame Boateng",
    location: "Kumasi",
    text: "The professional photography and virtual tours attracted so many interested buyers. Sold within 3 weeks!",
    rating: 5,
  },
  {
    name: "Ama Kufuor",
    location: "Tamale",
    text: "From listing to closing, the team was professional and responsive. Highly recommend their selling service.",
    rating: 5,
  },
];

export default function SellPropertyPage() {
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
              Sell Your Property for{" "}
              <span className="text-orange-600 dark:text-orange-400">
                Maximum Value
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Get the best possible price for your property with our
              comprehensive selling service. From market analysis to closing,
              we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 inline-block"
                >
                  List Your Property
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
                  Get Free Valuation
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
              Why Choose Our Selling Service?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We provide everything you need to sell your property quickly and
              for the best price.
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
              Our 5-Step Selling Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A streamlined process designed to get your property sold quickly
              and for maximum value.
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
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Hear from property owners who achieved great results with Vesta
              Nest.
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
              Ready to Sell Your Property?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Get started with a free property valuation and market analysis.
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
                  Get Free Valuation
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
