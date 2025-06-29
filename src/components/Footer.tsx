"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Properties", href: "/properties" },
  ],
  services: [
    { name: "Buy Property", href: "/services/buy-property" },
    { name: "Sell Property", href: "/services/sell-property" },
    { name: "Rent Property", href: "/services/rent-property" },
    { name: "Property Management", href: "/services/property-management" },
  ],
  information: [
    { name: "Property Guide", href: "#" },
    { name: "Market Insights", href: "#" },
    { name: "Investment Tips", href: "#" },
    { name: "Legal Resources", href: "#" },
    { name: "Mortgage Calculator", href: "#" },
    { name: "Area Guides", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "/support/help-center" },
    { name: "Privacy Policy", href: "/support/privacy-policy" },
    { name: "Terms of Service", href: "/support/terms-of-service" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.796-1.418-1.947-1.418-3.244s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "#") {
      return false;
    }
    return pathname.startsWith(href);
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-800 text-white overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Animated Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-amber-400/30 to-yellow-400/30 rounded-full blur-3xl"
        />
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
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
          animate={{ y: [0, -60, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-orange-400/60 rounded-full"
        />
        <motion.div
          animate={{ y: [0, 50, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-amber-400/60 rounded-full"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
                <span className="text-2xl font-bold text-orange-400 dark:text-orange-300">
                  Vesta Nest
                </span>
              </Link>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Your trusted partner in finding the perfect home across Ghana.
              Experience modern living with elegance and style.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-white/20 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-orange-300 dark:text-orange-200">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.name}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className={`transition-colors duration-200 ${
                          active
                            ? "text-orange-300 dark:text-orange-200 font-medium"
                            : "text-gray-300 dark:text-gray-400 hover:text-orange-300 dark:hover:text-orange-200"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={`transition-colors duration-200 ${
                          active
                            ? "text-orange-300 dark:text-orange-200 font-medium"
                            : "text-gray-300 dark:text-gray-400 hover:text-orange-300 dark:hover:text-orange-200"
                        }`}
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-orange-300 dark:text-orange-200">
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.name}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className={`transition-colors duration-200 ${
                          active
                            ? "text-orange-300 dark:text-orange-200 font-medium"
                            : "text-gray-300 dark:text-gray-400 hover:text-orange-300 dark:hover:text-orange-200"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={`transition-colors duration-200 ${
                          active
                            ? "text-orange-300 dark:text-orange-200 font-medium"
                            : "text-gray-300 dark:text-gray-400 hover:text-orange-300 dark:hover:text-orange-200"
                        }`}
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-orange-300 dark:text-orange-200">
              Information
            </h3>
            <ul className="space-y-2">
              {footerLinks.information.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.name}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className={`transition-colors duration-200 ${
                          active
                            ? "text-orange-300 dark:text-orange-200 font-medium"
                            : "text-gray-300 dark:text-gray-400 hover:text-orange-300 dark:hover:text-orange-200"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={`transition-colors duration-200 ${
                          active
                            ? "text-orange-300 dark:text-orange-200 font-medium"
                            : "text-gray-300 dark:text-gray-400 hover:text-orange-300 dark:hover:text-orange-200"
                        }`}
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-orange-300 dark:text-orange-200">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.name}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className={`transition-colors duration-200 ${
                          active
                            ? "text-orange-300 dark:text-orange-200 font-medium"
                            : "text-gray-300 dark:text-gray-400 hover:text-orange-300 dark:hover:text-orange-200"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={`transition-colors duration-200 ${
                          active
                            ? "text-orange-300 dark:text-orange-200 font-medium"
                            : "text-gray-300 dark:text-gray-400 hover:text-orange-300 dark:hover:text-orange-200"
                        }`}
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-700 dark:border-gray-600"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                <MapPinIcon className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-white">Accra, Ghana</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                <PhoneIcon className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">+233 20 123 4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                <EnvelopeIcon className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">info@vestanest.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* App Store Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-700 dark:border-gray-800"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2 text-orange-400 dark:text-orange-300">
              Download Our Mobile App
            </h3>
            <p className="text-gray-300 dark:text-gray-400">
              Get the Vesta Nest app for a seamless property search experience
              on the go.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* App Store */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-black/50 dark:bg-white/10 backdrop-blur-sm border border-gray-600 dark:border-gray-500 rounded-xl hover:bg-black/70 dark:hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black dark:text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  Download on the
                </div>
                <div className="text-sm font-semibold text-white">
                  App Store
                </div>
              </div>
            </motion.a>

            {/* Google Play Store */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-black/50 dark:bg-white/10 backdrop-blur-sm border border-gray-600 dark:border-gray-500 rounded-xl hover:bg-black/70 dark:hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black dark:text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  GET IT ON
                </div>
                <div className="text-sm font-semibold text-white">
                  Google Play
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Vesta Nest. All rights reserved. |
            Designed with ❤️ for Ghana
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
