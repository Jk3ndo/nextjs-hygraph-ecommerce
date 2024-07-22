import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const UseMapInstance = ({position, zoom}) => {
    const map = useMap();
    useEffect(() => {    
        map.setView(position, zoom);
        // Zoom to a specific level
        // map.setZoom(zoom);
      }, [map, position, zoom]);
    return null;
};