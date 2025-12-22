"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import { useAuth } from "../../../contexts/AuthContext";
import { 
  ClockIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PhoneIcon,
  EnvelopeIcon,
  HomeIcon,
  StarIcon,
  ArrowLeftIcon,
  FunnelIcon,
  CalendarIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface ActivityItem {
  id: string;
  type: 'favorite' | 'search' | 'view' | 'inquiry' | 'contact' | 'review';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  metadata?: {
    property_id?: number;
    property_title?: string;
    search_query?: string;
    filters?: Record<string, unknown>;
    result_count?: number;
  };
}

export default function ActivityPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'favorite' | 'search' | 'view' | 'inquiry' | 'contact' | 'review'>('all');
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const loadActivities = useCallback(async () => {
    try {
      setLoading(true);
      
      // Mock data - replace with real API calls
      const mockActivities: ActivityItem[] = [
        {
          id: '1',
          type: 'favorite',
          title: 'Added to Favorites',
          description: 'Luxury Apartment in Accra',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          icon: HeartIcon,
          metadata: {
            property_id: 1,
            property_title: 'Luxury Apartment in Accra'
          }
        },
        {
          id: '2',
          type: 'search',
          title: 'Advanced Search',
          description: '3-bedroom apartments in Kumasi',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          icon: MagnifyingGlassIcon,
          metadata: {
            search_query: '3-bedroom apartments in Kumasi',
            result_count: 12
          }
        },
        {
          id: '3',
          type: 'view',
          title: 'Property Viewed',
          description: 'Modern House in Tema',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          icon: EyeIcon,
          metadata: {
            property_id: 3,
            property_title: 'Modern House in Tema'
          }
        },
        {
          id: '4',
          type: 'inquiry',
          title: 'Inquiry Sent',
          description: 'Contacted agent for Villa in Cape Coast',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          icon: PhoneIcon,
          metadata: {
            property_id: 4,
            property_title: 'Villa in Cape Coast'
          }
        },
        {
          id: '5',
          type: 'contact',
          title: 'Contact Form Submitted',
          description: 'General inquiry about property services',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          icon: EnvelopeIcon
        },
        {
          id: '6',
          type: 'review',
          title: 'Review Submitted',
          description: 'Rated and reviewed Luxury Apartment in Accra',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          icon: StarIcon,
          metadata: {
            property_id: 1,
            property_title: 'Luxury Apartment in Accra'
          }
        },
        {
          id: '7',
          type: 'search',
          title: 'Location Search',
          description: 'Properties in Accra',
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          icon: MagnifyingGlassIcon,
          metadata: {
            search_query: 'Properties in Accra',
            result_count: 45
          }
        },
        {
          id: '8',
          type: 'favorite',
          title: 'Added to Favorites',
          description: 'Cozy Studio in East Legon',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          icon: HeartIcon,
          metadata: {
            property_id: 8,
            property_title: 'Cozy Studio in East Legon'
          }
        }
      ];
      
      // Filter activities based on selected filters
      let filteredActivities = mockActivities;
      
      if (filter !== 'all') {
        filteredActivities = filteredActivities.filter(activity => activity.type === filter);
      }
      
      if (dateRange !== 'all') {
        const now = new Date();
        const filterDate = new Date();
        
        switch (dateRange) {
          case 'today':
            filterDate.setHours(0, 0, 0, 0);
            break;
          case 'week':
            filterDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            filterDate.setMonth(now.getMonth() - 1);
            break;
        }
        
        filteredActivities = filteredActivities.filter(activity => 
          new Date(activity.timestamp) >= filterDate
        );
      }
      
      setActivities(filteredActivities);
    } catch (error) {
      console.error('Failed to load activities:', error);
      setLoading(false);
    }
  }, [filter, dateRange]);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    loadActivities();
  }, [user, router, loadActivities]);



  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const getActivityIconColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'favorite': return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      case 'search': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'view': return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'inquiry': return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30';
      case 'contact': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
      case 'review': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getActivityTypeLabel = (type: ActivityItem['type']) => {
    switch (type) {
      case 'favorite': return 'Favorites';
      case 'search': return 'Searches';
      case 'view': return 'Views';
      case 'inquiry': return 'Inquiries';
      case 'contact': return 'Contacts';
      case 'review': return 'Reviews';
      default: return 'All';
    }
  };

  const clearActivity = async (type?: ActivityItem['type']) => {
    if (!confirm(`Are you sure you want to clear ${type ? getActivityTypeLabel(type) : 'all'} activity? This action cannot be undone.`)) {
      return;
    }
    
    try {
      // Call API to clear activity
      // await ActivityService.clearActivity(type);
      
      // Reload activities
      loadActivities();
    } catch (error) {
      console.error('Failed to clear activity:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="py-16">
              <ClockIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Please Sign In
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                You need to be signed in to view your activity history.
              </p>
              <Link
                href="/auth/login"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <Link
              href="/dashboard"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Activity History
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Track your property searches, views, and interactions
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activity Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-wrap gap-4">
                {/* Activity Type Filter */}
                <div className="flex items-center gap-2">
                  <FunnelIcon className="w-5 h-5 text-gray-500" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as ActivityItem['type'] | 'all')}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="all">All Activity</option>
                    <option value="favorite">Favorites</option>
                    <option value="search">Searches</option>
                    <option value="view">Views</option>
                    <option value="inquiry">Inquiries</option>
                    <option value="contact">Contacts</option>
                    <option value="review">Reviews</option>
                  </select>
                </div>

                {/* Date Range Filter */}
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value as 'all' | 'today' | 'week' | 'month')}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>

              {/* Clear Activity Button */}
              <button
                onClick={() => clearActivity()}
                className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm"
              >
                <TrashIcon className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </motion.div>

          {/* Activity List */}
          {loading ? (
            <div className="text-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 dark:text-gray-300">Loading your activity...</p>
            </div>
          ) : activities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <ClockIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No Activity Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {filter === 'all' 
                  ? "You haven't performed any activities yet. Start by browsing properties or searching for your dream home."
                  : `No ${getActivityTypeLabel(filter).toLowerCase()} found for the selected time period.`
                }
              </p>
              <Link
                href="/properties"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
              >
                Browse Properties
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getActivityIconColor(activity.type)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {activity.title}
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                            {formatTimeAgo(activity.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {activity.description}
                        </p>
                        
                        {/* Metadata */}
                        {activity.metadata && (
                          <div className="flex flex-wrap gap-2">
                            {activity.metadata.property_id && (
                              <Link
                                href={`/properties/${activity.metadata.property_id}`}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                              >
                                <HomeIcon className="w-4 h-4" />
                                View Property
                              </Link>
                            )}
                            
                            {activity.metadata.search_query && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                                <MagnifyingGlassIcon className="w-4 h-4" />
                                {activity.metadata.result_count} results
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
