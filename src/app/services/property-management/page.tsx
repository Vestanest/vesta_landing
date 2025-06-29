"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  StarIcon,
  CalendarIcon,
  CogIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: HomeIcon,
    title: "Property Maintenance",
    description:
      "Regular maintenance and repairs to keep your property in excellent condition.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Rent Collection",
    description:
      "Automated rent collection and financial reporting for hassle-free income management.",
  },
  {
    icon: UserGroupIcon,
    title: "Tenant Management",
    description:
      "Professional tenant screening, onboarding, and ongoing support services.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock emergency maintenance and tenant support services.",
  },
  {
    icon: DocumentTextIcon,
    title: "Legal Compliance",
    description:
      "Ensure your property meets all legal requirements and regulations.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Property Protection",
    description:
      "Comprehensive insurance and security measures to protect your investment.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Property Assessment",
    description:
      "We conduct a thorough assessment of your property and develop a customized management plan.",
    icon: HomeIcon,
  },
  {
    number: "02",
    title: "Tenant Screening",
    description:
      "Professional tenant screening to find reliable, qualified tenants for your property.",
    icon: UserGroupIcon,
  },
  {
    number: "03",
    title: "Property Marketing",
    description:
      "Strategic marketing to attract quality tenants and maximize rental income.",
    icon: CalendarIcon,
  },
  {
    number: "04",
    title: "Ongoing Management",
    description:
      "Day-to-day management including maintenance, rent collection, and tenant relations.",
    icon: CogIcon,
  },
  {
    number: "05",
    title: "Performance Reporting",
    description:
      "Regular reports on property performance, income, and maintenance activities.",
    icon: DocumentTextIcon,
  },
];

const testimonials = [
  {
    name: "Kwame Asante",
    location: "Accra",
    text: "Vesta Nest has managed my properties for over 3 years. Their service is exceptional and my rental income has increased significantly.",
    rating: 5,
  },
  {
    name: "Ama Osei",
    location: "Kumasi",
    text: "The property management team is professional and responsive. They handle everything so I can focus on other investments.",
    rating: 5,
  },
  {
    name: "Kofi Mensah",
    location: "Tamale",
    text: "Outstanding property management service. They&apos;ve increased my property value and rental income while reducing my stress.",
    rating: 5,
  },
];

export default function PropertyManagementPage() {
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
              Professional{" "}
              <span className="text-orange-600 dark:text-orange-400">
                Property Management
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Maximize your property&apos;s value and rental income with our
              comprehensive property management services. We handle everything
              so you don&apos;t have to.
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
                  Get Started
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
                  Free Consultation
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
              Comprehensive Property Management Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We handle every aspect of property management to maximize your
              returns and minimize your stress.
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
              Our 5-Step Management Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A systematic approach to professional property management that
              delivers results.
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
              Hear from property owners who trust Vesta Nest with their
              investments.
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
              Ready to Maximize Your Property&apos;s Potential?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Let our professional team manage your property and increase your
              returns.
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
                  Get Started Today
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
                  Free Consultation
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
