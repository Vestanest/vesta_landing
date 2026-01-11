import { httpRequest } from "../http";
import { AmenityModel, PaginatedResponse } from "../models";

export const AmenitiesService = {
  list: (params?: { per_page?: number }) =>
    httpRequest<PaginatedResponse<AmenityModel>>("/amenities", {
      method: "GET",
      query: params ? { ...params } : undefined,
    }),
  popular: (limit?: number) =>
    httpRequest<AmenityModel[]>("/amenities/popular", {
      method: "GET",
      query: limit ? { limit } : undefined,
    }),
  show: (id: number | string) =>
    httpRequest<AmenityModel>(`/amenities/${id}`, {
      method: "GET",
    }),
};


