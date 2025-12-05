"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { SearchService, SearchSuggestion, SearchHistoryItem, SavedSearch } from "../api/services/search.service";
import { toApiError } from "../api/errors";
import { useAuth } from "./AuthContext";

export interface AdvancedSearchFilters {
  searchTerm: string;
  propertyType: string;
  priceRange: [number, number];
  priceType: string;
  location: string;
  bedrooms: [number, number];
  bathrooms: [number, number];
  areaRange: [number, number];
  amenities: string[];
  propertyStatus: string;
  featured: boolean | null;
  minRating: number;
  sortBy: string;
  sortOrder: string;
}

interface SearchContextType {
  // Current search state
  currentFilters: AdvancedSearchFilters;
  searchHistory: SearchHistoryItem[];
  savedSearches: SavedSearch[];
  suggestions: SearchSuggestion[];
  popularSearches: string[];
  trendingLocations: string[];
  
  // Loading states
  loading: boolean;
  loadingHistory: boolean;
  loadingSaved: boolean;
  loadingSuggestions: boolean;
  
  // Error state
  error: string | null;
  
  // Actions
  updateFilters: (filters: Partial<AdvancedSearchFilters>) => void;
  resetFilters: () => void;
  getSuggestions: (query: string) => Promise<void>;
  saveSearchToHistory: (query: string, filters: AdvancedSearchFilters, resultCount: number) => Promise<void>;
  clearSearchHistory: () => Promise<void>;
  saveSearch: (name: string, query: string, filters: AdvancedSearchFilters, notificationFrequency?: string) => Promise<void>;
  deleteSavedSearch: (id: number) => Promise<void>;
  loadSearchHistory: () => Promise<void>;
  loadSavedSearches: () => Promise<void>;
  loadPopularSearches: () => Promise<void>;
  loadTrendingLocations: () => Promise<void>;
  
  // Utility functions
  getSearchSummary: () => string;
  hasActiveFilters: () => boolean;
  getFilterCount: () => number;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

const defaultFilters: AdvancedSearchFilters = {
  searchTerm: "",
  propertyType: "all",
  priceRange: [0, 10000000],
  priceType: "all",
  location: "all",
  bedrooms: [0, 10],
  bathrooms: [0, 10],
  areaRange: [0, 1000],
  amenities: [],
  propertyStatus: "all",
  featured: null,
  minRating: 0,
  sortBy: "created_at_desc",
  sortOrder: "desc",
};

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [currentFilters, setCurrentFilters] = useState<AdvancedSearchFilters>(defaultFilters);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [trendingLocations, setTrendingLocations] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();


  // Load popular searches
  const loadPopularSearches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await SearchService.getPopularSearches(10);
      setPopularSearches(response.data?.searches || []);
    } catch (e) {
      const apiErr = toApiError(e);
      // Don't set error for mock data failures, just use fallback
      console.warn("Using fallback popular searches:", apiErr.message);
      setPopularSearches([
        "3 bedroom apartment",
        "house for rent", 
        "luxury villa",
        "commercial property",
        "land for sale"
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load trending locations
  const loadTrendingLocations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await SearchService.getTrendingLocations(10);
      setTrendingLocations(response.data?.locations || []);
    } catch (e) {
      const apiErr = toApiError(e);
      // Don't set error for mock data failures, just use fallback
      console.warn("Using fallback trending locations:", apiErr.message);
      setTrendingLocations([
        "Accra",
        "Kumasi",
        "Tamale", 
        "Cape Coast",
        "Tema"
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get search suggestions
  const getSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      setLoadingSuggestions(true);
      setError(null);
      const response = await SearchService.getSuggestions(query, 10);
      setSuggestions(response.data?.suggestions || []);
    } catch (e) {
      const apiErr = toApiError(e);
      setError(apiErr.message);
      console.error("Failed to get suggestions:", apiErr);
    } finally {
      setLoadingSuggestions(false);
    }
  }, []);

  // Load search history
  const loadSearchHistory = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoadingHistory(true);
      setError(null);
      const response = await SearchService.getSearchHistory({ per_page: 20 });
      setSearchHistory(response.data?.history || []);
    } catch (e) {
      const apiErr = toApiError(e);
      setError(apiErr.message);
      console.error("Failed to load search history:", apiErr);
    } finally {
      setLoadingHistory(false);
    }
  }, [user]);

  // Load saved searches
  const loadSavedSearches = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoadingSaved(true);
      setError(null);
      const response = await SearchService.getSavedSearches({ per_page: 50 });
      setSavedSearches(response.data?.saved_searches || []);
    } catch (e) {
      const apiErr = toApiError(e);
      setError(apiErr.message);
      console.error("Failed to load saved searches:", apiErr);
    } finally {
      setLoadingSaved(false);
    }
  }, [user]);

  // Save search to history
  const saveSearchToHistory = useCallback(async (query: string, filters: AdvancedSearchFilters, resultCount: number) => {
    if (!user) return;
    
    try {
      setError(null);
      await SearchService.saveSearchHistory(query, filters, resultCount);
      // Reload history to get the latest entry
      await loadSearchHistory();
    } catch (e) {
      const apiErr = toApiError(e);
      setError(apiErr.message);
      console.error("Failed to save search to history:", apiErr);
    }
  }, [user, loadSearchHistory]);

  // Clear search history
  const clearSearchHistory = useCallback(async () => {
    if (!user) return;
    
    try {
      setError(null);
      await SearchService.clearSearchHistory();
      setSearchHistory([]);
    } catch (e) {
      const apiErr = toApiError(e);
      setError(apiErr.message);
      console.error("Failed to clear search history:", apiErr);
    }
  }, [user]);

  // Save a search for alerts
  const saveSearch = useCallback(async (name: string, query: string, filters: AdvancedSearchFilters, notificationFrequency?: string) => {
    if (!user) throw new Error("User must be logged in");
    
    try {
      setError(null);
      const response = await SearchService.saveSearch(name, query, filters, notificationFrequency);
      if (response.data?.saved_search) {
        setSavedSearches(prev => [...prev, response.data.saved_search]);
      }
    } catch (e) {
      const apiErr = toApiError(e);
      setError(apiErr.message);
      throw apiErr;
    }
  }, [user]);

  // Delete saved search
  const deleteSavedSearch = useCallback(async (id: number) => {
    if (!user) return;
    
    try {
      setError(null);
      await SearchService.deleteSavedSearch(id);
      setSavedSearches(prev => prev.filter(search => search.id !== id));
    } catch (e) {
      const apiErr = toApiError(e);
      setError(apiErr.message);
      console.error("Failed to delete saved search:", apiErr);
    }
  }, [user]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<AdvancedSearchFilters>) => {
    setCurrentFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setCurrentFilters(defaultFilters);
  }, []);

  // Get search summary
  const getSearchSummary = useCallback((): string => {
    const parts: string[] = [];
    
    if (currentFilters.searchTerm) {
      parts.push(`"${currentFilters.searchTerm}"`);
    }
    
    if (currentFilters.propertyType !== "all") {
      parts.push(currentFilters.propertyType);
    }
    
    if (currentFilters.priceType !== "all") {
      parts.push(`for ${currentFilters.priceType}`);
    }
    
    if (currentFilters.location !== "all") {
      parts.push(`in ${currentFilters.location}`);
    }
    
    if (currentFilters.amenities.length > 0) {
      parts.push(`with ${currentFilters.amenities.length} amenities`);
    }
    
    return parts.length > 0 ? parts.join(" ") : "All properties";
  }, [currentFilters]);

  // Check if there are active filters
  const hasActiveFilters = useCallback((): boolean => {
    return (
      currentFilters.searchTerm !== "" ||
      currentFilters.propertyType !== "all" ||
      currentFilters.priceType !== "all" ||
      currentFilters.location !== "all" ||
      currentFilters.bedrooms[0] > 0 ||
      currentFilters.bedrooms[1] < 10 ||
      currentFilters.bathrooms[0] > 0 ||
      currentFilters.bathrooms[1] < 10 ||
      currentFilters.areaRange[0] > 0 ||
      currentFilters.areaRange[1] < 1000 ||
      currentFilters.amenities.length > 0 ||
      currentFilters.propertyStatus !== "all" ||
      currentFilters.featured !== null ||
      currentFilters.minRating > 0
    );
  }, [currentFilters]);

  // Get filter count
  const getFilterCount = useCallback((): number => {
    let count = 0;
    
    if (currentFilters.searchTerm) count++;
    if (currentFilters.propertyType !== "all") count++;
    if (currentFilters.priceType !== "all") count++;
    if (currentFilters.location !== "all") count++;
    if (currentFilters.bedrooms[0] > 0 || currentFilters.bedrooms[1] < 10) count++;
    if (currentFilters.bathrooms[0] > 0 || currentFilters.bathrooms[1] < 10) count++;
    if (currentFilters.areaRange[0] > 0 || currentFilters.areaRange[1] < 1000) count++;
    if (currentFilters.amenities.length > 0) count++;
    if (currentFilters.propertyStatus !== "all") count++;
    if (currentFilters.featured !== null) count++;
    if (currentFilters.minRating > 0) count++;
    
    return count;
  }, [currentFilters]);

  // Load initial data
  useEffect(() => {
    loadPopularSearches();
    loadTrendingLocations();
    
    if (user) {
      loadSearchHistory();
      loadSavedSearches();
    }
  }, [user, loadPopularSearches, loadTrendingLocations, loadSearchHistory, loadSavedSearches]);

  const value: SearchContextType = {
    currentFilters,
    searchHistory,
    savedSearches,
    suggestions,
    popularSearches,
    trendingLocations,
    loading,
    loadingHistory,
    loadingSaved,
    loadingSuggestions,
    error,
    updateFilters,
    resetFilters,
    getSuggestions,
    saveSearchToHistory,
    clearSearchHistory,
    saveSearch,
    deleteSavedSearch,
    loadSearchHistory,
    loadSavedSearches,
    loadPopularSearches,
    loadTrendingLocations,
    getSearchSummary,
    hasActiveFilters,
    getFilterCount,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
