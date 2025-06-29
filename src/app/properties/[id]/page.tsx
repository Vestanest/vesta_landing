"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import ScheduleModal from "../../../components/ScheduleModal";
import {
  MapPinIcon,
  HomeIcon,
  BuildingOfficeIcon,
  StarIcon,
  HeartIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  priceType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  image: string;
  featured: boolean;
  rating: number;
  views: number;
  description: string;
  detailedDescription: string;
  amenities: string[];
  images: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
}

// Property data (same as main properties page)
const properties: Property[] = [
  {
    id: 1,
    title: "Modern 3-Bedroom Apartment",
    location: "East Legon, Accra",
    price: 250000,
    priceType: "sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: "apartment",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center",
    featured: true,
    rating: 4.8,
    views: 1247,
    description:
      "Beautiful modern apartment with stunning city views, fully furnished with premium amenities.",
    detailedDescription:
      "This stunning 3-bedroom apartment offers the perfect blend of luxury and comfort. Located in the prestigious East Legon area, this property features modern architecture with premium finishes throughout. The open-plan living area flows seamlessly into a fully equipped kitchen with granite countertops and stainless steel appliances. Each bedroom is generously sized with built-in wardrobes, while the master suite includes an en-suite bathroom with a walk-in shower. The apartment also features a private balcony with panoramic city views, perfect for morning coffee or evening relaxation. Building amenities include 24/7 security, a swimming pool, gym, and dedicated parking spaces.",
    amenities: [
      "Air Conditioning",
      "Balcony",
      "Built-in Wardrobes",
      "Swimming Pool",
      "Gym",
      "24/7 Security",
      "Parking Space",
      "Modern Kitchen",
      "En-suite Master Bedroom",
      "City Views",
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center",
    ],
    agent: {
      name: "Kwame Asante",
      phone: "+233 20 123 4567",
      email: "kwame@vestanest.com",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    },
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    location: "Trasacco Valley, Accra",
    price: 850000,
    priceType: "sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    type: "villa",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop&crop=center",
    featured: true,
    rating: 4.9,
    views: 2156,
    description:
      "Exclusive luxury villa featuring a private pool, garden, and state-of-the-art security system.",
    detailedDescription:
      "This magnificent 5-bedroom luxury villa is the epitome of sophisticated living. Set in the exclusive Trasacco Valley, this property offers unparalleled privacy and security. The grand entrance leads to a spacious living area with high ceilings and floor-to-ceiling windows that flood the space with natural light. The gourmet kitchen features premium appliances and a large center island perfect for entertaining. Each of the five bedrooms is a sanctuary of comfort, with the master suite boasting a private balcony, walk-in closet, and luxurious en-suite bathroom with a freestanding bathtub. The outdoor area includes a private swimming pool, landscaped gardens, and a covered terrace ideal for al fresco dining. Additional features include a home theater, wine cellar, and smart home automation system.",
    amenities: [
      "Private Swimming Pool",
      "Landscaped Gardens",
      "Home Theater",
      "Wine Cellar",
      "Smart Home Automation",
      "Security System",
      "Staff Quarters",
      "Gourmet Kitchen",
      "Master Suite with Balcony",
      "Covered Terrace",
    ],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&crop=center",
    ],
    agent: {
      name: "Abdul Basit Yahaya",
      phone: "+233 24 987 6543",
      email: "ama@vestanest.com",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    },
  },
  {
    id: 3,
    title: "Family Home",
    location: "Takoradi, Ghana",
    price: 520000,
    priceType: "sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    type: "house",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop&crop=center",
    featured: true,
    rating: 4.9,
    views: 1890,
    description:
      "Perfect for families, close to schools and parks with a beautiful garden.",
    detailedDescription:
      "This spacious 5-bedroom family home is ideally located in a quiet, family-friendly neighborhood in Takoradi. The property features a large, well-maintained garden perfect for children to play and for family gatherings. The open-plan living area includes a modern kitchen with granite countertops and a cozy family room with a fireplace. Each bedroom is generously sized with built-in wardrobes, and the master suite includes an en-suite bathroom and a private balcony. The property is conveniently located near excellent schools, parks, and shopping centers, making it perfect for families. Additional features include a double garage, security system, and a beautiful outdoor entertainment area.",
    amenities: [
      "Large Garden",
      "Double Garage",
      "Security System",
      "Fireplace",
      "Modern Kitchen",
      "Built-in Wardrobes",
      "Master Suite with Balcony",
      "Outdoor Entertainment Area",
      "Near Schools",
      "Near Parks",
    ],
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&crop=center",
    ],
    agent: {
      name: "Sarah Mensah",
      phone: "+233 26 456 7890",
      email: "sarah@vestanest.com",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    },
  },
  // Add more properties with detailed information...
];

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const propertyId = parseInt(params.id as string);
    const foundProperty = properties.find((p) => p.id === propertyId);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      router.push("/properties");
    }
  }, [params.id, router]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log("Contact form submitted:", contactForm);
    setShowContactForm(false);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const formatPrice = (price: number, type: string) => {
    if (type === "rent") {
      return `GH¢${price.toLocaleString()}/month`;
    }
    return `GH¢${price.toLocaleString()}`;
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Loading property details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      {/* Back Button */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-200 mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Properties
          </motion.button>
        </div>
      </div>

      {/* Property Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px]">
              <img
                src={property.images[selectedImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Featured Badge */}
              {property.featured && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <HeartIcon
                  className={`w-6 h-6 ${
                    isFavorite ? "text-red-500 fill-red-500" : "text-white"
                  }`}
                />
              </button>

              {/* Price */}
              <div className="absolute bottom-4 left-4">
                <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {formatPrice(property.price, property.priceType)}
                  </p>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-4 overflow-x-auto p-2">
                {property.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-orange-500" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {property.title}
                  </h1>

                  <div className="flex items-center gap-2 mb-4">
                    <MapPinIcon className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {property.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-1">
                      <HomeIcon className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {property.bedrooms} Bedrooms
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BuildingOfficeIcon className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {property.bathrooms} Bathrooms
                      </span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {property.area} m²
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {property.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {property.detailedDescription}
                  </p>
                </div>

                {/* Contact Agent */}
                <div className="lg:w-80">
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Contact Agent
                    </h3>

                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={property.agent.image}
                        alt={property.agent.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {property.agent.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Vesta Nest Agent
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <PhoneIcon className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {property.agent.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <EnvelopeIcon className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {property.agent.email}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowContactForm(true)}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <PhoneIcon className="w-5 h-5" />
                        Contact Agent
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowScheduleModal(true)}
                        className="w-full border border-orange-500 text-orange-500 py-3 px-4 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <CalendarIcon className="w-5 h-5" />
                        Schedule Viewing
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Amenities & Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Agent
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Tell us about your interest in this property..."
                  />
                </div>
                <div className="flex gap-3">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
                  >
                    Send Message
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowContactForm(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        propertyTitle={property?.title}
        propertyLocation={property?.location}
      />

      <Footer />
    </div>
  );
}
