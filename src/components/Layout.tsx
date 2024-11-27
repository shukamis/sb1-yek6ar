import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Heart, User as UserIcon, Calendar, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { auth } from '../lib/firebase';

export function Layout() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="font-semibold text-lg">LoveTracker</span>
              </Link>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                  <Calendar className="h-5 w-5" />
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                  <UserIcon className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => auth.signOut()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}