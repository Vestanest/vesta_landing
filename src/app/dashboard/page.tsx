"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { useSearch } from "../../contexts/SearchContext";
import { 
  UserIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PhoneIcon,
  CalendarIcon,
  CogIcon,
  HomeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface DashboardStats {
  totalSearches: number;
  totalViews: number;
  totalInquiries: number;
  recentActivity: Array<{
    id: string;
    type: 'search' | 'view' | 'inquiry';
    title: string;
    description: string;
    timestamp: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { } = useSearch();
  
  const [stats, setStats] = useState<DashboardStats>({
    totalSearches: 0,
    totalViews: 0,
    totalInquiries: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Load dashboard stats
    loadDashboardStats();
  }, [user, router]);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Mock data for other stats - replace with real API calls
      const mockStats: DashboardStats = {
        totalSearches: 12,
        totalViews: 45,
        totalInquiries: 8,
        recentActivity: [
          {
            id: '2',
            type: 'search',
            title: 'Advanced Search',
            description: '3-bedroom apartments in Kumasi',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            icon: MagnifyingGlassIcon
          },
          {
            id: '3',
            type: 'view',
            title: 'Property Viewed',
            description: 'Modern House in Tema',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            icon: EyeIcon
          },
          {
            id: '4',
            type: 'inquiry',
            title: 'Inquiry Sent',
            description: 'Contacted agent for Villa in Cape Coast',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            icon: PhoneIcon
          }
        ]
      };
      
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const getActivityIconColor = (type: string) => {
    switch (type) {
      case 'search': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'view': return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'inquiry': return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="py-16">
              <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Please Sign In
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                You need to be signed in to access your dashboard.
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
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome back,{" "}
              <span className="text-orange-600 dark:text-orange-400">
                {user.firstName}
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Manage your account, track your property searches, and stay updated with your real estate journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <MagnifyingGlassIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stats.totalSearches}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Searches
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <EyeIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stats.totalViews}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Views
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <PhoneIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stats.totalInquiries}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Inquiries
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Recent Activity
                    </h2>
                    <Link
                      href="/dashboard/activity"
                      className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                    >
                      View All
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {stats.recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityIconColor(activity.type)}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {activity.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {activity.description}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formatTimeAgo(activity.timestamp)}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Quick Actions
                  </h2>
                  
                  <div className="space-y-3">
                    <Link
                      href="/properties"
                      className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                    >
                      <HomeIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Browse Properties
                      </span>
                    </Link>
                    
                    
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <UserIcon className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Edit Profile
                      </span>
                    </Link>
                  </div>
                </motion.div>

                {/* Account Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Account Status
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Email Verified
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Profile Complete
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Phone Not Verified
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium"
                    >
                      <CogIcon className="w-4 h-4" />
                      Account Settings
                    </Link>
                  </div>
                </motion.div>

                {/* Profile Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Profile Summary
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <UserIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    {user.phone && (
                      <div className="flex items-center gap-3">
                        <PhoneIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {user.phone}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Member since {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
