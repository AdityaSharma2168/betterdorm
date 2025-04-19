import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Building, Home, School, Users } from 'lucide-react';

// Define types for housing options
interface HousingOption {
  id: string;
  name: string;
  type: 'apartment' | 'dorm' | 'shared';
  position: [number, number];
  price: number;
  available: boolean;
  distance: string;
  link: string;
}

const InteractiveMap: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Sample housing data
  const housingOptions: HousingOption[] = [
    {
      id: '1',
      name: 'The Graduate',
      type: 'apartment',
      position: [37.338, -121.886],
      price: 1800,
      available: true,
      distance: '0.3 miles',
      link: '/listings/1',
    },
    {
      id: '2',
      name: 'Campus Village',
      type: 'dorm',
      position: [37.336, -121.879],
      price: 1500,
      available: true,
      distance: '0.1 miles',
      link: '/listings/2',
    },
    {
      id: '3',
      name: 'University Housing',
      type: 'dorm',
      position: [37.339, -121.878],
      price: 1350,
      available: false,
      distance: '0.2 miles',
      link: '/listings/3',
    },
    {
      id: '4',
      name: 'Downtown Apartments',
      type: 'apartment',
      position: [37.332, -121.889],
      price: 2200,
      available: true,
      distance: '0.5 miles',
      link: '/listings/4',
    },
    {
      id: '5',
      name: 'Student Shared House',
      type: 'shared',
      position: [37.341, -121.891],
      price: 950,
      available: true,
      distance: '0.7 miles',
      link: '/listings/5',
    },
  ];

  // SJSU campus position
  const campusPosition: [number, number] = [37.335, -121.881];
  
  useEffect(() => {
    setMapLoaded(true);
  }, []);

  const getMarkerIcon = (type: string, available: boolean) => {
    const color = available ? '#7D3C98' : '#9CA3AF';
    
    return new Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${available ? 'violet' : 'grey'}.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };

  return (
    <div className="h-full w-full">
      {mapLoaded && (
        <MapContainer
          center={campusPosition}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Campus Marker */}
          <Marker position={campusPosition}>
            <Popup>
              <div className="text-center">
                <div className="mb-2 flex justify-center">
                  <School className="h-6 w-6 text-navy-800" />
                </div>
                <h3 className="text-lg font-semibold">San Jose State University</h3>
                <p className="text-sm text-gray-600">Campus Center</p>
              </div>
            </Popup>
          </Marker>
          
          {/* Housing Markers */}
          {housingOptions.map((option) => (
            <Marker
              key={option.id}
              position={option.position}
              icon={getMarkerIcon(option.type, option.available)}
            >
              <Popup>
                <div>
                  <div className="mb-2 flex justify-center">
                    {option.type === 'apartment' ? (
                      <Building className="h-6 w-6 text-primary-500" />
                    ) : option.type === 'dorm' ? (
                      <Home className="h-6 w-6 text-secondary-500" />
                    ) : (
                      <Users className="h-6 w-6 text-tertiary-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">{option.name}</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="font-medium">
                      ${option.price}/month
                    </p>
                    <p className="text-gray-600">
                      {option.distance} from campus
                    </p>
                    <p className={option.available ? 'text-green-600' : 'text-red-500'}>
                      {option.available ? 'Available Now' : 'Not Available'}
                    </p>
                  </div>
                  <div className="mt-3">
                    <a
                      href={option.link}
                      className="inline-block w-full rounded bg-primary-500 px-3 py-1 text-center text-sm text-white hover:bg-primary-600"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default InteractiveMap;