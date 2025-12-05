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
    name: "X (Twitter)",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 2.535c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16.6 5.82C15.6 5.23 15 4.19 15 3H12V15C12 16.66 10.66 18 9 18C7.34 18 6 16.66 6 15C6 13.34 7.34 12 9 12C9.28 12 9.54 12.04 9.79 12.11V9.06C9.53 9.02 9.27 9 9 9C5.69 9 3 11.69 3 15C3 18.31 5.69 21 9 21C12.31 21 15 18.31 15 15V7.79C16.14 8.65 17.53 9.06 19 8.9V5.9C18.15 6 17.33 5.94 16.6 5.82Z" />
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
