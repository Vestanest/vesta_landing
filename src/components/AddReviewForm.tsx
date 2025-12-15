
import React, { useState } from 'react';
import { CommunicationService } from '@/api/services/communication.service';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

interface AddReviewFormProps {
  propertyId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddReviewForm({ propertyId, onSuccess, onCancel }: AddReviewFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    title: '',
    comment: ''
  });

  // Hover state for star rating
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to leave a review.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await CommunicationService.reviewCreate({
        property_id: propertyId,
        rating,
        title: formData.title,
        comment: formData.comment
      });
      onSuccess();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl text-center border border-gray-100 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-300 mb-4">Please log in to leave a review.</p>
        <div className="flex justify-center gap-3">
            <a href="/auth/login" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">Log In</a>
            <button onClick={onCancel} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm animate-fade-in">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Write a Review</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
        <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              {star <= (hoverRating || rating) ? (
                <StarIcon className="w-8 h-8 text-yellow-400" />
              ) : (
                <StarIconOutline className="w-8 h-8 text-gray-300 dark:text-gray-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="Summary of your experience (e.g., 'Beautiful home, great location')"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Review</label>
        <textarea
          id="comment"
          rows={4}
          value={formData.comment}
          onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="Share details about the property..."
          required
        />
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 shadow-sm hover:shadow transition-all disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}
