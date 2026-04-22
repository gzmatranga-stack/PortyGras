import { useState } from 'react';

interface Bar {
  id: number;
  name: string;
  address: string;
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

interface BathroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredBar?: Bar | null;
}

export default function BathroomModal({ isOpen, onClose, filteredBar }: BathroomModalProps) {
  const [selectedBar, setSelectedBar] = useState<Bar | null>(null);

  // If filteredBar is provided, show it directly
  const currentBar = filteredBar || selectedBar;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b-2 border-purple-300 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-600">
            {selectedBar ? selectedBar.name : 'Bars in New Orleans'}
          </h2>
          <button
            onClick={() => {
              setSelectedBar(null);
              onClose();
            }}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {currentBar ? (
            <div>
              <button
                onClick={() => {
                  setSelectedBar(null);
                  onClose();
                }}
                className="mb-4 text-purple-600 hover:text-purple-800 font-semibold"
              >
                ← Back to List
              </button>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-2xl text-green-700">{currentBar.name}</h3>
                  <p className="text-gray-700 mt-2">{currentBar.address}</p>
                  <p className="text-gray-600">Bathroom Accessibility: {currentBar.bathroomAccessibility}</p>
                  {(currentBar as any).distance && (
                    <p className="text-blue-600 font-semibold">
                      Distance: {(currentBar as any).distance.toFixed(1)} miles away
                    </p>
                  )}
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">★</span>
                    <span className="text-lg font-bold text-yellow-700">
                      {currentBar.rating}/5 Rating
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🧼</span>
                    <span className="text-lg font-bold text-blue-700">
                      Cleanliness: {currentBar.cleanliness}/5
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-3">Reviews:</h4>
                  <div className="space-y-3">
                    {currentBar.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 border-l-4 border-green-500 p-3 rounded"
                      >
                        <p className="text-gray-700 italic">"{review}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mt-4">
                  <p className="text-green-700 font-semibold">🍸 Bar & Restaurant</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {bars.map((bar) => (
                <div
                  key={bar.id}
                  onClick={() => setSelectedBar(bar)}
                  className="border-2 border-green-300 rounded-lg p-4 hover:bg-green-50 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-green-700">{bar.name}</h3>
                      <p className="text-sm text-gray-700 mt-1">{bar.address}</p>
                      <p className="text-sm text-gray-600">Bathroom: {bar.bathroomAccessibility}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-500">★</div>
                      <p className="text-sm font-semibold text-gray-700">{bar.rating}/5</p>
                      <p className="text-sm text-blue-600">Clean: {bar.cleanliness}/5</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
