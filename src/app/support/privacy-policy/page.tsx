"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Footer from "@/components/Footer";

const policySections = [
  {
    title: "Information We Collect",
    content: `
      <h3 class="text-lg font-semibold mb-3">Personal Information</h3>
      <p class="mb-3">We collect information you provide directly to us, including:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Name, email address, phone number, and postal address</li>
        <li>Property preferences and search criteria</li>
        <li>Financial information for property transactions</li>
        <li>Identity verification documents</li>
        <li>Communication preferences and marketing consent</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Automatically Collected Information</h3>
      <p class="mb-3">When you use our website or mobile app, we automatically collect:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Device information (IP address, browser type, operating system)</li>
        <li>Usage data (pages visited, time spent, search queries)</li>
        <li>Location data (with your consent)</li>
        <li>Cookies and similar tracking technologies</li>
        <li>Mobile app analytics and crash reports</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Mobile App Specific Data</h3>
      <p class="mb-3">Our mobile app may collect additional information:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Device identifiers and push notification tokens</li>
        <li>App usage patterns and feature interactions</li>
        <li>Offline activity and cached data</li>
        <li>Camera and photo library access (for property photos)</li>
        <li>Location services for nearby property searches</li>
      </ul>
    `,
  },
  {
    title: "How We Use Your Information",
    content: `
      <h3 class="text-lg font-semibold mb-3">Primary Uses</h3>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Provide and improve our property search and listing services</li>
        <li>Connect you with real estate agents and property owners</li>
        <li>Process property transactions and applications</li>
        <li>Send you relevant property alerts and market updates</li>
        <li>Provide customer support and respond to inquiries</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Mobile App Features</h3>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Enable push notifications for property alerts and updates</li>
        <li>Provide location-based property recommendations</li>
        <li>Allow offline access to saved properties</li>
        <li>Enable photo sharing and property documentation</li>
        <li>Facilitate in-app messaging with agents</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Analytics and Improvement</h3>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Analyze usage patterns to improve our services</li>
        <li>Develop new features and functionality</li>
        <li>Personalize your experience and recommendations</li>
        <li>Ensure app stability and performance</li>
      </ul>
    `,
  },
  {
    title: "Information Sharing and Disclosure",
    content: `
      <h3 class="text-lg font-semibold mb-3">With Your Consent</h3>
      <p class="mb-3">We may share your information with:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Real estate agents and property owners for viewings and transactions</li>
        <li>Financial institutions for mortgage and payment processing</li>
        <li>Legal professionals for property transactions</li>
        <li>Third-party service providers who assist our operations</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Legal Requirements</h3>
      <p class="mb-3">We may disclose your information when required by law or to:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Comply with legal obligations and court orders</li>
        <li>Protect our rights, property, or safety</li>
        <li>Investigate potential fraud or security threats</li>
        <li>Enforce our terms of service and policies</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Business Transfers</h3>
      <p class="mb-3">In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.</p>
    `,
  },
  {
    title: "Data Security and Storage",
    content: `
      <h3 class="text-lg font-semibold mb-3">Security Measures</h3>
      <p class="mb-3">We implement appropriate security measures to protect your information:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Encryption of data in transit and at rest</li>
        <li>Secure authentication and access controls</li>
        <li>Regular security audits and vulnerability assessments</li>
        <li>Employee training on data protection practices</li>
        <li>Secure mobile app development and updates</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Data Retention</h3>
      <p class="mb-3">We retain your information for as long as necessary to:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Provide our services and maintain your account</li>
        <li>Comply with legal and regulatory requirements</li>
        <li>Resolve disputes and enforce agreements</li>
        <li>Improve our services and develop new features</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Data Location</h3>
      <p class="mb-3">Your data is primarily stored in Ghana and may be processed in other countries where our service providers operate. We ensure appropriate safeguards are in place for international data transfers.</p>
    `,
  },
  {
    title: "Your Rights and Choices",
    content: `
      <h3 class="text-lg font-semibold mb-3">Access and Control</h3>
      <p class="mb-3">You have the right to:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Access and review your personal information</li>
        <li>Update or correct inaccurate information</li>
        <li>Request deletion of your account and data</li>
        <li>Export your data in a portable format</li>
        <li>Opt-out of marketing communications</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Mobile App Permissions</h3>
      <p class="mb-3">You can control app permissions through your device settings:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Location services for nearby property searches</li>
        <li>Camera access for property photos</li>
        <li>Push notifications for alerts and updates</li>
        <li>Photo library access for property documentation</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-3">Cookies and Tracking</h3>
      <p class="mb-3">You can manage cookies and tracking preferences through your browser settings or our privacy controls in the mobile app.</p>
    `,
  },
  {
    title: "Children's Privacy",
    content: `
      <p class="mb-3">Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child under 18, please contact us immediately.</p>
    `,
  },
  {
    title: "Third-Party Services",
    content: `
      <h3 class="text-lg font-semibold mb-3">External Links</h3>
      <p class="mb-3">Our website and mobile app may contain links to third-party websites and services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>
      
      <h3 class="text-lg font-semibold mb-3">Third-Party Integrations</h3>
      <p class="mb-3">We may integrate with third-party services for:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Payment processing and financial services</li>
        <li>Analytics and performance monitoring</li>
        <li>Social media sharing and authentication</li>
        <li>Maps and location services</li>
        <li>Customer support and communication tools</li>
      </ul>
    `,
  },
  {
    title: "Changes to This Policy",
    content: `
      <p class="mb-3">We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:</p>
      <ul class="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">
        <li>Posting the updated policy on our website</li>
        <li>Sending an email notification to registered users</li>
        <li>Displaying a notification in our mobile app</li>
        <li>Updating the "Last Updated" date at the top of this policy</li>
      </ul>
      <p class="mb-3">Your continued use of our services after any changes indicates your acceptance of the updated policy.</p>
    `,
  },
  {
    title: "Contact Us",
    content: `
      <p class="mb-3">If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
      <div class="space-y-2 text-gray-600 dark:text-gray-300">
        <p><strong>Email:</strong> privacy@vestanest.com</p>
        <p><strong>Phone:</strong> +233 20 123 4567</p>
        <p><strong>Address:</strong> Vesta Nest, Accra, Ghana</p>
        <p><strong>Data Protection Officer:</strong> dpo@vestanest.com</p>
      </div>
      <p class="mt-4">We will respond to your inquiry within 30 days of receipt.</p>
    `,
  },
];

export default function PrivacyPolicy() {
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
              Privacy Policy
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
            Vesta Nest &quot;we,&quot; &quot;our,&quot; or &quot;us&quot; is
            committed to protecting your privacy and ensuring the security of
            your personal information. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our website, mobile application, and related services.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            By using our services, you agree to the collection and use of
            information in accordance with this policy. If you do not agree with
            our policies and practices, please do not use our services.
          </p>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {policySections.map((section, index) => {
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
          <h3 className="text-lg font-semibold mb-2">
            Questions About Privacy?
          </h3>
          <p className="text-orange-100 mb-4">
            If you have any questions about this Privacy Policy or our data
            practices, please don&apos;t hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@vestanest.com"
              className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
            >
              Email Us
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
