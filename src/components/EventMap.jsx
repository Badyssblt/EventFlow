
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet'; 

import 'leaflet/dist/leaflet.css'; 
import axios from 'axios';


const EventMap = ({address}) => {
  const mapRef = useRef(null); 
  const mapInstance = useRef(null); 
  const [coords, setCoords] = useState(null);

  const getCoordinatesFromAddress = async (address) => {
    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=680d603e7dd444a280491521d180d039`);
      const data = response.data;
      if (data.features && data.features.length > 0) {
        return {
          lat: data.features[0].bbox[1],
          lon: data.features[0].bbox[0]
        };
      }
      throw new Error('No results found');
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };

  useEffect(() => {
    
    if (mapInstance.current) return; 

    mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

    // Ajouter la couche de tuiles de Geoapify
    L.tileLayer(`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=680d603e7dd444a280491521d180d039`, {
      maxZoom: 18,
      attribution: '© Geoapify'
    }).addTo(mapInstance.current);

    // Nettoyage de la carte lorsque le composant est démonté
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove(); // Supprimer l'instance de la carte
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (address) {
        const coords = await getCoordinatesFromAddress(address);
        if (coords) {
          setCoords(coords);
          if (mapInstance.current) {
            mapInstance.current.setView([coords.lat, coords.lon], 13);
            L.marker([coords.lat, coords.lon]).addTo(mapInstance.current)
              .bindPopup(`<b>${address}</b>`)
              .openPopup();
          }
        }
      }
    };

    fetchCoordinates();
  }, [address]);

  return <div id="map" ref={mapRef} style={{ height: '300px', width: '100%', zIndex: '30' }}></div>;
};



export default EventMap;
