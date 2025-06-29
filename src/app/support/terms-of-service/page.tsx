"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Footer from "@/components/Footer";

const termsSections = [
  {
    title: "Acceptance of Terms",
    content: `
      <p class="mb-3">By accessing and using Vesta Nest&apos;s website, mobile application, and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
      
      <p class="mb-3">These Terms of Service (&quot;Terms&quot;) govern your use of our website, mobile application, and related services (collectively, the &quot;Service&quot;) operated by Vesta Nest (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).</p>
      
      <p class="mb-3">We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the &quot;Last Updated&quot; date.</p>
    `,
  },
  {
    title: "Description of Service",
    content: `
      <h3 class="text-lg font-semibold mb-3">What We Provide</h3>
      <p class="mb-3">Vesta Nest is a comprehensive real estate platform that provides:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Property search and listing services</li>
        <li>Real estate agent and property owner connections</li>
        <li>Property viewing scheduling and management</li>
        <li>Market insights and property valuations</li>
        <li>Mobile application for on-the-go access</li>
        <li>Customer support and advisory services</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Mobile Application</h3>
      <p class="mb-3">Our mobile app provides additional features including:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Offline access to saved properties</li>
        <li>Push notifications for property alerts</li>
        <li>Location-based property recommendations</li>
        <li>In-app messaging with agents</li>
        <li>Photo sharing and property documentation</li>
        <li>Virtual tour capabilities</li>
      </ul>
    `,
  },
  {
    title: "User Accounts and Registration",
    content: `
      <h3 class="text-lg font-semibold mb-3">Account Creation</h3>
      <p class="mb-3">To access certain features of our Service, you must create an account. You agree to:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Provide accurate, current, and complete information</li>
        <li>Maintain and update your account information</li>
        <li>Keep your password secure and confidential</li>
        <li>Accept responsibility for all activities under your account</li>
        <li>Notify us immediately of any unauthorized use</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Account Termination</h3>
      <p class="mb-3">We may terminate or suspend your account at any time for violations of these Terms or for any other reason at our sole discretion.</p>
      
      <h3 class="text-lg font-semibold mb-3">Age Requirements</h3>
      <p class="mb-3">You must be at least 18 years old to create an account and use our services. If you are under 18, you may only use our services with the involvement and consent of a parent or guardian.</p>
    `,
  },
  {
    title: "Acceptable Use Policy",
    content: `
      <h3 class="text-lg font-semibold mb-3">Permitted Uses</h3>
      <p class="mb-3">You may use our Service for lawful purposes only, including:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Searching for properties to buy, rent, or sell</li>
        <li>Contacting real estate agents and property owners</li>
        <li>Scheduling property viewings</li>
        <li>Accessing market information and insights</li>
        <li>Using our mobile app for property search and management</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Prohibited Activities</h3>
      <p class="mb-3">You agree not to:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Use the Service for any illegal or unauthorized purpose</li>
        <li>Violate any applicable laws or regulations</li>
        <li>Infringe upon the rights of others</li>
        <li>Upload or transmit harmful, offensive, or inappropriate content</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Interfere with or disrupt the Service</li>
        <li>Use automated systems to access the Service without permission</li>
        <li>Impersonate another person or entity</li>
      </ul>
    `,
  },
  {
    title: "Property Listings and Information",
    content: `
      <h3 class="text-lg font-semibold mb-3">Accuracy of Information</h3>
      <p class="mb-3">While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy, completeness, or reliability of any property listings or information on our platform. Property information is provided by third parties and may change without notice.</p>
      
      <h3 class="text-lg font-semibold mb-3">Property Listings</h3>
      <p class="mb-3">Property listings on our platform:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Are provided by property owners, agents, and third-party sources</li>
        <li>May not reflect current availability or pricing</li>
        <li>Should be verified independently before making decisions</li>
        <li>May be removed or modified at any time</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">No Endorsement</h3>
      <p class="mb-3">The inclusion of any property listing on our platform does not constitute an endorsement or recommendation by Vesta Nest. We are not responsible for the quality, safety, or legality of any properties listed.</p>
    `,
  },
  {
    title: "Mobile Application Terms",
    content: `
      <h3 class="text-lg font-semibold mb-3">App Store Terms</h3>
      <p class="mb-3">Our mobile application is available through the Apple App Store and Google Play Store. Your use of the app is also subject to the terms and conditions of these app stores.</p>
      
      <h3 class="text-lg font-semibold mb-3">App Permissions</h3>
      <p class="mb-3">Our mobile app may request access to:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Location services for nearby property searches</li>
        <li>Camera for property photo documentation</li>
        <li>Photo library for property image sharing</li>
        <li>Push notifications for alerts and updates</li>
        <li>Internet connectivity for data synchronization</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Offline Usage</h3>
      <p class="mb-3">Some features of our mobile app may be available offline, but full functionality requires an internet connection. We are not responsible for any limitations or issues that arise from offline usage.</p>
      
      <h3 class="text-lg font-semibold mb-3">App Updates</h3>
      <p class="mb-3">We may update our mobile app from time to time to improve functionality, security, or user experience. You are responsible for keeping your app updated to the latest version.</p>
    `,
  },
  {
    title: "Privacy and Data Protection",
    content: `
      <h3 class="text-lg font-semibold mb-3">Privacy Policy</h3>
      <p class="mb-3">Your privacy is important to us. Our collection and use of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
      
      <h3 class="text-lg font-semibold mb-3">Data Collection</h3>
      <p class="mb-3">We collect and process personal data as described in our Privacy Policy, including:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Account information and preferences</li>
        <li>Property search history and saved listings</li>
        <li>Communication with agents and support team</li>
        <li>Usage analytics and app performance data</li>
        <li>Location data (with your consent)</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Data Security</h3>
      <p class="mb-3">We implement appropriate security measures to protect your personal information, but no method of transmission over the internet or electronic storage is 100% secure.</p>
    `,
  },
  {
    title: "Intellectual Property Rights",
    content: `
      <h3 class="text-lg font-semibold mb-3">Our Rights</h3>
      <p class="mb-3">The Service and its original content, features, and functionality are owned by Vesta Nest and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
      
      <h3 class="text-lg font-semibold mb-3">User Content</h3>
      <p class="mb-3">You retain ownership of any content you submit to our Service. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your content in connection with our Service.</p>
      
      <h3 class="text-lg font-semibold mb-3">Trademarks</h3>
      <p class="mb-3">The Vesta Nest name, logo, and related trademarks are the property of Vesta Nest. You may not use these trademarks without our prior written consent.</p>
    `,
  },
  {
    title: "Limitation of Liability",
    content: `
      <h3 class="text-lg font-semibold mb-3">Disclaimer of Warranties</h3>
      <p class="mb-3">THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
      
      <h3 class="text-lg font-semibold mb-3">Limitation of Liability</h3>
      <p class="mb-3">IN NO EVENT SHALL VESTA NEST BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.</p>
      
      <h3 class="text-lg font-semibold mb-3">Maximum Liability</h3>
      <p class="mb-3">OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US, IF ANY, FOR THE SERVICE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>
    `,
  },
  {
    title: "Indemnification",
    content: `
      <p class="mb-3">You agree to defend, indemnify, and hold harmless Vesta Nest and its officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney&apos;s fees) arising from:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Your use of the Service</li>
        <li>Your violation of these Terms</li>
        <li>Your violation of any third-party rights</li>
        <li>Any content you submit to the Service</li>
        <li>Your violation of any applicable laws or regulations</li>
      </ul>
    `,
  },
  {
    title: "Governing Law and Dispute Resolution",
    content: `
      <h3 class="text-lg font-semibold mb-3">Governing Law</h3>
      <p class="mb-3">These Terms shall be governed by and construed in accordance with the laws of Ghana, without regard to its conflict of law provisions.</p>
      
      <h3 class="text-lg font-semibold mb-3">Dispute Resolution</h3>
      <p class="mb-3">Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the Ghana Arbitration Centre. The arbitration shall be conducted in Accra, Ghana.</p>
      
      <h3 class="text-lg font-semibold mb-3">Class Action Waiver</h3>
      <p class="mb-3">You agree that any arbitration or legal action shall be conducted on an individual basis and not as a class action or consolidated action.</p>
    `,
  },
  {
    title: "Miscellaneous",
    content: `
      <h3 class="text-lg font-semibold mb-3">Severability</h3>
      <p class="mb-3">If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue to be valid and enforceable.</p>
      
      <h3 class="text-lg font-semibold mb-3">Entire Agreement</h3>
      <p class="mb-3">These Terms constitute the entire agreement between you and Vesta Nest regarding the use of the Service and supersede all prior agreements and understandings.</p>
      
      <h3 class="text-lg font-semibold mb-3">Waiver</h3>
      <p class="mb-3">The failure of Vesta Nest to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.</p>
      
      <h3 class="text-lg font-semibold mb-3">Contact Information</h3>
      <p class="mb-3">If you have any questions about these Terms, please contact us at:</p>
      <div class="space-y-2 text-gray-600 dark:text-gray-300">
        <p><strong>Email:</strong> legal@vestanest.com</p>
        <p><strong>Phone:</strong> +233 20 123 4567</p>
        <p><strong>Address:</strong> Vesta Nest, Accra, Ghana</p>
      </div>
    `,
  },
];

export default function TermsOfService() {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 shadow-sm"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Terms of Service
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Welcome to Vesta Nest. These Terms of Service govern your use of our
            website, mobile application, and related services. By using our
            services, you agree to be bound by these terms.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Please read these terms carefully before using our platform. If you
            do not agree with any part of these terms, you may not access or use
            our services.
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {termsSections.map((section, index) => {
            const isExpanded = expandedSections[section.title];

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-t-xl"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
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
                    className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div
                      className="mt-4 text-gray-600 dark:text-gray-300"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white text-center"
        >
          <h3 className="text-lg font-semibold mb-2">Questions About Terms?</h3>
          <p className="text-orange-100 mb-4">
            If you have any questions about these Terms of Service, please
            contact our legal team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@vestanest.com"
              className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
            >
              Contact Legal Team
            </a>
            <a
              href="/support/help-center"
              className="bg-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              Visit Help Center
            </a>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
