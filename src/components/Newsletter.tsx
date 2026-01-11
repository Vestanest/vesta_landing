"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  EnvelopeIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { NewsletterService } from "../api/services/newsletter.service";
import { toApiError } from "../api/errors";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await NewsletterService.subscribe({
        email,
        preferences: {
          frequency: "weekly",
          property_types: ["apartment", "house", "villa"],
        },
      });
      setIsSubscribed(true);
      setEmail("");
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (err) {
      setError(toApiError(err).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="overflow-hidden relative px-4 py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
          className="absolute top-10 left-10 w-28 h-28 bg-gradient-to-br rounded-full blur-3xl from-orange-300/30 to-amber-300/30 dark:from-orange-600/20 dark:to-amber-600/20"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute right-10 bottom-10 w-36 h-36 bg-gradient-to-br rounded-full blur-3xl from-amber-300/30 to-yellow-300/30 dark:from-amber-600/20 dark:to-yellow-600/20"
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
          className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-orange-400/60 dark:bg-orange-500/40"
        />
        <motion.div
          animate={{ y: [0, 50, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-1/4 left-1/4 w-3 h-3 rounded-full bg-amber-400/60 dark:bg-amber-500/40"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
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
            className="inline-flex gap-2 items-center px-4 py-2 mb-6 text-sm font-medium text-orange-700 bg-orange-100 rounded-full dark:bg-orange-900/50 dark:text-orange-300"
          >
            <SparklesIcon className="w-4 h-4" />
            Newsletter
          </motion.div>
          <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
            <span className="text-gray-900 dark:text-white">Stay</span>{" "}
            <span className="text-orange-600 dark:text-orange-400">
              Updated
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            Get the latest property updates, market insights, and exclusive
            offers delivered straight to your inbox.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-md"
        >
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 text-green-700 bg-green-100 rounded-xl border border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700"
            >
              <p className="font-semibold">Thank you for subscribing!</p>
              <p className="text-sm">You&apos;ll receive our updates soon.</p>
            </motion.div>
          ) : (
            <>
            {error && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700">
                {error}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <div className="relative flex-1">
                <EnvelopeIcon className="absolute left-4 top-1/2 w-5 h-5 text-orange-400 transform -translate-y-1/2 dark:text-orange-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="py-4 pr-4 pl-12 w-full placeholder-gray-500 text-gray-900 rounded-xl border border-orange-200 shadow-none transition-all duration-200 bg-white/90 dark:bg-gray-800/90 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-amber-700 opacity-0 transition-opacity duration-300 dark:from-orange-600 dark:to-amber-600 group-hover:opacity-100" />
                <motion.div className="flex relative gap-2 items-center">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
                      />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </motion.div>
              </motion.button>
            </form>
            </>
          )}
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
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
