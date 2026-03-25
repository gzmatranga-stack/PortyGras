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

// Sample accessible bathrooms in New Orleans
const bathrooms = [
  {
    id: 1,
    name: 'French Quarter Visitor Center',
    address: '529 St Ann St',
    lat: 29.9576,
    lng: -90.2675,
    accessible: true,
    hours: '9 AM - 6 PM',
  },
  {
    id: 2,
    name: 'Audubon Zoo Restrooms',
    address: '6500 Magazine St',
    lat: 29.9224,
    lng: -90.2768,
    accessible: true,
    hours: '10 AM - 5 PM',
  },
  {
    id: 3,
    name: 'City Park Recreation Center',
    address: '1 Palm Dr',
    lat: 30.1135,
    lng: -90.1055,
    accessible: true,
    hours: '8 AM - 8 PM',
  },
  {
    id: 4,
    name: 'Mercedes-Benz Superdome',
    address: '1500 Poydras St',
    lat: 29.9270,
    lng: -90.2816,
    accessible: true,
    hours: 'Event Hours',
  },
  {
    id: 5,
    name: 'Preservation Hall',
    address: '726 St Peter St',
    lat: 29.9577,
    lng: -90.2660,
    accessible: true,
    hours: '8 PM - 11 PM',
  },
  {
    id: 6,
    name: 'Fair Grounds Race Course',
    address: '1751 Gentilly Blvd',
    lat: 30.1122,
    lng: -90.1222,
    accessible: true,
    hours: 'Event Hours',
  },
  {
    id: 7,
    name: 'Canal Place Shopping Center',
    address: '365 Canal St',
    lat: 29.9594,
    lng: -90.2697,
    accessible: true,
    hours: '10 AM - 9 PM',
  },
  {
    id: 8,
    name: 'New Orleans Jazz Museum',
    address: '400 Esplanade Ave',
    lat: 29.9585,
    lng: -90.2609,
    accessible: true,
    hours: '10 AM - 6 PM',
  },
];

function BathroomMapContent() {
  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bathrooms.map((bathroom) => (
        <Marker key={bathroom.id} position={[bathroom.lat, bathroom.lng]}>
          <Popup>
            <div className="bg-white p-3 rounded">
              <h3 className="font-bold text-green-600">{bathroom.name}</h3>
              <p className="text-sm text-gray-700">{bathroom.address}</p>
              <p className="text-sm text-gray-600">
                <strong>Hours:</strong> {bathroom.hours}
              </p>
              <p className="text-sm text-green-600 mt-2">♿ Accessible</p>
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
      <BathroomMapContent />
    </MapContainer>
  );
}
