
import React, { useState } from 'react';
import { CommunicationService } from '@/api/services/communication.service';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ScheduleViewingFormProps {
  propertyId: number;
}

export default function ScheduleViewingForm({ propertyId }: ScheduleViewingFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    preferred_date: '',
    preferred_time: '',
    notes: ''
  });

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await CommunicationService.scheduleViewingCreate({
        property_id: propertyId,
        ...formData
      });
      setSuccess(true);
      setFormData({ 
        full_name: '', email: '', phone_number: '', 
        preferred_date: '', preferred_time: '', notes: '' 
      });
    } catch (err: unknown) {
      console.error(err);
      setError('Failed to schedule viewing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <CalendarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Viewing Scheduled!</h3>
        <p className="text-green-600 dark:text-green-400 mb-4">We've received your request and will confirm the specific time with you shortly.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="text-sm font-medium text-green-700 dark:text-green-300 hover:underline"
        >
          Schedule another viewing
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Schedule a Tour</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="full_name_viewing" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            id="full_name_viewing"
            name="full_name"
            required
            value={formData.full_name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email_viewing" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              id="email_viewing"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone_number_viewing" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <input
              type="tel"
              id="phone_number_viewing"
              name="phone_number"
              required
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Date</label>
            <div className="relative">
              <input
                type="date"
                id="preferred_date"
                name="preferred_date"
                required
                min={today}
                value={formData.preferred_date}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Time</label>
            <div className="relative">
              <select
                id="preferred_time"
                name="preferred_time"
                required
                value={formData.preferred_time}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
              >
                <option value="">Select time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <ClockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Any special requests?"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gray-900 hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Scheduling...' : 'Request Viewing'}
        </button>
      </form>
    </div>
  );
}
