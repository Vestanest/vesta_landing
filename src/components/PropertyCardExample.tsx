import PropertyCard, { Property } from "./PropertyCard";
import {
  BuildingOffice2Icon,
  SwatchIcon,
  Square3Stack3DIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

// Example of how to use the PropertyCard component
export default function PropertyCardExample() {
  // Example property with custom features
  const customProperty: Property = {
    title: "Luxury Penthouse",
    description:
      "Exclusive penthouse with panoramic city views and premium amenities.",
    location: "Accra, Ghana",
    rating: 4.9,
    price: "750,000",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.1,
    features: [
      {
        name: "Bedrooms",
        value: "3",
        icon: BuildingOffice2Icon,
      },
      {
        name: "Bathrooms",
        value: "3",
        icon: SwatchIcon,
      },
      {
        name: "Area",
        value: "2,800 sq ft",
        icon: Square3Stack3DIcon,
      },
      {
        name: "Gym",
        value: "Private",
        icon: FireIcon,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          PropertyCard Component Example
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PropertyCard property={customProperty} />

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
            <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              {`import PropertyCard, { Property } from "./PropertyCard";

const property: Property = {
  title: "Property Title",
  description: "Description",
  location: "Location",
  rating: 4.5,
  price: "250,000",
  image: "image-url",
  gradient: "from-blue-500 to-purple-500",
  features: [
    {
      name: "Feature",
      value: "Value",
      icon: IconComponent,
      color: "bg-color-500"
    }
  ]
};

<PropertyCard property={property} />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
