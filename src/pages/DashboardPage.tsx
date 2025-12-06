import { Eye, Users, Star, TrendingUp } from 'lucide-react';
import { mockEvents, mockOrganizerStats } from '../data/mockData';

export default function DashboardPage() {
  const myEvents = mockEvents.slice(0, 3);
  const stats = mockOrganizerStats;

  const totalViews = stats.reduce((sum, stat) => sum + stat.views, 0);
  const totalAttendees = stats.reduce((sum, stat) => sum + stat.attendees, 0);
  const avgRating = (
    stats.reduce((sum, stat) => sum + stat.rating, 0) / stats.length
  ).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Organizer Dashboard
        </h1>
        <p className="text-gray-600">
          Track your events' performance and engagement
        </p>
      </div>

      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Eye className="h-6 w-6 text-primary-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
          <p className="text-sm text-gray-600">Total Views</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Users className="h-6 w-6 text-accent-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalAttendees}</p>
          <p className="text-sm text-gray-600">Total RSVPs</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
          <p className="text-sm text-gray-600">Average Rating</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{myEvents.length}</p>
          <p className="text-sm text-gray-600">Active Events</p>
        </div>
      </div>

      {/* Events Table */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Events</h2>

        <div className="space-y-4">
          {myEvents.map((event) => {
            const eventStats = stats.find((s) => s.eventId === event.id);

            return (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  {/* Event Info */}
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {event.time.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="badge badge-info">{event.category}</span>
                      {event.hasFood && (
                        <span className="badge badge-accent">Free Food</span>
                      )}
                      {!event.requiresSignup && (
                        <span className="badge badge-success">No Signup</span>
                      )}
                    </div>
                  </div>

                  {/* Event Stats */}
                  {eventStats && (
                    <div className="grid grid-cols-3 gap-4 md:gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Eye className="h-4 w-4 text-gray-500 mr-1" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {eventStats.views}
                        </p>
                        <p className="text-xs text-gray-600">Views</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="h-4 w-4 text-gray-500 mr-1" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {eventStats.attendees}
                        </p>
                        <p className="text-xs text-gray-600">RSVPs</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          {eventStats.rating.toFixed(1)}
                        </p>
                        <p className="text-xs text-gray-600">
                          ({eventStats.ratingCount})
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Event Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button className="btn-secondary text-sm py-2">
                    Edit Event
                  </button>
                  <button className="text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    View Details
                  </button>
                  <button className="text-sm px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto">
                    Cancel Event
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Event CTA */}
        <div className="mt-6 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border-2 border-dashed border-primary-300 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Want to host another event?
          </h3>
          <p className="text-gray-600 mb-4">
            Create a new event listing and reach even more students!
          </p>
          <a
            href="/add-event"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Add New Event
          </a>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="card p-6 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Performance Insights
        </h2>
        <div className="space-y-4">
          <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
            <TrendingUp className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900">Great engagement!</p>
              <p className="text-sm text-green-700">
                Your events with free food are getting 3.2x more views than
                average
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Star className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900">Excellent ratings!</p>
              <p className="text-sm text-blue-700">
                Your average rating of {avgRating} is above the platform average
                of 4.2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
