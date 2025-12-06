import { useState, useMemo, useEffect } from 'react';
import { Filter } from 'lucide-react';
import EventCard from '../components/EventCard';
import LeaderboardWidget from '../components/LeaderboardWidget';
import { mockEvents, mockLeaderboardUsers } from '../data/mockData';
import { getCustomEvents } from '../utils/eventStorage';
import type { FilterType, Event } from '../types';

const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All Events' },
  { id: 'leftover-food', label: 'Leftover Food' },
  { id: 'faculty', label: 'Faculty Events' },
  { id: 'no-signup', label: 'No Signup' },
  { id: 'nearby', label: 'Nearby' },
  { id: 'top-rated', label: 'Top Rated' },
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [customEvents, setCustomEvents] = useState<Event[]>([]);

  // Load custom events from localStorage on mount
  useEffect(() => {
    setCustomEvents(getCustomEvents());
  }, []);

  const filteredEvents = useMemo(() => {
    // Combine mock events with custom events
    let events = [...mockEvents, ...customEvents];

    switch (activeFilter) {
      case 'leftover-food':
        events = events.filter((e) => e.category === 'Leftover Food');
        break;
      case 'faculty':
        events = events.filter(
          (e) =>
            e.host.includes('D-') ||
            e.host.includes('Department') ||
            e.host.includes('Faculty')
        );
        break;
      case 'no-signup':
        events = events.filter((e) => !e.requiresSignup);
        break;
      case 'nearby':
        events = events.filter((e) => {
          const ethMainLat = 47.3769;
          const ethMainLng = 8.5417;
          const distance = Math.sqrt(
            Math.pow(e.location.lat - ethMainLat, 2) +
              Math.pow(e.location.lng - ethMainLng, 2)
          );
          return distance < 0.01;
        });
        break;
      case 'top-rated':
        events = events.filter((e) => e.hasFood && e.foodRating >= 4.5);
        break;
    }

    return events.sort((a, b) => a.time.getTime() - b.time.getTime());
  }, [activeFilter, customEvents]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Find Free Food at ETH
        </h1>
        <p className="text-lg text-gray-600">
          Discover events with free food across campus
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Filter className="h-5 w-5 text-gray-600 mr-2" />
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Quick Filters
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-600 hover:text-primary-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard - Horizontal */}
      <div className="mb-6">
        <LeaderboardWidget users={mockLeaderboardUsers} />
      </div>

      {/* Event Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}{' '}
          found
        </p>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found with this filter</p>
          <button
            onClick={() => setActiveFilter('all')}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
