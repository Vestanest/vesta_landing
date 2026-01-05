"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import {
  BuildingOfficeIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  StarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const teamMembers = [
  {
    name: "Kwame Asante",
    role: "CEO & Founder",
    image: "/api/placeholder/300/300",
    bio: "With over 15 years in real estate, Kwame leads Vesta Nest with vision and passion for transforming Ghana's property market.",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Ama Osei",
    role: "Head of Operations",
    image: "/api/placeholder/300/300",
    bio: "Ama ensures seamless operations and exceptional customer service across all our platforms and services.",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Kofi Mensah",
    role: "Technology Director",
    image: "/api/placeholder/300/300",
    bio: "Kofi drives our digital innovation, creating cutting-edge solutions for modern property management and search.",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Efua Addo",
    role: "Marketing Director",
    image: "/api/placeholder/300/300",
    bio: "Efua crafts compelling stories and strategies that connect Vesta Nest with our community and clients.",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
];

const values = [
  {
    icon: HeartIcon,
    title: "Customer First",
    description:
      "Every decision we make is centered around providing exceptional value to our customers.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Trust & Transparency",
    description:
      "We build lasting relationships through honest communication and transparent processes.",
  },
  {
    icon: StarIcon,
    title: "Excellence",
    description:
      "We strive for excellence in every aspect of our service, from property selection to customer support.",
  },
  {
    icon: GlobeAltIcon,
    title: "Innovation",
    description:
      "We continuously innovate to provide cutting-edge solutions for modern property needs.",
  },
];

const stats = [
  { number: "5000+", label: "Happy Families" },
  { number: "1000+", label: "Properties Listed" },
  { number: "50+", label: "Cities Covered" },
  { number: "98%", label: "Customer Satisfaction" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About{" "}
              <span className="text-orange-600 dark:text-orange-400">
                Vesta Nest
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We&apos;re revolutionizing the way people find and manage
              properties in Ghana, combining technology with personalized
              service to create exceptional experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-justify">
                Founded in 2020, Vesta Nest emerged from a simple yet powerful
                vision: to make finding the perfect home in Ghana as seamless
                and enjoyable as possible. What started as a small team of
                passionate real estate professionals has grown into a
                comprehensive platform serving thousands of families across the
                country.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-justify">
                We recognized that the traditional property search process was
                often frustrating and time-consuming. Our founders experienced
                this firsthand when searching for their own homes, which
                inspired them to create a solution that would transform the
                entire experience.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-justify">
                Today, Vesta Nest stands as a testament to innovation, customer
                service, and the belief that everyone deserves to find their
                perfect home with ease and confidence.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
                <BuildingOfficeIcon className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Building Dreams</h3>
                <p className="text-orange-100 text-justify">
                  Every property we list represents someone&apos;s dream home.
                  We take this responsibility seriously and work tirelessly to
                  ensure every client finds their perfect match.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission & Vision
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-justify">
                To provide innovative, reliable, and personalized real estate
                solutions that empower individuals and families to find their
                perfect homes, while contributing to the growth and development
                of Ghana&apos;s property market.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-600 dark:to-gray-700 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-justify">
                To become Ghana&apos;s most trusted and innovative real estate
                platform, setting new standards for customer service, technology
                integration, and market transparency in the African property
                sector.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core values guide everything we do and shape the way we
              serve our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 mb-4 inline-block">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Impact
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The passionate individuals behind Vesta Nest&apos;s success story.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <UserGroupIcon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-orange-600 dark:text-orange-400 font-medium text-center mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                  {member.bio}
                </p>
                <div className="flex justify-center gap-4 mt-4">
                    {member.socials?.twitter && (
                        <a href={member.socials.twitter} className="text-gray-400 hover:text-orange-500 transition-colors">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    )}
                    {member.socials?.linkedin && (
                         <a href={member.socials.linkedin} className="text-gray-400 hover:text-orange-500 transition-colors">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                            </svg>
                        </a>
                    )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Join thousands of satisfied families who found their perfect home
              with Vesta Nest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/"
                  className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 inline-block"
                >
                  Browse Properties
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-200 inline-block"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
