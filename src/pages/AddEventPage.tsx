import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, BarChart3, Award, UtensilsCrossed } from 'lucide-react';

export default function AddEventPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    host: '',
    locationName: '',
    date: '',
    time: '',
    hasFood: false,
    requiresSignup: false,
    description: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Event submitted successfully! (Demo mode - not actually saved)');
    navigate('/');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Event</h1>
      <p className="text-gray-600 mb-8">
        Promote your event and reach ETH students
      </p>

      {/* Incentive Box */}
      <div className="card p-6 mb-8 bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Why List Your Event on Eventbite?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Reach</h3>
            </div>
            <p className="text-sm text-gray-700">
              Connect with thousands of ETH students looking for events
            </p>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-2">
              <BarChart3 className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Analytics</h3>
            </div>
            <p className="text-sm text-gray-700">
              Track views, RSVPs, and engagement with your event
            </p>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-2">
              <Award className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Reputation</h3>
            </div>
            <p className="text-sm text-gray-700">
              Build your organization's reputation with ratings and reviews
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-6">
        {/* Event Title */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Event Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="e.g., VIS Welcome Apéro"
          />
        </div>

        {/* Host Organization */}
        <div className="mb-6">
          <label
            htmlFor="host"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Host Organization *
          </label>
          <input
            type="text"
            id="host"
            name="host"
            required
            value={formData.host}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="e.g., VIS, D-CHAB, ETH AI Center"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          >
            <option value="">Select a category</option>
            <option value="Leftover Food">Leftover Food</option>
            <option value="Social">Social</option>
            <option value="Workshop">Workshop</option>
            <option value="Talk">Talk</option>
            <option value="Seminar">Seminar</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Career">Career</option>
            <option value="Festival">Festival</option>
            <option value="Open House">Open House</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label
            htmlFor="locationName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Location *
          </label>
          <input
            type="text"
            id="locationName"
            name="locationName"
            required
            value={formData.locationName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="e.g., ETH Main Building, Rämistrasse 101"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Time *
            </label>
            <input
              type="time"
              id="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Event Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="Describe your event, what to expect, who should attend, etc."
          />
        </div>

        {/* Food Checkbox */}
        <div className="mb-6 p-4 bg-accent-50 border-2 border-accent-200 rounded-lg">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="hasFood"
              name="hasFood"
              checked={formData.hasFood}
              onChange={handleChange}
              className="mt-1 h-5 w-5 text-accent-600 focus:ring-accent-500 border-gray-300 rounded"
            />
            <div className="ml-3">
              <label
                htmlFor="hasFood"
                className="font-semibold text-gray-900 flex items-center cursor-pointer"
              >
                <UtensilsCrossed className="h-5 w-5 mr-2 text-accent-600" />
                This event offers free food
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Events with free food get 3x more views!
              </p>
            </div>
          </div>
        </div>

        {/* Signup Required Checkbox */}
        <div className="mb-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="requiresSignup"
              name="requiresSignup"
              checked={formData.requiresSignup}
              onChange={handleChange}
              className="mt-1 h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <div className="ml-3">
              <label
                htmlFor="requiresSignup"
                className="font-semibold text-gray-900 cursor-pointer"
              >
                Signup required
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Check this if attendees need to register in advance
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Publish Event
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
