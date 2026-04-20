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

// Sample bars in New Orleans from the Google Sheet
const bars = [
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
