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
    name: 'The Boot',
    address: '1039 Broadway St, New Orleans, LA',
    lat: 29.9408240,
    lng: -90.1238590,
    rating: 4,
    reviews: [
      'Free to use bathroom with no wait time.',
      'Acceptable cleanliness with all supplies available.',
      'There is no stall, just wall-to-wall urinals.',
    ],
    bathroomAccessibility: 'Free to use',
    cleanliness: 3,
  },
  {
    id: 2,
    name: 'Cooter Brown\'s',
    address: '509 S Carrollton Ave, New Orleans, LA',
    lat: 29.9425278,
    lng: -90.1343928,
    rating: 4,
    reviews: [
      'Free to use bathroom with no wait time.',
      'Acceptable cleanliness with all supplies available.',
    ],
    bathroomAccessibility: 'Free to use',
    cleanliness: 3,
  },
  {
    id: 3,
    name: 'The Cure',
    address: '4905 Freret St, New Orleans, LA',
    lat: 29.9350262,
    lng: -90.1075469,
    rating: 5,
    reviews: [
      'Must buy a drink for bathroom access.',
      'Very clean bathroom with short wait time.',
      'All supplies available including toilet paper, soap, and paper towels.',
    ],
    bathroomAccessibility: 'Must buy a drink',
    cleanliness: 5,
  },
  {
    id: 4,
    name: 'Monkey Hill Bar',
    address: '6100 Magazine St, New Orleans, LA',
    lat: 29.9226458,
    lng: -90.1236287,
    rating: 4,
    reviews: [
      'Free to use bathroom with short wait time.',
      'Very clean bathroom with all supplies available.',
    ],
    bathroomAccessibility: 'Free to use',
    cleanliness: 5,
  },
  {
    id: 5,
    name: 'Santos Bar',
    address: '1135 Decatur St, New Orleans, LA',
    lat: 29.9605930,
    lng: -90.0594665,
    rating: 3,
    reviews: [
      'Free to use bathroom with short wait time.',
      'Bathroom is dirty but has all supplies.',
    ],
    bathroomAccessibility: 'Free to use',
    cleanliness: 1,
  },
  {
    id: 6,
    name: 'Gasa Gasa',
    address: '4920 Freret St, New Orleans, LA',
    lat: 29.9348419,
    lng: -90.1079091,
    rating: 3,
    reviews: [
      'Bathroom access policy not sure.',
      'No wait time with acceptable cleanliness.',
      'All supplies available including toilet paper, soap, and paper towels.',
    ],
    bathroomAccessibility: 'Not sure',
    cleanliness: 3,
  },
  {
    id: 7,
    name: 'Ms. Mae\'s',
    address: '4336 Magazine St, New Orleans, LA',
    lat: 29.9206505,
    lng: -90.1011973,
    rating: 2,
    reviews: [
      'Must buy a drink for bathroom access.',
      'Medium wait time with dirty bathroom.',
      'All supplies available but very bad service.',
    ],
    bathroomAccessibility: 'Must buy a drink',
    cleanliness: 1,
  },
  {
    id: 8,
    name: 'Big Easy Daiquiris',
    address: '501 Bourbon St, New Orleans, LA',
    lat: 29.9572425,
    lng: -90.0670932,
    rating: 4,
    reviews: [
      'Free to use bathroom with no wait time.',
      'Acceptable cleanliness with all supplies available.',
    ],
    bathroomAccessibility: 'Free to use',
    cleanliness: 3,
  },
  {
    id: 9,
    name: 'St. Joes Bar',
    address: '5535 Magazine St, New Orleans, LA',
    lat: 29.9212893,
    lng: -90.1169407,
    rating: 5,
    reviews: [
      'Free to use bathroom with no wait time.',
      'Very clean bathroom - small but very clean!',
      'All supplies available including toilet paper, soap, and paper towels.',
    ],
    bathroomAccessibility: 'Free to use',
    cleanliness: 5,
  },
  {
    id: 10,
    name: 'Big Easy Daiquiris',
    address: '216 Bourbon St, New Orleans, LA',
    lat: 29.9549724,
    lng: -90.0687953,
    rating: 3,
    reviews: [
      'Free to use bathroom with no wait time.',
      'Acceptable cleanliness with all supplies available.',
    ],
    bathroomAccessibility: 'Free to use',
    cleanliness: 3,
  },
  {
    id: 11,
    name: 'Big Easy Daiquiris',
    address: '409 Decatur St, New Orleans, LA',
    lat: 29.9546701,
    lng: -90.0649575,
    rating: 3,
    reviews: [
      'Free to use bathroom with no wait time.',
      'Acceptable cleanliness with all supplies available.',
    ],
    bathroomAccessibility: 'Free to use',
    cleanliness: 3,
  },
  {
    id: 12,
    name: 'Saturn Bar',
    address: '3067 St. Claude Ave, New Orleans, LA',
    lat: 29.9679402,
    lng: -90.0442263,
    rating: 1,
    reviews: [
      'Free to use bathroom with short wait time.',
      'Bathroom is dirty with limited supplies.',
    ],
    bathroomAccessibility: 'Free to use',
    cleanliness: 1,
  },
  {
    id: 13,
    name: 'The Dungeon',
    address: '738 Toulouse St, New Orleans, LA',
    lat: 29.9576548,
    lng: -90.0662896,
    rating: 4,
    reviews: [
      'Must buy a drink for bathroom access.',
      'Medium wait time with acceptable cleanliness.',
      'All supplies available including hand dryer.',
      'NO Phones or Pictures allowed.',
    ],
    bathroomAccessibility: 'Must buy a drink',
    cleanliness: 3,
  },
];

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959;
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
  console.log('FilterModal component called with isOpen:', isOpen);

  const [rating, setRating] = useState<number>(3);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
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

      const barWithDistance = { ...closestBar, distance: minDistance };

      onFilter(barWithDistance);
      onClose();
    } catch (err) {
      setError('Error finding location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    console.log('FilterModal returning null because isOpen is false');
    return null;
  }

  console.log('FilterModal rendering the modal UI');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        <div className="sticky top-0 bg-white border-b-2 border-purple-300 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-600">Find Your Bar</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
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