import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Star, Clock, UtensilsCrossed } from 'lucide-react';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const getUrgencyBadge = (eventTime: Date) => {
  const now = new Date();
  const diffInMinutes = (eventTime.getTime() - now.getTime()) / (1000 * 60);

  if (diffInMinutes < 0) {
    return null;
  } else if (diffInMinutes < 30) {
    return (
      <span className="badge bg-red-100 text-red-800 font-semibold">
        Happening Now!
      </span>
    );
  } else if (diffInMinutes < 60) {
    return (
      <span className="badge bg-orange-100 text-orange-800 font-semibold">
        In {Math.round(diffInMinutes)} min
      </span>
    );
  } else if (diffInMinutes < 180) {
    return (
      <span className="badge badge-warning">
        In {Math.round(diffInMinutes / 60)}h
      </span>
    );
  }
  return null;
};

const formatTime = (date: Date) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (isToday) {
    return `Today at ${timeStr}`;
  } else if (isTomorrow) {
    return `Tomorrow at ${timeStr}`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
};

export default function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();
  const urgencyBadge = getUrgencyBadge(event.time);

  return (
    <div
      onClick={() => navigate(`/event/${event.id}`)}
      className="card cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      {/* Image */}
      {event.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {urgencyBadge && (
            <div className="absolute top-3 left-3">{urgencyBadge}</div>
          )}
          {event.category === 'Leftover Food' ? (
            <div className="absolute top-3 right-3">
              <span className="badge bg-orange-600 text-white font-bold shadow-lg flex items-center gap-1 animate-pulse">
                <UtensilsCrossed className="h-3 w-3" />
                Leftover Food!
              </span>
            </div>
          ) : event.hasFood && (
            <div className="absolute top-3 right-3">
              <span className="badge bg-accent-500 text-white font-bold shadow-lg flex items-center gap-1">
                <UtensilsCrossed className="h-3 w-3" />
                Free Food!
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 flex-1">
            {event.title}
          </h3>
        </div>

        <p className="text-sm text-gray-600 mb-3">{event.host}</p>

        {/* Time */}
        <div className="flex items-center text-sm text-gray-700 mb-2">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          <span>{formatTime(event.time)}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-700 mb-3">
          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
          <span className="truncate">{event.location.name}</span>
        </div>

        {/* Footer with rating and attendees */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {event.hasFood && event.foodRating > 0 && (
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                <span className="font-medium text-gray-900">
                  {event.foodRating.toFixed(1)}
                </span>
                <span className="text-gray-500 ml-1">food</span>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              <span>{event.attendeeCount} going</span>
            </div>
          </div>

          {!event.requiresSignup && (
            <span className="badge badge-success text-xs">No Signup</span>
          )}
        </div>
      </div>
    </div>
  );
}
