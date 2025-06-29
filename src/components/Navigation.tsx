"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme, toggleTheme, isInitialized } = useTheme();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const handleThemeToggle = () => {
    if (isInitialized) {
      try {
        toggleTheme();
      } catch (error) {
        console.error("Error toggling theme:", error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-orange-100 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                Vesta Nest
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {menuItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group ${
                          active
                            ? "text-orange-600 dark:text-orange-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                        }`}
                      >
                        {item.name}
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                            active
                              ? "w-full bg-orange-600 dark:bg-orange-400"
                              : "w-0 bg-orange-600 dark:bg-orange-400 group-hover:w-full"
                          }`}
                        ></span>
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group ${
                          active
                            ? "text-orange-600 dark:text-orange-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                        }`}
                      >
                        {item.name}
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                            active
                              ? "w-full bg-orange-600 dark:bg-orange-400"
                              : "w-0 bg-orange-600 dark:bg-orange-400 group-hover:w-full"
                          }`}
                        ></span>
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Auth Buttons or User Menu */}
            {user ? (
              <div className="relative">
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user.firstName.charAt(0)}
                    </span>
                  </div>
                  <span>{user.firstName}</span>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/auth/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      pathname === "/auth/login"
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                    }`}
                  >
                    Sign in
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="/auth/signup"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg ${
                      pathname === "/auth/signup"
                        ? "bg-orange-700 text-white"
                        : "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white"
                    }`}
                  >
                    Sign up
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Dark Mode Toggle */}
            {isInitialized && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleThemeToggle}
                className="p-2 rounded-lg bg-orange-100 dark:bg-gray-800 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {theme === "light" ? (
                  <MoonIcon className="h-5 w-5" />
                ) : (
                  <SunIcon className="h-5 w-5" />
                )}
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle for Mobile */}
            {isInitialized && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleThemeToggle}
                className="p-2 rounded-lg bg-orange-100 dark:bg-gray-800 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {theme === "light" ? (
                  <MoonIcon className="h-5 w-5" />
                ) : (
                  <SunIcon className="h-5 w-5" />
                )}
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 p-2 rounded-md"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-orange-100 dark:border-gray-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                          active
                            ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
                            : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                          active
                            ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
                            : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                        }`}
                      >
                        {item.name}
                      </a>
                    )}
                  </motion.div>
                );
              })}

              {/* Mobile Auth Buttons or User Info */}
              <div className="pt-4 pb-3 border-t border-orange-100 dark:border-gray-700">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                        pathname === "/auth/login"
                          ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                      }`}
                    >
                      <UserIcon className="h-5 w-5 mr-2" />
                      Sign in
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:shadow-lg text-center ${
                        pathname === "/auth/signup"
                          ? "bg-orange-700 text-white"
                          : "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white"
                      }`}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
