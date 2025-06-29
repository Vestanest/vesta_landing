"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  EnvelopeIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-28 h-28 bg-gradient-to-br from-orange-300/30 to-amber-300/30 dark:from-orange-600/20 dark:to-amber-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-to-br from-amber-300/30 to-yellow-300/30 dark:from-amber-600/20 dark:to-yellow-600/20 rounded-full blur-3xl"
        />
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 70% 70%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`,
              backgroundSize: "100px 100px, 140px 140px",
            }}
          />
        </div>
        {/* Floating Particles */}
        <motion.div
          animate={{ y: [0, -60, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-orange-400/60 dark:bg-orange-500/40 rounded-full"
        />
        <motion.div
          animate={{ y: [0, 50, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-amber-400/60 dark:bg-amber-500/40 rounded-full"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-6"
          >
            <SparklesIcon className="w-4 h-4" />
            Newsletter
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Stay</span>{" "}
            <span className="text-orange-600 dark:text-orange-400">
              Updated
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get the latest property updates, market insights, and exclusive
            offers delivered straight to your inbox.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 p-4 rounded-xl border border-green-200 dark:border-green-700"
            >
              <p className="font-semibold">Thank you for subscribing!</p>
              <p className="text-sm">You&apos;ll receive our updates soon.</p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-1">
                <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400 dark:text-orange-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-white/90 dark:bg-gray-800/90 border border-orange-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 shadow-none"
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{
                  scale: isLoading ? 1 : 1.05,
                  y: isLoading ? 0 : -2,
                }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                className={`relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-500 dark:to-amber-500 text-white font-semibold rounded-xl hover:bg-orange-700 dark:hover:bg-orange-600 transition-all duration-300 group overflow-hidden ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-amber-700 dark:from-orange-600 dark:to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div className="relative flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.div>
              </motion.button>
            </form>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
        {/* Floating Decorative Sparkles */}
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/4 right-1/4"
        >
          <SparklesIcon className="w-6 h-6 text-orange-400" />
        </motion.div>
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 left-1/4"
        >
          <SparklesIcon className="w-4 h-4 text-amber-400" />
        </motion.div>
      </div>
    </section>
  );
}
