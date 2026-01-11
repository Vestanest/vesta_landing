import { httpRequest } from "../http";
import { PaginatedResponse, PropertyViewModel } from "../models";

export const PropertyViewsService = {
  record: (body: { property_id: number; user_agent?: string }) =>
    httpRequest<PropertyViewModel>("/property-views", {
      method: "POST",
      body,
    }),
  forProperty: (propertyId: number | string, params?: { per_page?: number }) =>
    httpRequest<PaginatedResponse<PropertyViewModel>>(
      `/property-views/property/${propertyId}`,
      { method: "GET", query: params ? { ...params } : undefined }
    ),
  myViews: () =>
    httpRequest<PropertyViewModel[]>("/property-views/my-views", {
      method: "GET",
      auth: true,
    }),
  statistics: () =>
    httpRequest<Record<string, unknown>>(
      "/property-views/statistics",
      { method: "GET" }
    ),
};


