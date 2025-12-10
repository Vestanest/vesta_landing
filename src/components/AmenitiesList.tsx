"use client";
import { motion } from "framer-motion";
import {
  WifiIcon,
  TruckIcon,
  HomeIcon,
  ShieldCheckIcon,
  SunIcon,
  CloudIcon,
  TvIcon,
  ComputerDesktopIcon,
  PhoneIcon,
  LockClosedIcon,
  FireIcon,
  HeartIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ShoppingBagIcon,
  BeakerIcon,
  CogIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface Amenity {
  id: number;
  name: string;
}

interface AmenitiesListProps {
  amenities: Amenity[];
  className?: string;
}

// Map amenity names to icons
const getAmenityIcon = (name: string) => {
  const normalizedName = name.toLowerCase().trim();
  
  const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
    // Internet & Technology
    wifi: WifiIcon,
    internet: WifiIcon,
    "high-speed internet": WifiIcon,
    "free wifi": WifiIcon,
    computer: ComputerDesktopIcon,
    "computer access": ComputerDesktopIcon,
    tv: TvIcon,
    television: TvIcon,
    cable: TvIcon,
    "cable tv": TvIcon,
    
    // Transportation
    parking: TruckIcon,
    "free parking": TruckIcon,
    "parking space": TruckIcon,
    garage: TruckIcon,
    "covered parking": TruckIcon,
    
    // Security
    security: ShieldCheckIcon,
    "24/7 security": ShieldCheckIcon,
    "security system": ShieldCheckIcon,
    "gated community": LockClosedIcon,
    "access control": LockClosedIcon,
    cctv: ShieldCheckIcon,
    surveillance: ShieldCheckIcon,
    
    // Climate Control
    air: CloudIcon,
    "air conditioning": CloudIcon,
    ac: CloudIcon,
    heating: FireIcon,
    "central heating": FireIcon,
    fan: SunIcon,
    ventilation: SunIcon,
    
    // Utilities
    electricity: CogIcon,
    water: BeakerIcon,
    "hot water": BeakerIcon,
    generator: CogIcon,
    "backup generator": CogIcon,
    "power backup": CogIcon,
    
    // Facilities
    gym: HeartIcon,
    fitness: HeartIcon,
    "fitness center": HeartIcon,
    pool: SunIcon,
    swimming: SunIcon,
    "swimming pool": SunIcon,
    garden: SunIcon,
    balcony: SunIcon,
    terrace: SunIcon,
    "outdoor space": SunIcon,
    
    // Location & Access
    location: MapPinIcon,
    "prime location": MapPinIcon,
    "city center": MapPinIcon,
    "near transport": MapPinIcon,
    "public transport": MapPinIcon,
    accessibility: UserGroupIcon,
    "wheelchair accessible": UserGroupIcon,
    
    // Services
    maintenance: CogIcon,
    "24/7 maintenance": ClockIcon,
    "property management": BuildingOfficeIcon,
    concierge: UserGroupIcon,
    "front desk": UserGroupIcon,
    reception: UserGroupIcon,
    
    // Education & Business
    school: AcademicCapIcon,
    "near school": AcademicCapIcon,
    "good schools": AcademicCapIcon,
    university: AcademicCapIcon,
    "near university": AcademicCapIcon,
    office: BuildingOfficeIcon,
    "business center": BuildingOfficeIcon,
    "meeting room": BuildingOfficeIcon,
    
    // Shopping & Entertainment
    shopping: ShoppingBagIcon,
    "near shopping": ShoppingBagIcon,
    mall: ShoppingBagIcon,
    "shopping center": ShoppingBagIcon,
    restaurant: ShoppingBagIcon,
    "near restaurants": ShoppingBagIcon,
    
    // Safety & Health
    fire: FireIcon,
    "fire safety": FireIcon,
    "fire extinguisher": FireIcon,
    "smoke detector": FireIcon,
    "first aid": ExclamationTriangleIcon,
    "emergency exit": ExclamationTriangleIcon,
  };

  // Try exact match first
  if (iconMap[normalizedName]) {
    return iconMap[normalizedName];
  }

  // Try partial matches
  for (const [key, icon] of Object.entries(iconMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return icon;
    }
  }

  // Default icon
  return HomeIcon;
};

export default function AmenitiesList({ amenities, className = "" }: AmenitiesListProps) {
  if (!amenities || amenities.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <HomeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">No amenities listed</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => {
          const IconComponent = getAmenityIcon(amenity.name);
          
          return (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex-shrink-0">
                <IconComponent className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {amenity.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
