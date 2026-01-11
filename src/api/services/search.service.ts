import { AdvancedSearchFilters } from "../models";

export interface SearchSuggestion {
  id: string;
  type: "location" | "property" | "amenity" | "keyword";
  text: string;
  description?: string;
  count?: number;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  filters: Partial<AdvancedSearchFilters>;
  timestamp: string;
  result_count: number;
}

export interface SavedSearch {
  id: number;
  name: string;
  query: string;
  filters: Partial<AdvancedSearchFilters>;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  notification_frequency?: "daily" | "weekly" | "monthly";
}

export interface SearchSuggestionsResponse {
  success: boolean;
  data: {
    suggestions: SearchSuggestion[];
    popular_searches: string[];
    trending_locations: string[];
  };
}

export interface SearchHistoryResponse {
  success: boolean;
  data: {
    history: SearchHistoryItem[];
    pagination?: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
}

export interface SavedSearchesResponse {
  success: boolean;
  data: {
    saved_searches: SavedSearch[];
    pagination?: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
}

export const SearchService = {
  // Get search suggestions based on query (mock data until API is implemented)
  getSuggestions: async (query: string, limit: number = 10) => {
    // Mock data for now - replace with actual API call when endpoint is available
    const mockSuggestions = [
      { id: "1", type: "location" as const, text: "Accra", description: "Greater Accra Region", count: 45 },
      { id: "2", type: "location" as const, text: "Kumasi", description: "Ashanti Region", count: 32 },
      { id: "3", type: "property" as const, text: "3 bedroom apartment", description: "Residential", count: 28 },
      { id: "4", type: "property" as const, text: "house for rent", description: "Residential", count: 25 },
      { id: "5", type: "amenity" as const, text: "swimming pool", description: "Amenity", count: 18 },
      { id: "6", type: "amenity" as const, text: "parking", description: "Amenity", count: 22 },
      { id: "7", type: "keyword" as const, text: "luxury", description: "Property type", count: 15 },
      { id: "8", type: "keyword" as const, text: "furnished", description: "Property feature", count: 12 }
    ];
    
    // Filter suggestions based on query
    const filtered = mockSuggestions.filter(s => 
      s.text.toLowerCase().includes(query.toLowerCase()) ||
      s.description?.toLowerCase().includes(query.toLowerCase())
    );
    
    return Promise.resolve({
      success: true,
      data: {
        suggestions: filtered.slice(0, limit),
        popular_searches: ["3 bedroom apartment", "house for rent", "luxury villa"],
        trending_locations: ["Accra", "Kumasi", "Tamale"]
      }
    });
  },

  // Get popular searches (mock data until API is implemented)
  getPopularSearches: async (limit: number = 10) => {
    // Mock data for now - replace with actual API call when endpoint is available
    const mockSearches = [
      "3 bedroom apartment",
      "house for rent",
      "luxury villa",
      "commercial property",
      "land for sale",
      "studio apartment",
      "penthouse",
      "townhouse",
      "office space",
      "warehouse"
    ];
    
    return Promise.resolve({
      success: true,
      data: { searches: mockSearches.slice(0, limit) }
    });
  },

  // Get trending locations (mock data until API is implemented)
  getTrendingLocations: async (limit: number = 10) => {
    // Mock data for now - replace with actual API call when endpoint is available
    const mockLocations = [
      "Accra",
      "Kumasi", 
      "Tamale",
      "Cape Coast",
      "Tema",
      "Takoradi",
      "Sunyani",
      "Ho",
      "Koforidua",
      "Techiman"
    ];
    
    return Promise.resolve({
      success: true,
      data: { locations: mockLocations.slice(0, limit) }
    });
  },

  // Save search to history (mock implementation until API is available)
  saveSearchHistory: async (query: string, filters: Partial<AdvancedSearchFilters>, resultCount: number) => {
    // Mock implementation - save to localStorage for now
    try {
      const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const newItem = {
        id: Date.now().toString(),
        query,
        filters,
        timestamp: new Date().toISOString(),
        result_count: resultCount
      };
      history.unshift(newItem);
      // Keep only last 50 searches
      const limitedHistory = history.slice(0, 50);
      localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
      return Promise.resolve({ success: true, message: "Search saved to history" });
    } catch {
      return Promise.resolve({ success: false, message: "Failed to save search history" });
    }
  },

  // Get user's search history (mock implementation until API is available)
  getSearchHistory: async (params?: { per_page?: number; page?: number }) => {
    try {
      const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const perPage = params?.per_page || 10;
      const page = params?.page || 1;
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      
      return Promise.resolve({
        success: true,
        data: {
          history: history.slice(startIndex, endIndex),
          pagination: {
            current_page: page,
            last_page: Math.ceil(history.length / perPage),
            per_page: perPage,
            total: history.length
          }
        }
      });
    } catch {
      return Promise.resolve({
        success: true,
        data: { history: [], pagination: { current_page: 1, last_page: 1, per_page: 10, total: 0 } }
      });
    }
  },

  // Clear search history (mock implementation until API is available)
  clearSearchHistory: async () => {
    try {
      localStorage.removeItem('searchHistory');
      return Promise.resolve({ success: true, message: "Search history cleared" });
    } catch {
      return Promise.resolve({ success: false, message: "Failed to clear search history" });
    }
  },

  // Save a search for alerts (mock implementation until API is available)
  saveSearch: async (name: string, query: string, filters: Partial<AdvancedSearchFilters>, notificationFrequency?: string) => {
    try {
      const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
      const newSearch: SavedSearch = {
        id: Date.now(),
        name,
        query,
        filters,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true,
        notification_frequency: notificationFrequency as SavedSearch["notification_frequency"]
      };
      savedSearches.push(newSearch);
      localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
      return Promise.resolve({ success: true, data: { saved_search: newSearch } });
    } catch {
      return Promise.resolve({ success: false, data: { saved_search: null as unknown as SavedSearch } });
    }
  },

  // Get user's saved searches (mock implementation until API is available)
  getSavedSearches: async (params?: { per_page?: number; page?: number }) => {
    try {
      const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
      const perPage = params?.per_page || 10;
      const page = params?.page || 1;
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      
      return Promise.resolve({
        success: true,
        data: {
          saved_searches: savedSearches.slice(startIndex, endIndex),
          pagination: {
            current_page: page,
            last_page: Math.ceil(savedSearches.length / perPage),
            per_page: perPage,
            total: savedSearches.length
          }
        }
      });
    } catch {
      return Promise.resolve({
        success: true,
        data: { saved_searches: [], pagination: { current_page: 1, last_page: 1, per_page: 10, total: 0 } }
      });
    }
  },

  // Update saved search (mock implementation until API is available)
  updateSavedSearch: async (id: number, updates: Partial<SavedSearch>) => {
    try {
      const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
      const index = savedSearches.findIndex((s: SavedSearch) => s.id === id);
      if (index !== -1) {
        savedSearches[index] = { ...savedSearches[index], ...updates, updated_at: new Date().toISOString() };
        localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
        return Promise.resolve({ success: true, data: { saved_search: savedSearches[index] } });
      }
      return Promise.resolve({ success: false, data: { saved_search: null as unknown as SavedSearch } });
    } catch {
      return Promise.resolve({ success: false, data: { saved_search: null as unknown as SavedSearch } });
    }
  },

  // Delete saved search (mock implementation until API is available)
  deleteSavedSearch: async (id: number) => {
    try {
      const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
      const filtered = savedSearches.filter((s: SavedSearch) => s.id !== id);
      localStorage.setItem('savedSearches', JSON.stringify(filtered));
      return Promise.resolve({ success: true, message: "Saved search deleted" });
    } catch {
      return Promise.resolve({ success: false, message: "Failed to delete saved search" });
    }
  },

  // Get search analytics (mock implementation until API is available)
  getSearchAnalytics: async () => {
    // Mock analytics data
    const mockAnalytics = {
      total_searches: 1250,
      popular_queries: [
        { query: "3 bedroom apartment", count: 145 },
        { query: "house for rent", count: 132 },
        { query: "luxury villa", count: 98 },
        { query: "commercial property", count: 87 },
        { query: "land for sale", count: 76 }
      ],
      popular_locations: [
        { location: "Accra", count: 234 },
        { location: "Kumasi", count: 187 },
        { location: "Tamale", count: 145 },
        { location: "Cape Coast", count: 98 },
        { location: "Tema", count: 87 }
      ],
      search_trends: [
        { date: "2024-01-01", count: 45 },
        { date: "2024-01-02", count: 52 },
        { date: "2024-01-03", count: 48 },
        { date: "2024-01-04", count: 61 },
        { date: "2024-01-05", count: 55 }
      ]
    };
    
    return Promise.resolve({
      success: true,
      data: mockAnalytics
    });
  },
};
