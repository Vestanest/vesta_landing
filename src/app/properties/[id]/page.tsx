"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { PropertiesService } from "@/api/services/properties.service";
import { PropertyModel } from "@/api/models";
import { mediaUrl } from "@/api/config";
import AmenitiesList from "@/components/AmenitiesList";
import ContactModal from "@/components/ContactModal";
import ScheduleModal from "@/components/ScheduleModal";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import { useToast } from "@/contexts/ToastContext";
import {
  MapPinIcon,
  ArrowLeftIcon,
  HomeIcon,
  CheckCircleIcon,
  Square2StackIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  ShareIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [property, setProperty] = useState<PropertyModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  
  // Modal states
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const { showSuccess, showError } = useToast();

  const handleShare = async () => {
    if (!property) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property in ${property.city}: ${property.title}`,
          url: window.location.href,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
             console.error("Error sharing:", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showSuccess("Link copied to clipboard!");
      } catch {
        showError("Failed to copy link.");
      }
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        if (!id) return;
        const rawData = await PropertiesService.show(id);
        // Handle wrapped response if service fix hasn't propagated or API structure varies
        // @ts-expect-error - Runtime check for data wrapper
        const data = rawData?.success && rawData?.data?.property ? rawData.data.property : rawData;
        
        setProperty(data);
        setActiveImage(data.image);
      } catch (err) {
        console.error("Failed to fetch property:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Oops! Something went wrong.</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{error || "Property not found"}</p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Go Back
        </button>
      </div>
    );
  }

  // Parse images if they are JSON string or get active image
  const images = Array.isArray(property.images) 
    ? property.images 
    : typeof property.images === 'string' && property.images.startsWith('[')
      ? JSON.parse(property.images)
      : [property.image];

  // Include main image if not in list
  const allImages = [property.image, ...images.filter((img: string) => img !== property.image)];
  const uniqueImages = Array.from(new Set(allImages)) as string[];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
            <button
            onClick={() => router.push("/properties")}
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Properties
            </button>
            <div className="flex gap-2">
                 <button className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow">
                    <HeartIcon className="w-5 h-5" />
                 </button>
                 <button onClick={handleShare} className="p-2 text-gray-400 hover:text-primary-500 transition-colors bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow">
                    <ShareIcon className="w-5 h-5" />
                 </button>
            </div>
        </div>

        {/* Gallery Section - Full width main image with thumbnails below */}
        <div className="space-y-4 mb-8">
            <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 bg-gray-200 dark:bg-gray-800 h-[400px] md:h-[500px] lg:h-[600px]"
            >
            <Image
                src={mediaUrl(activeImage || property.image)}
                alt={property.title}
                fill
                className="object-cover"
                priority
            />
             <div className="absolute top-4 left-4 flex gap-2">
                {property.is_featured && (
                     <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-amber-500 shadow-sm">
                     Featured
                 </span>
                )}
            </div>
            </motion.div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-1">
                {uniqueImages.map((img: string, idx: number) => (
                <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-32 h-24 md:w-40 md:h-28 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all transform hover:scale-105 ${
                    activeImage === img ? "border-primary-500 ring-2 ring-primary-500/20 shadow-md" : "border-transparent hover:border-gray-300 dark:hover:border-gray-600 opacity-70 hover:opacity-100"
                    }`}
                >
                    <Image
                    src={mediaUrl(img)}
                    alt={`View ${idx + 1}`}
                    fill
                    className="object-cover"
                    />
                </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Property Details Header */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">{property.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPinIcon className="w-5 h-5 flex-shrink-0 text-primary-500" />
                    <span className="text-lg">{property.location}, {property.city}</span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                    <p className="text-3xl md:text-4xl font-extrabold text-orange-600 dark:text-orange-500">
                        {property.formatted_price || property.price}
                    </p>
                    <div className="flex items-center gap-1 mt-2 justify-start md:justify-end">
                        <StarIcon className="w-5 h-5 text-yellow-500" />
                        <span className="font-bold text-gray-900 dark:text-white">{property.rating || "New"}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">({property.views_count || 0} views)</span>
                    </div>
                </div>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-8 border-t border-b border-gray-100 dark:border-gray-700">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-2xl group hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                    <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Bedrooms</span>
                    <div className="flex items-center gap-2">
                        <HomeIcon className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary-500 transition-colors" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{property.bedrooms}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-2xl group hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                    <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Bathrooms</span>
                    <div className="flex items-center gap-2">
                        <CheckCircleIcon className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary-500 transition-colors" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{property.bathrooms}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-2xl group hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                    <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Area</span>
                    <div className="flex items-center gap-2">
                        <Square2StackIcon className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary-500 transition-colors" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{property.area_sqm}<span className="text-sm font-normal text-gray-500 ml-1">m²</span></span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-2xl group hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                    <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Type</span>
                    <div className="flex items-center gap-2">
                        <CurrencyDollarIcon className="w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-primary-500 transition-colors" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white capitalize">{property.property_type}</span>
                    </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    Description
                </h3>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    <p>{property.description}</p>
                </div>
              </div>

               {/* Amenities */}
               <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Amenities</h3>
                <AmenitiesList amenities={property.amenities} />
              </div>

              {/* Reviews Section */}
              <ReviewsSection propertyId={property.id} />

            </div>
          </div>

          {/* Sidebar - Right Column - Buttons & Actions */}
          <div className="space-y-6">
            
             {/* Action Card */}
             <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 sticky top-24">
                 
                 {/* Agent Snippet */}
                 <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-100 to-amber-100 dark:from-primary-900/50 dark:to-amber-900/50 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-xl shadow-inner">
                        {(property.agent?.name || property.owner?.name || "A").charAt(0)}
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{property.agent?.name || property.owner?.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Listing Agent</p>
                        {(property.agent?.email || property.owner?.email) && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{property.agent?.email || property.owner?.email}</p>
                        )}
                    </div>
                 </div>

                 <div className="space-y-3">
                     <button 
                        onClick={() => setScheduleModalOpen(true)}
                        className="w-full py-4 px-6 bg-gray-900 hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                     >
                         <CalendarDaysIcon className="w-5 h-5" />
                         Request a Tour
                     </button>
                     
                     <button 
                        onClick={() => setContactModalOpen(true)}
                        className="w-full py-4 px-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 text-gray-900 dark:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                     >
                         <EnvelopeIcon className="w-5 h-5" />
                         Contact Agent
                     </button>

                     <button className="w-full py-3 px-6 text-primary-600 dark:text-primary-400 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                        <PhoneIcon className="w-5 h-5" />
                        {property.agent?.phone || property.owner?.phone || "Call Agent"}
                     </button>
                 </div>
                 
                 <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-mono">
                        Ref: VN-{property.id}
                    </p>
                 </div>
             </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ContactModal 
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        propertyId={property.id}
        propertyTitle={property.title}
        agentName={property.agent?.name || property.owner?.name}
        agentEmail={property.agent?.email || property.owner?.email || undefined}
        agentPhone={property.agent?.phone || property.owner?.phone || undefined}
      />

      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        propertyId={property.id}
        propertyTitle={property.title}
        propertyLocation={property.location}
      />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
