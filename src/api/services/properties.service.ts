import { httpRequest } from "../http";
import { PaginatedResponse, PropertyModel, FeaturedPropertiesResponse, FeaturedProperty } from "../models";

export interface PropertiesListParams {
  page?: number;
  per_page?: number;
  sort_by?: string;
  property_type?: string;
  price_type?: string;
  location?: string;
  city?: string;
  region?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  search?: string;
}

export const PropertiesService = {
  list: async (params?: PropertiesListParams): Promise<{ properties: PropertyModel[]; pagination: { current_page: number; last_page: number; per_page: number; total: number; from: number; to: number } }> => {
    const res = await httpRequest<PaginatedResponse<PropertyModel>>(
      "/properties",
      { method: "GET", query: params as Record<string, string | number> | undefined }
    );
    return {
      properties: res.data.properties,
      pagination: res.data.pagination
    };
  },
  show: async (id: number | string): Promise<PropertyModel> => {
    const res = await httpRequest<{ success: boolean; data: { property: PropertyModel } }>(
      `/properties/${id}`,
      { method: "GET" }
    );
    return res.data.property;
  },
  featured: async (limit?: number): Promise<FeaturedProperty[]> => {
    const res = await httpRequest<FeaturedPropertiesResponse>(
      "/properties/featured",
      { method: "GET", query: limit ? { limit } : undefined }
    );
    return res.data.properties;
  },
  statistics: () =>
    httpRequest<Record<string, unknown>>(
      "/properties/statistics",
      { method: "GET" }
    ),
};


