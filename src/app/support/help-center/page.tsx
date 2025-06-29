"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Footer from "@/components/Footer";

const faqCategories = [
  {
    title: "Getting Started",
    icon: "🚀",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "Creating an account is easy! Simply click the 'Sign Up' button in the top right corner, fill in your details, and verify your email address. You can also sign up using your Google or Facebook account for faster access.",
      },
      {
        question: "How do I search for properties?",
        answer:
          "Use our advanced search filters to find your perfect property. You can filter by location, price range, property type, number of bedrooms, and more. Save your searches to get notified when new properties match your criteria.",
      },
      {
        question: "How do I save properties to my favorites?",
        answer:
          "Click the heart icon on any property listing to save it to your favorites. You can access all your saved properties from your dashboard under the 'Favorites' section.",
      },
    ],
  },
  {
    title: "Property Viewing",
    icon: "🏠",
    faqs: [
      {
        question: "How do I schedule a property viewing?",
        answer:
          "Click the 'Schedule Viewing' button on any property listing. Choose your preferred date and time, and our team will confirm the appointment. You'll receive a confirmation email with all the details.",
      },
      {
        question: "Can I do virtual tours?",
        answer:
          "Yes! Many of our properties offer virtual tours. Look for the 'Virtual Tour' button on property listings. You can also request a live video call with our agents for a personalized virtual viewing experience.",
      },
      {
        question: "What should I bring to a property viewing?",
        answer:
          "Bring a valid ID, your questions about the property, and if you're interested, your financial information. Our agents will guide you through the process and answer all your questions.",
      },
    ],
  },
  {
    title: "Buying & Selling",
    icon: "💰",
    faqs: [
      {
        question: "What documents do I need to buy a property?",
        answer:
          "You'll need proof of identity, proof of income, bank statements, and any existing property documents. Our team will provide a complete checklist and guide you through the entire process.",
      },
      {
        question: "How do I list my property for sale?",
        answer:
          "Contact our sales team or use the 'List Your Property' feature on our website. We'll schedule a property assessment and guide you through the listing process, including professional photography and marketing.",
      },
      {
        question: "What are the typical closing costs?",
        answer:
          "Closing costs typically include legal fees, stamp duty, and registration fees. The exact amount depends on the property value and location. Our team will provide a detailed breakdown during the buying process.",
      },
    ],
  },
  {
    title: "Renting",
    icon: "🔑",
    faqs: [
      {
        question: "How do I apply for a rental property?",
        answer:
          "Submit your application through our website with required documents including ID, proof of income, and references. Our team will review your application and contact you within 24-48 hours.",
      },
      {
        question: "What's included in the rent?",
        answer:
          "This varies by property. Check the property listing for details about utilities, maintenance, and other included services. Our agents can clarify any specific inclusions during your viewing.",
      },
      {
        question: "How long does the rental process take?",
        answer:
          "Typically 3-5 business days from application to approval, depending on document verification and reference checks. We'll keep you updated throughout the process.",
      },
    ],
  },
  {
    title: "Mobile App",
    icon: "📱",
    faqs: [
      {
        question: "How do I download the Vesta Nest mobile app?",
        answer:
          "Download our app from the App Store (iOS) or Google Play Store (Android). Search for 'Vesta Nest' and install the app. You can use your existing account or create a new one directly in the app.",
      },
      {
        question: "Can I use the app offline?",
        answer:
          "Yes! The app allows you to browse saved properties and view property details offline. You'll need an internet connection to search for new properties or contact agents.",
      },
      {
        question: "How do I enable push notifications?",
        answer:
          "Go to Settings in the app and toggle on 'Push Notifications'. You can customize which notifications you receive, such as new property alerts, viewing confirmations, and market updates.",
      },
    ],
  },
  {
    title: "Account & Billing",
    icon: "👤",
    faqs: [
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email. You can also reset your password through the mobile app.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          "Go to your dashboard and click 'Edit Profile'. You can update your personal information, preferences, and notification settings at any time.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Contact our support team to request account deletion. We'll guide you through the process and ensure all your data is properly removed from our systems.",
      },
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
  },
  {
    title: "Email Support",
    description: "Send us a detailed message",
    icon: EnvelopeIcon,
    contact: "support@vestanest.com",
    availability: "Response within 24 hours",
    action: "Send Email",
  },
  {
    title: "Live Chat",
    description: "Get instant help from our agents",
    icon: ChatBubbleLeftRightIcon,
    contact: "Available on website",
    availability: "Mon-Fri: 8AM-6PM",
    action: "Start Chat",
  },
];

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaqs, setExpandedFaqs] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }));
  };

  const filteredCategories = faqCategories.filter(
    (category) =>
      selectedCategory === null || category.title === selectedCategory
  );

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
              Help Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Find answers to your questions and get the support you need for
              your property journey
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
            >
              All Categories
            </button>
            {faqCategories.map((category) => (
              <button
                key={category.title}
                onClick={() => setSelectedCategory(category.title)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.title
                    ? "bg-orange-500 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                }`}
              >
                {category.icon} {category.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + categoryIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  {category.title}
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {category.faqs.map((faq, faqIndex) => {
                  const faqId = `${category.title}-${faqIndex}`;
                  const isExpanded = expandedFaqs[faqId];

                  return (
                    <div key={faqId} className="p-6">
                      <button
                        onClick={() => toggleFaq(faqId)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </h3>
                        {isExpanded ? (
                          <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 text-gray-600 dark:text-gray-300"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <QuestionMarkCircleIcon className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Still Need Help?</h2>
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
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <method.icon className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                <p className="text-orange-100 mb-4">{method.description}</p>
                <p className="text-sm text-orange-200 mb-2">{method.contact}</p>
                <p className="text-xs text-orange-200 mb-4">
                  {method.availability}
                </p>
                <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                  {method.action}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
