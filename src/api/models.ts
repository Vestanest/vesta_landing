// Core shared models based on Postman collection

export interface ApiResponseMessage {
  message: string;
}

export interface UserModel {
  id: number | string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
}

export interface AuthLoginResponse {
  user: UserModel;
  token: string;
}

export interface PropertyModel {
  id: number;
  title: string;
  description: string;
  image: string;
  images: string | string[]; // Can be a JSON string or array of strings
  location: string;
  city: string;
  region: string;
  latitude: string;
  longitude: string;
  price: string;
  formatted_price: string;
  price_type: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqm: string;
  area_sqft: string;
  year_built: number;
  floors: number;
  parking_spaces: number;
  is_featured: boolean;
  status: string;
  views_count: number;
  rating: string;
  owner: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
  };
  agent: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
  };
  amenities: AmenityModel[];
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    properties: T[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      from: number;
      to: number;
    };
    filters?: unknown;
  };
}

export interface AmenityModel {
  id: number;
  name: string;
  [key: string]: unknown;
}

export interface PropertyViewModel {
  id: number;
  property_id: number;
  user_agent?: string;
  [key: string]: unknown;
}

export interface NewsletterPreferences {
  frequency?: string;
  property_types?: string[];
  locations?: string[];
  price_range?: [number, number];
  [key: string]: unknown;
}


export interface ReviewModel {
  id: number;
  property_id: number;
  rating: number;
  title?: string;
  comment?: string;
  [key: string]: unknown;
}

export interface AgentModel {
  id: number;
  name: string;
}

export interface FeaturedProperty {
  id: number;
  title: string;
  description: string;
  image: string;
  images: string | string[]; // Can be a JSON string or array of strings
  location: string;
  city: string;
  region: string;
  latitude: string;
  longitude: string;
  price: string;
  formatted_price: string;
  price_type: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqm: string;
  area_sqft: string;
  year_built: number;
  floors: number;
  parking_spaces: number;
  is_featured: boolean;
  status: string;
  views_count: number;
  rating: string;
  owner: {
    id: number;
    name: string;
    email: string;
  };
  agent: {
    id: number;
    name: string;
    email: string;
  };
  amenities: AmenityModel[];
  created_at: string;
  updated_at: string;
}

export interface FeaturedPropertiesResponse {
  success: boolean;
  data: {
    properties: FeaturedProperty[];
  };
}


