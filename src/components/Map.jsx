import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to center the map on a marker
const CenterMarker = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13);
    }
  }, [position, map]);
  
  return null;
};

const Map = ({ profile, allProfiles = [], height = "400px" }) => {
  const defaultCenter = [37.7749, -122.4194]; // San Francisco as default
  const center = profile ? profile.coordinates : defaultCenter;
  
  // Determine which profiles to show on the map
  const markersToShow = profile ? [profile] : allProfiles;

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <MapContainer 
        center={center} 
        zoom={profile ? 13 : 4} 
        style={{ height: '100%', width: '100%' }}
        className="transition-all duration-300"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markersToShow.map(p => (
          <Marker key={p.id} position={p.coordinates}>
            <Popup className="p-4 rounded-lg shadow-xl bg-white text-gray-800">
              <div>
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {profile && <CenterMarker position={profile.coordinates} />}
      </MapContainer>
    </div>
  );
};

export default Map;
