'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Real bars data from Mardi Gras survey
const bars = [
  {
    id: 1,
    name: 'The Boot',
    address: '1039 Broadway St, New Orleans, LA',
    lat: 29.9285,
    lng: -90.1292,
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
    lat: 29.9428,
    lng: -90.1294,
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
    lat: 29.9628,
    lng: -90.1089,
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
    lat: 29.9228,
    lng: -90.1234,
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
    lat: 29.9572,
    lng: -90.0628,
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
    lat: 29.9631,
    lng: -90.1092,
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
    lat: 29.9256,
    lng: -90.1023,
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
    lat: 29.9556,
    lng: -90.0672,
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
    lat: 29.9228,
    lng: -90.1134,
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
    lat: 29.9547,
    lng: -90.0692,
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
    lat: 29.9556,
    lng: -90.0647,
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
    lat: 29.9642,
    lng: -90.0367,
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
    lat: 29.9589,
    lng: -90.0647,
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

function BarMapContent() {
  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bars.map((bar) => (
        <Marker key={bar.id} position={[bar.lat, bar.lng]}>
          <Popup>
            <div className="bg-white p-3 rounded">
              <h3 className="font-bold text-green-600">{bar.name}</h3>
              <p className="text-sm text-gray-700">{bar.address}</p>
              <p className="text-sm text-gray-600">
                <strong>Rating:</strong> {bar.rating}/5 ⭐
              </p>
              <p className="text-sm text-green-600 mt-2">🍸 Bar</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default function BathroomMap() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <MapContainer
      center={[29.95, -90.27] as [number, number]}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
    >
      <BarMapContent />
    </MapContainer>
  );
}
