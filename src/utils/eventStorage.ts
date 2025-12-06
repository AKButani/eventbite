import type { Event } from '../types';

const STORAGE_KEY = 'eventbite_custom_events';

export const saveEvent = (event: Omit<Event, 'id'>): Event => {
  const events = getCustomEvents();
  const newEvent: Event = {
    ...event,
    id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };

  events.push(newEvent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));

  return newEvent;
};

export const getCustomEvents = (): Event[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const events = JSON.parse(stored);
    // Convert date strings back to Date objects
    return events.map((event: any) => ({
      ...event,
      time: new Date(event.time),
    }));
  } catch (error) {
    console.error('Error loading custom events:', error);
    return [];
  }
};

export const deleteEvent = (eventId: string): void => {
  const events = getCustomEvents();
  const filtered = events.filter(event => event.id !== eventId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearCustomEvents = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
