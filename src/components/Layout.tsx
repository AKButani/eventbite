import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Map, PlusCircle, BarChart3, UtensilsCrossed } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <UtensilsCrossed className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-primary-600">Eventbite</h1>
                <p className="text-xs text-gray-500 -mt-1">A free lunch does exist</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Events</span>
              </Link>
              <Link
                to="/map"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/map')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <Map className="h-4 w-4" />
                <span>Map</span>
              </Link>
              <Link
                to="/add-event"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/add-event')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Event</span>
              </Link>
              <Link
                to="/dashboard"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              isActive('/') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Events</span>
          </Link>
          <Link
            to="/map"
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              isActive('/map') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <Map className="h-6 w-6" />
            <span className="text-xs mt-1">Map</span>
          </Link>
          <Link
            to="/add-event"
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              isActive('/add-event') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <PlusCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Add</span>
          </Link>
          <Link
            to="/dashboard"
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              isActive('/dashboard') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <BarChart3 className="h-6 w-6" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
