import { httpRequest } from "../http";
import { ReviewModel, PaginatedResponse } from "../models";

export const CommunicationService = {
  contactMessageCreate: (body: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) =>
    httpRequest<{ message: string }>("/contact-messages", {
      method: "POST",
      body,
    }),
  contactMessageList: (params?: { per_page?: number }) =>
    httpRequest<PaginatedResponse<unknown>>("/contact-messages", {
      method: "GET",
      query: params ? { ...params } : undefined,
    }),
  inquiryCreate: (body: {
    property_id: number;
    name: string;
    email: string;
    message: string;
    inquiry_type: string;
  }) =>
    httpRequest<{ message: string }>("/inquiries", {
      method: "POST",
      body,
    }),
  inquiryList: (params?: { per_page?: number }) =>
    httpRequest<PaginatedResponse<unknown>>("/inquiries", {
      method: "GET",
      query: params ? { ...params } : undefined,
    }),
  reviewCreate: (body: {
    property_id: number;
    rating: number;
    title?: string;
    comment?: string;
  }) =>
    httpRequest<ReviewModel>("/reviews", {
      method: "POST",
      auth: true,
      body,
    }),
  reviewsForProperty: (propertyId: number | string, params?: { per_page?: number }) =>
    httpRequest<PaginatedResponse<ReviewModel>>(`/reviews/property/${propertyId}`, {
      method: "GET",
      query: params ? { ...params } : undefined,
    }),
  scheduleViewingCreate: (body: {
    property_id: number;
    full_name: string;
    email: string;
    phone_number: string;
    preferred_date: string;
    preferred_time: string;
    notes?: string;
  }) =>
    httpRequest<{ message: string }>("/schedule-viewings", {
      method: "POST",
      body,
    }),
  contactAgentCreate: (body: {
    property_id: number;
    full_name: string;
    email: string;
    phone_number: string;
    message: string;
  }) =>
    httpRequest<{ message: string }>("/contact-agents", {
      method: "POST",
      body,
    }),
};


