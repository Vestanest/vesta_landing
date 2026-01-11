"use client";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon, ClockIcon } from "@heroicons/react/24/outline";
import Navigation from "../../../components/Navigation";
import { useAuth } from "../../../contexts/AuthContext";
import { useToast } from "../../../contexts/ToastContext";


function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail, resendEmailOtp } = useAuth();
  const { showSuccess, showError } = useToast();
  
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Get email from URL params or localStorage
    const emailParam = searchParams.get("email");
    const storedEmail = localStorage.getItem("pendingVerificationEmail");
    
    if (emailParam) {
      setEmail(emailParam);
      localStorage.setItem("pendingVerificationEmail", emailParam);
    } else if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // No email found, redirect to signup
      router.push("/auth/signup");
    }
  }, [searchParams, router]);

  useEffect(() => {
    // Start countdown for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsVerifying(true);
      setError(null);
      
      const success = await verifyEmail(email, otp);
      if (success) {
        setIsVerified(true);
        showSuccess("Email verified!", "Your email has been successfully verified.");
        localStorage.removeItem("pendingVerificationEmail");
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth/login?verified=true");
        }, 3000);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Verification failed. Please try again.";
      setError(errorMessage);
      showError("Verification failed", errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      setError(null);
      
      const success = await resendEmailOtp(email);
      if (success) {
        const successMessage = "OTP sent successfully! Please check your email.";
        setSuccess(successMessage);
        showSuccess("Code sent!", successMessage);
        setCountdown(60); // 60 second cooldown
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to resend OTP. Please try again.";
      setError(errorMessage);
      showError("Resend failed", errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpChange = (value: string) => {
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setOtp(numericValue);
    setError(null);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navigation />
        
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Email Verified!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Your email has been successfully verified. You can now sign in to your account.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to login page...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto h-16 w-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-6"
            >
              <span className="text-white font-bold text-2xl">V</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              Verify your email
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-sm text-gray-600 dark:text-gray-400"
            >
              We&apos;ve sent a verification code to <strong>{email}</strong>
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-6"
            onSubmit={handleVerify}
          >
            {/* OTP Input */}
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={otp}
                onChange={(e) => handleOtpChange(e.target.value)}
                className="w-full px-4 py-3 text-center text-2xl font-mono tracking-widest border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                placeholder="000000"
                maxLength={6}
                required
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <ExclamationTriangleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">{success}</span>
                </div>
              </motion.div>
            )}

            {/* Verify Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isVerifying || otp.length !== 6}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isVerifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </motion.button>

            {/* Resend OTP */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Didn&apos;t receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending || countdown > 0}
                className="text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isResending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin inline-block mr-2" />
                    Sending...
                  </>
                ) : countdown > 0 ? (
                  <>
                    <ClockIcon className="w-4 h-4 inline-block mr-1" />
                    Resend in {countdown}s
                  </>
                ) : (
                  "Resend Code"
                )}
              </button>
            </div>

            {/* Back to Signup */}
            <div className="text-center">
              <Link
                href="/auth/signup"
                className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Sign Up
              </Link>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}

