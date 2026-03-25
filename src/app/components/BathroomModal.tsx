import { useState } from 'react';

interface Bathroom {
  id: number;
  name: string;
  address: string;
  hours: string;
  rating: number;
  reviews: string[];
}

const bathrooms: Bathroom[] = [
  {
    id: 1,
    name: 'French Quarter Visitor Center',
    address: '529 St Ann St, New Orleans, LA 70116',
    hours: '9 AM - 6 PM',
    rating: 4.8,
    reviews: [
      'Very clean and well-maintained! Staff was helpful.',
      'Perfect location in the French Quarter with accessible features.',
      'Wheelchair accessible with plenty of space.',
      'The facilities were excellent and modern.',
    ],
  },
  {
    id: 2,
    name: 'Audubon Zoo Restrooms',
    address: '6500 Magazine St, New Orleans, LA 70118',
    hours: '10 AM - 5 PM',
    rating: 4.6,
    reviews: [
      'Clean and accessible throughout the zoo.',
      'Great facilities for families.',
      'Well-marked accessible restrooms.',
      'Staff very accommodating.',
    ],
  },
  {
    id: 3,
    name: 'City Park Recreation Center',
    address: '1 Palm Dr, New Orleans, LA 70124',
    hours: '8 AM - 8 PM',
    rating: 4.7,
    reviews: [
      'Excellent accessible facilities.',
      'Modern and clean.',
      'Great for visitors with mobility needs.',
      'Highly recommend!',
    ],
  },
  {
    id: 4,
    name: 'Mercedes-Benz Superdome',
    address: '1500 Poydras St, New Orleans, LA 70112',
    hours: 'Event Hours',
    rating: 4.5,
    reviews: [
      'Easy accessible access during events.',
      'Clean and spacious.',
      'Multiple accessible options available.',
      'Good customer service.',
    ],
  },
  {
    id: 5,
    name: 'Preservation Hall',
    address: '726 St Peter St, New Orleans, LA 70116',
    hours: '8 PM - 11 PM',
    rating: 4.4,
    reviews: [
      'Historic venue with accessible restrooms.',
      'Great jazz music atmosphere.',
      'Friendly staff.',
      'Limited but adequate facilities.',
    ],
  },
  {
    id: 6,
    name: 'Fair Grounds Race Course',
    address: '1751 Gentilly Blvd, New Orleans, LA 70122',
    hours: 'Event Hours',
    rating: 4.6,
    reviews: [
      'Great access during events.',
      'Clean and modern facilities.',
      'Staff knowledgeable about accessibility.',
      'Excellent signage.',
    ],
  },
  {
    id: 7,
    name: 'Canal Place Shopping Center',
    address: '365 Canal St, New Orleans, LA 70130',
    hours: '10 AM - 9 PM',
    rating: 4.7,
    reviews: [
      'Shopping center with excellent accessible restrooms.',
      'Central location convenient for visitors.',
      'Always clean and well-maintained.',
      'Multiple facilities available.',
    ],
  },
  {
    id: 8,
    name: 'New Orleans Jazz Museum',
    address: '400 Esplanade Ave, New Orleans, LA 70116',
    hours: '10 AM - 6 PM',
    rating: 4.8,
    reviews: [
      'Museum quality facilities.',
      'Exceptional accessibility features.',
      'Beautiful and clean.',
      'Staff very attentive to visitor needs.',
    ],
  },
];

interface BathroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BathroomModal({ isOpen, onClose }: BathroomModalProps) {
  const [selectedBathroom, setSelectedBathroom] = useState<Bathroom | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b-2 border-purple-300 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-600">
            {selectedBathroom ? selectedBathroom.name : 'Accessible Restrooms in New Orleans'}
          </h2>
          <button
            onClick={() => {
              setSelectedBathroom(null);
              onClose();
            }}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {!selectedBathroom ? (
            <div className="space-y-3">
              {bathrooms.map((bathroom) => (
                <div
                  key={bathroom.id}
                  onClick={() => setSelectedBathroom(bathroom)}
                  className="border-2 border-green-300 rounded-lg p-4 hover:bg-green-50 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-green-700">{bathroom.name}</h3>
                      <p className="text-sm text-gray-700 mt-1">{bathroom.address}</p>
                      <p className="text-sm text-gray-600">Hours: {bathroom.hours}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-500">★</div>
                      <p className="text-sm font-semibold text-gray-700">{bathroom.rating}/5</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setSelectedBathroom(null)}
                className="mb-4 text-purple-600 hover:text-purple-800 font-semibold"
              >
                ← Back to List
              </button>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-2xl text-green-700">{selectedBathroom.name}</h3>
                  <p className="text-gray-700 mt-2">{selectedBathroom.address}</p>
                  <p className="text-gray-600">Hours: {selectedBathroom.hours}</p>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">★</span>
                    <span className="text-lg font-bold text-yellow-700">
                      {selectedBathroom.rating}/5 Rating
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-3">Reviews:</h4>
                  <div className="space-y-3">
                    {selectedBathroom.reviews.map((review, index) => (
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
                  <p className="text-green-700 font-semibold">♿ Wheelchair Accessible</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
