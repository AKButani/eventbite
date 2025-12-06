import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Star, Clock, UtensilsCrossed } from 'lucide-react';
import type { Event } from '../types';
import SocialCostBadge from './SocialCostBadge';

interface EventCardProps {
  event: Event;
}

const getUrgencyBadge = (eventTime: Date) => {
  const now = new Date();
  const diffInMinutes = (eventTime.getTime() - now.getTime()) / (1000 * 60);

  // Check if event is happening today
  const isToday = eventTime.toDateString() === now.toDateString();

  // Event is currently happening (assuming 2-hour duration)
  if (diffInMinutes < 0 && diffInMinutes > -120) {
    return (
      <span className="badge bg-red-100 text-red-800 font-semibold">
        now
      </span>
    );
  }

  // Event is in the past
  if (diffInMinutes < 0) {
    return null;
  }

  // Event is within the next hour - show minutes
  if (diffInMinutes < 60) {
    return (
      <span className="badge bg-orange-100 text-orange-800 font-semibold">
        {Math.round(diffInMinutes)}m
      </span>
    );
  }

  // Event is happening today - show hours
  if (isToday) {
    const hours = Math.round(diffInMinutes / 60);
    return (
      <span className="badge badge-warning">
        {hours}h
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
  const [isEating, setIsEating] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(1500);

  const handleClick = () => {
    // Random duration between 1000ms and 2000ms
    const duration = Math.floor(Math.random() * 1000);
    setAnimationDuration(duration);
    setIsEating(true);

    setTimeout(() => {
      navigate(`/event/${event.id}`);
    }, duration);
  };

  return (
    <div
      onClick={handleClick}
      className={`card cursor-pointer hover:shadow-lg transition-all duration-200 relative overflow-hidden ${
        isEating ? 'pacman-eating' : ''
      }`}
      style={isEating ? {
        animationDuration: `0.1s, ${animationDuration}ms`
      } : undefined}
    >
      {/* Pac-Man Animation */}
      {isEating && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div
            className="pacman"
            style={{
              animationDuration: `0.4s, ${animationDuration}ms`
            }}
          ></div>
        </div>
      )}

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

        {/* Social Cost Badge */}
        {event.socialCost && (
          <div className="mb-3">
            <SocialCostBadge level={event.socialCost} />
          </div>
        )}

        {/* Footer with rating and attendees */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {event.hasFood && event.foodRating && event.foodRating > 0 && (
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
