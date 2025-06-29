"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  StarIcon,
  CheckCircleIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: MagnifyingGlassIcon,
    title: "Advanced Search",
    description:
      "Find your perfect property with our intelligent search filters and AI-powered recommendations.",
  },
  {
    icon: MapPinIcon,
    title: "Prime Locations",
    description:
      "Access to the best neighborhoods across Ghana with detailed area insights and market data.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Competitive Pricing",
    description:
      "Get the best deals with our price comparison tools and negotiation support.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Transactions",
    description:
      "Complete your purchase with confidence through our verified and secure process.",
  },
  {
    icon: UserGroupIcon,
    title: "Expert Guidance",
    description:
      "Get personalized support from our experienced real estate professionals.",
  },
  {
    icon: StarIcon,
    title: "Quality Assurance",
    description:
      "All properties are verified and inspected to ensure quality standards.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Define Your Requirements",
    description:
      "Tell us about your preferences, budget, and timeline. Our experts will help you refine your search criteria.",
    icon: HomeIcon,
  },
  {
    number: "02",
    title: "Browse Properties",
    description:
      "Explore our curated selection of properties that match your criteria with detailed photos and virtual tours.",
    icon: MagnifyingGlassIcon,
  },
  {
    number: "03",
    title: "Schedule Viewings",
    description:
      "Book convenient viewing appointments with our agents to see properties in person.",
    icon: CalendarIcon,
  },
  {
    number: "04",
    title: "Make an Offer",
    description:
      "Get expert guidance on making competitive offers and negotiating the best deal.",
    icon: CurrencyDollarIcon,
  },
  {
    number: "05",
    title: "Complete Purchase",
    description:
      "We&apos;ll handle all the paperwork and legal requirements to ensure a smooth closing process.",
    icon: CheckCircleIcon,
  },
];

const testimonials = [
  {
    name: "Kwame Asante",
    location: "Accra",
    text: "Vesta Nest made buying my first home incredibly easy. Their team guided me through every step with patience and expertise.",
    rating: 5,
  },
  {
    name: "Ama Osei",
    location: "Kumasi",
    text: "The property search tools are amazing! I found my dream home within weeks thanks to their advanced filtering system.",
    rating: 5,
  },
  {
    name: "Kofi Mensah",
    location: "Tamale",
    text: "Professional service from start to finish. The team was responsive and helped me get the best possible deal.",
    rating: 5,
  },
];

export default function BuyPropertyPage() {
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
              Buy Your Dream{" "}
              <span className="text-orange-600 dark:text-orange-400">
                Property
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Find and purchase your perfect home across Ghana with our
              comprehensive buying service. From search to closing, we&apos;re
              with you every step of the way.
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
                  Browse Properties
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
              Why Choose Our Buying Service?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We provide everything you need to make an informed and confident
              property purchase.
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
              Our 5-Step Buying Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A simple and transparent process designed to make your property
              purchase stress-free.
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
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Hear from families who found their perfect home with Vesta Nest.
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
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Start your property buying journey with Vesta Nest today.
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
