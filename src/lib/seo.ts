import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  canonical?: string;
}

const defaultSEO = {
  title: 'VestaNest - Premium Real Estate in Ghana',
  description: 'Find your dream home in Ghana with VestaNest. Browse luxury apartments, houses, and properties in Accra, Kumasi, and other major cities. Expert real estate services.',
  keywords: [
    'real estate Ghana',
    'properties Ghana',
    'houses for sale Ghana',
    'apartments for rent Ghana',
    'luxury properties Ghana',
    'Accra real estate',
    'Kumasi properties',
    'property management Ghana',
    'real estate agent Ghana',
    'property investment Ghana'
  ],
  image: '/og-image.jpg',
  url: 'https://vestanest.com',
  type: 'website' as const,
  author: 'VestaNest',
};

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noIndex = false,
  noFollow = false,
  canonical,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | VestaNest` : defaultSEO.title;
  const fullDescription = description || defaultSEO.description;
  const fullKeywords = [...defaultSEO.keywords, ...keywords];
  const fullImage = image || defaultSEO.image;
  const fullUrl = url || defaultSEO.url;
  const fullCanonical = canonical || fullUrl;

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords.join(', '),
    authors: [{ name: author || defaultSEO.author }],
    creator: defaultSEO.author,
    publisher: defaultSEO.author,
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type === 'product' ? 'website' : type,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: 'VestaNest',
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: '@vestanest',
      site: '@vestanest',
    },
    alternates: {
      canonical: fullCanonical,
    },
    category: 'Real Estate',
  };

  // Add article-specific metadata
  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      section,
      tags,
    };
  }

  // Add product-specific metadata
  if (type === 'product') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'website',
    };
  }

  return metadata;
}

// Property-specific SEO metadata
export function generatePropertyMetadata(property: {
  id: number;
  title: string;
  description: string;
  location: string;
  price: string;
  price_type: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  image: string;
  city: string;
  region: string;
}) {
  const priceText = property.price_type === 'rent' 
    ? `GH¢${parseFloat(property.price).toLocaleString()}/month` 
    : `GH¢${parseFloat(property.price).toLocaleString()}`;

  const locationText = `${property.location}, ${property.city}, ${property.region}`;
  
  const title = `${property.title} - ${property.property_type} in ${property.city}`;
  const description = `${property.description} ${property.bedrooms} bed, ${property.bathrooms} bath ${property.property_type} in ${locationText}. ${priceText}. View details and contact agent.`;

  return generateMetadata({
    title,
    description,
    keywords: [
      property.property_type,
      `${property.bedrooms} bedroom`,
      `${property.bathrooms} bathroom`,
      property.city,
      property.region,
      property.price_type,
      'real estate',
      'property for sale',
      'property for rent',
    ],
    image: property.image,
    url: `https://vestanest.com/properties/${property.id}`,
    type: 'product',
  });
}

// Page-specific SEO metadata generators
export const seoMetadata = {
  home: () => generateMetadata({
    title: 'Premium Real Estate in Ghana | VestaNest',
    description: 'Discover luxury properties in Ghana with VestaNest. Expert real estate services in Accra, Kumasi, and major cities. Find your dream home today.',
    keywords: ['luxury real estate Ghana', 'premium properties Ghana', 'real estate services Ghana'],
  }),

  properties: () => generateMetadata({
    title: 'Properties for Sale & Rent in Ghana',
    description: 'Browse thousands of properties for sale and rent in Ghana. Apartments, houses, and commercial properties in Accra, Kumasi, and more.',
    keywords: ['properties Ghana', 'houses for sale Ghana', 'apartments for rent Ghana'],
  }),

  about: () => generateMetadata({
    title: 'About VestaNest - Leading Real Estate in Ghana',
    description: 'Learn about VestaNest, Ghana\'s premier real estate platform. Our mission, team, and commitment to finding your perfect property.',
    keywords: ['about VestaNest', 'real estate company Ghana', 'property experts Ghana'],
  }),

  contact: () => generateMetadata({
    title: 'Contact VestaNest - Real Estate Experts',
    description: 'Get in touch with VestaNest real estate experts. We\'re here to help you find your dream property in Ghana.',
    keywords: ['contact VestaNest', 'real estate agent contact', 'property consultation Ghana'],
  }),


  dashboard: () => generateMetadata({
    title: 'Dashboard - My Account',
    description: 'Access your VestaNest dashboard. Manage your account, view activity, and track your property searches.',
    keywords: ['user dashboard', 'account management', 'property tracking'],
    noIndex: true, // Private user data
  }),

  login: () => generateMetadata({
    title: 'Sign In - VestaNest Account',
    description: 'Sign in to your VestaNest account to access your dashboard and personalized property recommendations.',
    keywords: ['sign in', 'login', 'VestaNest account'],
    noIndex: true, // Login pages shouldn't be indexed
  }),

  signup: () => generateMetadata({
    title: 'Create Account - Join VestaNest',
    description: 'Create your VestaNest account to start your property search journey. Get personalized recommendations.',
    keywords: ['create account', 'sign up', 'join VestaNest'],
    noIndex: true, // Signup pages shouldn't be indexed
  }),
};

// Structured data generators
export function generatePropertyStructuredData(property: {
  id: number;
  title: string;
  description: string;
  location: string;
  price: string;
  price_type: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  image: string;
  city: string;
  region: string;
  agent?: {
    name: string;
    email: string;
    phone: string;
  };
}) {


  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `https://vestanest.com/properties/${property.id}`,
    image: property.image,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.location,
      addressLocality: property.city,
      addressRegion: property.region,
      addressCountry: 'GH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 0, // You'll need to add actual coordinates
      longitude: 0,
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'GHS',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area_sqm,
      unitCode: 'MTK',
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    propertyType: property.property_type,
    ...(property.agent && {
      realEstateAgent: {
        '@type': 'RealEstateAgent',
        name: property.agent.name,
        email: property.agent.email,
        telephone: property.agent.phone,
      },
    }),
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VestaNest',
    url: 'https://vestanest.com',
    logo: 'https://vestanest.com/logo.png',
    description: 'Premium real estate platform in Ghana, connecting buyers and sellers with expert property services.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GH',
      addressLocality: 'Accra',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+233-20-123-4567',
      contactType: 'customer service',
      email: 'info@vestanest.com',
    },
    sameAs: [
      'https://facebook.com/vestanest',
      'https://twitter.com/vestanest',
      'https://instagram.com/vestanest',
      'https://linkedin.com/company/vestanest',
    ],
  };
}

export function generateBreadcrumbStructuredData(items: Array<{
  name: string;
  url: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
