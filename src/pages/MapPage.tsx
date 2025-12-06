import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { icon } from 'leaflet';
import { mockEvents } from '../data/mockData';
import { Star, Users, UtensilsCrossed, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userLocationIcon = icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjRkYwMDAwIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDcuNyAxMi41IDI4LjUgMTIuNSAyOC41UzI1IDIwLjIgMjUgMTIuNUMyNSA1LjYgMTkuNCAwIDEyLjUgMHptMCAxN2MtMi41IDAtNC41LTItNC41LTQuNXMyLTQuNSA0LjUtNC41IDQuNSAyIDQuNSA0LjUtMiA0LjUtNC41IDQuNXoiLz48L3N2Zz4=',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapPage() {
  const navigate = useNavigate();

  const ethCenter: [number, number] = [47.3769, 8.5417];
  const userLocation: [number, number] = [47.3767, 8.5492]; // ETH HG placeholder

  const formatTime = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    if (isToday) {
      return `Today at ${timeStr}`;
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-900">Event Map</h1>
        <p className="text-sm text-gray-600">
          Click on markers to see event details
        </p>
      </div>

      {/* Map */}
      <div className="h-full w-full pt-20">
        <MapContainer
          center={ethCenter}
          zoom={15}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Location Marker */}
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-1">Your Location</h3>
                <p className="text-sm text-gray-600">ETH HG Building</p>
              </div>
            </Popup>
          </Marker>

          {mockEvents.map((event) => (
            <Marker
              key={event.id}
              position={[event.location.lat, event.location.lng]}
              icon={defaultIcon}
            >
              <Popup maxWidth={300}>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>

                  {event.hasFood && (
                    <div className="mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                        <UtensilsCrossed className="h-3 w-3 mr-1" />
                        Free Food!
                      </span>
                    </div>
                  )}

                  <p className="text-sm text-gray-600 mb-2">{event.host}</p>
                  <p className="text-sm text-gray-700 mb-2">
                    {formatTime(event.time)}
                  </p>

                  <div className="flex items-center space-x-2 mb-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary-600" />
                    <span className="font-semibold text-primary-600">
                      {event.walkingMinutes * 2} Reels to reach ({event.walkingMinutes} min walk)
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 mb-3 text-sm">
                    {event.hasFood && event.foodRating > 0 && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span>{event.foodRating.toFixed(1)}</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{event.attendeeCount}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      {/*
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="font-semibold text-gray-900 mb-2">Legend</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-blue-600 mr-2" />
            <span>Your location (ETH HG)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-accent-500 rounded-full mr-2"></div>
            <span>Events with free food</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current mr-2" />
            <span>Food quality rating</span>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}
