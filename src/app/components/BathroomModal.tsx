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
    name: 'The Satsuma Cafe',
    address: '3218 Dauphine St, New Orleans, LA 70117',
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
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
