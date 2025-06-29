"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const supportResources = [
  {
    title: "Help Center",
    description:
      "Find answers to frequently asked questions and get step-by-step guidance",
    icon: QuestionMarkCircleIcon,
    href: "/support/help-center",
    color: "from-blue-500 to-cyan-500",
    features: [
      "Searchable FAQ database",
      "Step-by-step guides",
      "Video tutorials",
      "Contact support options",
    ],
  },
  {
    title: "Privacy Policy",
    description: "Learn how we protect your personal information and data",
    icon: ShieldCheckIcon,
    href: "/support/privacy-policy",
    color: "from-green-500 to-emerald-500",
    features: [
      "Data collection practices",
      "Information usage policies",
      "Your privacy rights",
      "Mobile app privacy",
    ],
  },
  {
    title: "Terms of Service",
    description: "Understand the terms and conditions for using our platform",
    icon: DocumentTextIcon,
    href: "/support/terms-of-service",
    color: "from-purple-500 to-indigo-500",
    features: [
      "Service usage terms",
      "User responsibilities",
      "Mobile app terms",
      "Legal agreements",
    ],
  },
];

const contactMethods = [
  {
    title: "Phone Support",
    description: "Speak directly with our support team",
    icon: PhoneIcon,
    contact: "+233 20 123 4567",
    availability: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
    action: "Call Now",
    href: "tel:+233201234567",
  },
  {
    title: "Email Support",
    description: "Send us a detailed message",
    icon: EnvelopeIcon,
    contact: "support@vestanest.com",
    availability: "Response within 24 hours",
    action: "Send Email",
    href: "mailto:support@vestanest.com",
  },
  {
    title: "Live Chat",
    description: "Get instant help from our agents",
    icon: ChatBubbleLeftRightIcon,
    contact: "Available on website",
    availability: "Mon-Fri: 8AM-6PM",
    action: "Start Chat",
    href: "#",
  },
];

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Support Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Get the help you need to make the most of Vesta Nest. Find
              answers, learn about our policies, and connect with our support
              team.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Support Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Support Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <Link href={resource.href}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${resource.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <resource.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {resource.description}
                    </p>
                    <ul className="space-y-1">
                      {resource.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-gray-500 dark:text-gray-400 flex items-center"
                        >
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-orange-500 font-medium group-hover:text-orange-600 transition-colors">
                      Learn more →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Need Direct Help?</h2>
            <p className="text-orange-100">
              Our support team is here to help you with any questions or
              concerns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <method.icon className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                <p className="text-orange-100 mb-4">{method.description}</p>
                <p className="text-sm text-orange-200 mb-2">{method.contact}</p>
                <p className="text-xs text-orange-200 mb-4">
                  {method.availability}
                </p>
                <a
                  href={method.href}
                  className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors inline-block"
                >
                  {method.action}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Quick Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Search Smart
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Use our advanced filters to find properties that match your
                exact criteria
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Mobile App
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Download our mobile app for property alerts and offline access
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Contact Agents
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Reach out to our agents for personalized assistance and property
                viewings
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Enable notifications to get alerts about new properties and
                market updates
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
