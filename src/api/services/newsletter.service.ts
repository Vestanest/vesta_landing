import { httpRequest } from "../http";
import { NewsletterPreferences } from "../models";

export const NewsletterService = {
  subscribe: (body: {
    email: string;
    first_name?: string;
    last_name?: string;
    preferences?: NewsletterPreferences;
  }) =>
    httpRequest<{ message: string }>("/newsletter/subscribe", {
      method: "POST",
      body,
    }),
  status: (email: string) =>
    httpRequest<Record<string, unknown>>("/newsletter/status", {
      method: "GET",
      query: { email },
    }),
  updatePreferences: (body: { email: string; preferences: NewsletterPreferences }) =>
    httpRequest<{ message: string }>("/newsletter/update-preferences", {
      method: "POST",
      body,
    }),
  unsubscribe: (email: string) =>
    httpRequest<{ message: string }>("/newsletter/unsubscribe", {
      method: "POST",
      body: { email },
    }),
};


