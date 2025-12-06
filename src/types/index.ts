export interface Event {
  id: string;
  title: string;
  host: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  time: Date;
  hasFood: boolean;
  requiresSignup: boolean;
  foodRating: number;
  attendeeCount: number;
  description: string;
  category: string;
  imageUrl?: string;
  reviews?: Review[];
  organizerId?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export type FilterType = 'all' | 'faculty' | 'no-signup' | 'nearby' | 'top-rated';

export interface OrganizerStats {
  eventId: string;
  views: number;
  attendees: number;
  rating: number;
  ratingCount: number;
}
