
import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { ReviewModel } from '@/api/models';

interface ReviewCardProps {
  review: ReviewModel;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Safe date formatting
  const dateStr = String(review.created_at || new Date().toISOString());
  const date = new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Handle user name safely (it might be nested differently based on API)
  // Casting to any to access potentially nested user properties not strictly typed in ReviewModel yet
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userName = (review as any).user?.name || (review as any).user?.first_name || 'Anonymous';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm w-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{userName}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon 
              key={star} 
              className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'}`} 
            />
          ))}
        </div>
      </div>
      
      {review.title && (
        <h5 className="font-medium text-gray-900 dark:text-white mb-2">{review.title}</h5>
      )}
      
      {review.comment && (
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {review.comment}
        </p>
      )}
    </div>
  );
}
