import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Users,
  Star,
  ArrowLeft,
  UtensilsCrossed,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { useState } from 'react';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isGoing, setIsGoing] = useState(false);

  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Event not found</p>
        <button onClick={() => navigate('/')} className="btn-primary mt-4">
          Go back to events
        </button>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to events
      </button>

      {/* Event Image */}
      {event.imageUrl && (
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {event.hasFood && (
            <div className="absolute top-4 right-4">
              <span className="badge bg-accent-500 text-white font-bold text-lg px-4 py-2 shadow-xl flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5" />
                Free Food Available!
              </span>
            </div>
          )}
        </div>
      )}

      {/* Event Title & Host */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {event.title}
        </h1>
        <p className="text-lg text-gray-600">Hosted by {event.host}</p>
      </div>

      {/* Key Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Time Card */}
        <div className="card p-4">
          <div className="flex items-center text-gray-600 mb-2">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-semibold">When</span>
          </div>
          <p className="text-gray-900">{formatTime(event.time)}</p>
        </div>

        {/* Location Card */}
        <div className="card p-4">
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="font-semibold">Where</span>
          </div>
          <Link
            to="/map"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            {event.location.name}
          </Link>
        </div>

        {/* Attendees Card */}
        <div className="card p-4">
          <div className="flex items-center text-gray-600 mb-2">
            <Users className="h-5 w-5 mr-2" />
            <span className="font-semibold">Attendees</span>
          </div>
          <p className="text-gray-900 font-semibold text-xl">
            {event.attendeeCount} going
          </p>
          <p className="text-sm text-gray-500">Join them!</p>
        </div>
      </div>

      {/* Food Rating Section */}
      {event.hasFood && (
        <div className="card p-6 mb-8 border-2 border-accent-200 bg-accent-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Food Quality Rating
              </h2>
              <p className="text-sm text-gray-600">
                Based on {event.reviews?.length || 0} reviews
              </p>
            </div>
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500 fill-current" />
              <span className="text-4xl font-bold text-gray-900 ml-2">
                {event.foodRating.toFixed(1)}
              </span>
              <span className="text-gray-500 ml-1">/5</span>
            </div>
          </div>

          {/* Star Rating Display */}
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= event.foodRating
                    ? 'text-yellow-500 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Reviews */}
          {event.reviews && event.reviews.length > 0 && (
            <div className="mt-6 space-y-4">
              {event.reviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">
                      {review.userName}
                    </span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {review.date.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Event Details */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
        <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>

        <div className="space-y-3">
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 w-32">Category:</span>
            <span className="badge badge-info">{event.category}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 w-32">Signup:</span>
            {event.requiresSignup ? (
              <span className="flex items-center text-orange-600">
                <XCircle className="h-5 w-5 mr-1" />
                Registration required
              </span>
            ) : (
              <span className="flex items-center text-green-600">
                <CheckCircle2 className="h-5 w-5 mr-1" />
                No signup needed, just show up!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* RSVP Button - Fixed at bottom on mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:relative md:border-0 md:p-0">
        <button
          onClick={() => setIsGoing(!isGoing)}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all shadow-lg ${
            isGoing
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {isGoing ? (
            <span className="flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 mr-2" />
              You're Going!
            </span>
          ) : (
            "I'm Going"
          )}
        </button>
        {isGoing && (
          <p className="text-center text-sm text-gray-600 mt-2">
            Event added to your calendar
          </p>
        )}
      </div>
    </div>
  );
}
