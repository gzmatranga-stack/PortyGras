'use client';

import { useState } from 'react';
import axios from 'axios';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (bar: any) => void;
}

interface Bar {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: string[];
  bathroomAccessibility: string;
  cleanliness: number;
}

const bars: Bar[] = [
  {
    id: 1,
    name: 'The Satsuma Cafe',
    address: '3218 Dauphine St, New Orleans, LA 70117',
    lat: 29.9685,
    lng: -90.0582,
    rating: 4.7,
    reviews: [
      'Great atmosphere and excellent cocktails. Highly recommend the Satsuma Sour!',
      'Cozy spot with amazing food and drinks. The staff is super friendly.',
      'Perfect place for a date night. Love the ambiance.',
      'Delicious food and great selection of beers.',
    ],
    bathroomAccessibility: 'Wheelchair accessible',
    cleanliness: 4.8,
  },
  {
    id: 2,
    name: 'Carmo',
    address: '527 Julia St, New Orleans, LA 70130',
    lat: 29.9489,
    lng: -90.0675,
    rating: 4.5,
    reviews: [
      'Tropical vibes with amazing cocktails. The food is incredible!',
      'One of the best bars in New Orleans. Great music and atmosphere.',
      'Fantastic drinks and friendly staff. Highly recommend.',
      'Beautiful decor and delicious tapas.',
    ],
    bathroomAccessibility: 'Wheelchair accessible',
    cleanliness: 4.6,
  },
  {
    id: 3,
    name: 'The Three Muses',
    address: '536 Frenchmen St, New Orleans, LA 70116',
    lat: 29.9627,
    lng: -90.0609,
    rating: 4.3,
    reviews: [
      'Live music venue with great drinks. Always a fun time!',
      'Amazing live shows and decent bar food.',
      'Crowded but worth it for the music scene.',
      'Good selection of beers and cocktails.',
    ],
    bathroomAccessibility: 'Wheelchair accessible',
    cleanliness: 4.2,
  },
  {
    id: 4,
    name: 'Cochon',
    address: '930 Tchoupitoulas St, New Orleans, LA 70130',
    lat: 29.9406,
    lng: -90.0694,
    rating: 4.4,
    reviews: [
      'Amazing Cajun food and great beer selection.',
      'Cozy atmosphere with delicious dishes.',
      'Perfect for trying authentic New Orleans cuisine.',
      'Friendly staff and excellent service.',
    ],
    bathroomAccessibility: 'Wheelchair accessible',
    cleanliness: 4.5,
  },
  {
    id: 5,
    name: 'Sylvain',
    address: '625 Chartres St, New Orleans, LA 70130',
    lat: 29.9552,
    lng: -90.0647,
    rating: 4.6,
    reviews: [
      'Elegant French bistro with amazing wine selection.',
      'Romantic setting with delicious French cuisine.',
      'Excellent service and beautiful decor.',
      'Highly recommend the escargot and steak.',
    ],
    bathroomAccessibility: 'Wheelchair accessible',
    cleanliness: 4.7,
  },
  {
    id: 6,
    name: 'Bacchanal Wine',
    address: '600 Poland Ave, New Orleans, LA 70117',
    lat: 29.9642,
    lng: -90.0358,
    rating: 4.8,
    reviews: [
      'Amazing wine selection and live music. Perfect spot!',
      'Beautiful outdoor area with great vibes.',
      'Excellent cheeses and charcuterie.',
      'One of the best wine bars in the city.',
    ],
    bathroomAccessibility: 'Wheelchair accessible',
    cleanliness: 4.9,
  },
  {
    id: 7,
    name: 'The Spotted Cat',
    address: '623 Frenchmen St, New Orleans, LA 70116',
    lat: 29.9628,
    lng: -90.0608,
    rating: 4.2,
    reviews: [
      'Great live jazz music and fun atmosphere.',
      'Crowded but authentic New Orleans experience.',
      'Good drinks and lively crowd.',
      'Classic Frenchmen Street bar.',
    ],
    bathroomAccessibility: 'Limited accessibility',
    cleanliness: 3.8,
  },
  {
    id: 8,
    name: 'Carmo Tropical',
    address: '527 Julia St, New Orleans, LA 70130',
    lat: 29.9489,
    lng: -90.0675,
    rating: 4.5,
    reviews: [
      'Tropical paradise with amazing cocktails.',
      'Great food and vibrant atmosphere.',
      'Perfect for a night out.',
      'Friendly staff and delicious dishes.',
    ],
    bathroomAccessibility: 'Wheelchair accessible',
    cleanliness: 4.6,
  },
];

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // Radius of Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function FilterModal({ isOpen, onClose, onFilter }: FilterModalProps) {
  const [rating, setRating] = useState<number>(3);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Geocode the address using Nominatim (OpenStreetMap)
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address + ', New Orleans, LA',
          format: 'json',
          limit: 1,
        },
      });

      if (response.data.length === 0) {
        setError('Address not found. Please try a more specific address.');
        setLoading(false);
        return;
      }

      const userLat = parseFloat(response.data[0].lat);
      const userLng = parseFloat(response.data[0].lon);

      // Filter bars by rating and find the closest one
      const eligibleBars = bars.filter(bar => bar.rating >= rating);

      if (eligibleBars.length === 0) {
        setError('No bars found matching your rating criteria.');
        setLoading(false);
        return;
      }

      let closestBar = eligibleBars[0];
      let minDistance = calculateDistance(userLat, userLng, closestBar.lat, closestBar.lng);

      for (const bar of eligibleBars) {
        const distance = calculateDistance(userLat, userLng, bar.lat, bar.lng);
        if (distance < minDistance) {
          minDistance = distance;
          closestBar = bar;
        }
      }

      // Add distance to the bar object
      const barWithDistance = { ...closestBar, distance: minDistance };

      onFilter(barWithDistance);
      onClose();
    } catch (err) {
      setError('Error finding location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Filter Bars</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating (1-5 stars)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-colors ${
                      rating >= star
                        ? 'bg-yellow-400 border-yellow-500 text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">Selected: {rating} stars and above</p>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Your Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g., 123 Main St, New Orleans, LA"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-2">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Finding...' : 'Find Closest Bar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}