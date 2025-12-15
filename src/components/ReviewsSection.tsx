
import React, { useState, useEffect, useCallback } from 'react';
import { CommunicationService } from '@/api/services/communication.service';
import { ReviewModel } from '@/api/models';
import ReviewCard from './ReviewCard';
import ReviewModal from './ReviewModal';
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';

interface ReviewsSectionProps {
  propertyId: number;
}

export default function ReviewsSection({ propertyId }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await CommunicationService.reviewsForProperty(propertyId);
      // API returns 'reviews' array, but TypeScript interface expects 'properties'
      // We cast to any to bypass this mismatch for now, or we should update the interface
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = res.data as any;
      if (res.success && data && (data.reviews || data.properties)) {
        setReviews(data.reviews || data.properties);
      }
    } catch (err) {
      // It's possible there are no reviews yet, or an error occurred
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleReviewAdded = () => {
    setShowAddForm(false);
    fetchReviews();
  };

  return (
    <div className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            Reviews
            {!loading && reviews.length > 0 && (
                <span className="text-sm font-normal px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {reviews.length}
                </span>
            )}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            See what others are saying about this property.
          </p>
        </div>
        
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <PlusIcon className="w-5 h-5" />
            Write a Review
          </button>
        )}
      </div>

      <ReviewModal 
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        propertyId={propertyId}
        onSuccess={handleReviewAdded}
      />

      {loading ? (
        <div className="flex justify-center py-12">
            <ArrowPathIcon className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center border border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-2">No reviews yet.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Be the first to share your experience with this property!</p>
          {!showAddForm && (
            <button 
                onClick={() => setShowAddForm(true)}
                className="mt-4 text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
            >
                Write a Review
            </button>
          )}
        </div>
      )}
    </div>
  );
}
