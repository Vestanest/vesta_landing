"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch, AdvancedSearchFilters } from "../contexts/SearchContext";
import { useAuth } from "../contexts/AuthContext";
import { 
  ClockIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  MapPinIcon,
  HomeIcon,
  StarIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";

interface SearchHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSearch: (query: string, filters: Partial<AdvancedSearchFilters> | undefined) => void;
}

export default function SearchHistory({ isOpen, onClose, onSelectSearch }: SearchHistoryProps) {
  const { user } = useAuth();
  const { 
    searchHistory, 
    loadingHistory, 
    clearSearchHistory 
  } = useSearch();
  
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearHistory = async () => {
    try {
      await clearSearchHistory();
      setShowClearConfirm(false);
    } catch (error) {
      console.error("Failed to clear search history:", error);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const getSearchIcon = (filters: Partial<AdvancedSearchFilters> | undefined) => {
    if (filters?.searchTerm) return MagnifyingGlassIcon;
    if (filters?.location && filters.location !== "all") return MapPinIcon;
    if (filters?.propertyType && filters.propertyType !== "all") return HomeIcon;
    if ((filters?.amenities?.length ?? 0) > 0) return StarIcon;
    return FunnelIcon;
  };

  if (!user) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Login Required
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Sign in to view your search history and save searches.
                </p>
                <button
                  onClick={onClose}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <ClockIcon className="w-6 h-6 text-orange-500" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Search History
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {searchHistory.length} recent searches
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {searchHistory.length > 0 && (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Clear all history"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {loadingHistory ? (
                <div className="text-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-600 dark:text-gray-300">Loading search history...</p>
                </div>
              ) : searchHistory.length === 0 ? (
                <div className="text-center py-12">
                  <ClockIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No Search History
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your recent searches will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchHistory.map((item, index) => {
                    const Icon = getSearchIcon(item.filters);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          onSelectSearch(item.query, item.filters);
                          onClose();
                        }}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors group"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                            <Icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                              {item.query || "Advanced Search"}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                              {item.result_count} results
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              {formatDate(item.timestamp)}
                            </span>
                            
                            {item.filters && (
                              <div className="flex items-center gap-2">
                                {item.filters.propertyType && item.filters.propertyType !== "all" && (
                                  <span className="flex items-center gap-1">
                                    <HomeIcon className="w-4 h-4" />
                                    {item.filters.propertyType}
                                  </span>
                                )}
                                {item.filters.location && item.filters.location !== "all" && (
                                  <span className="flex items-center gap-1">
                                    <MapPinIcon className="w-4 h-4" />
                                    {item.filters.location}
                                  </span>
                                )}
                                {item.filters.amenities && item.filters.amenities.length > 0 && (
                                  <span className="flex items-center gap-1">
                                    <StarIcon className="w-4 h-4" />
                                    {item.filters.amenities.length} amenities
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Clear Confirmation Modal */}
            <AnimatePresence>
              {showClearConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-sm w-full"
                  >
                    <div className="text-center">
                      <TrashIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Clear Search History?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        This will permanently delete all your search history. This action cannot be undone.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowClearConfirm(false)}
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleClearHistory}
                          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
