"use client";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import WebAppShowcase from "../components/WebAppShowcase";
import ContactCTA from "../components/ContactCTA";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Stats from "../components/Stats";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Hero />
        <Stats />
        <FeaturedProperties />
        <About />
        <WhyChooseUs />
        <WebAppShowcase />
        <ContactCTA />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
