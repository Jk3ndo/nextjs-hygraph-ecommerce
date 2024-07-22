import * as ReactLeaflet from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';

import iconMarker2x from 'leaflet/dist/images/marker-icon-2x.png';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconMarkerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect } from "react";
import { UseMapInstance } from "./useMapInstance";

const { MapContainer, TileLayer, Marker, Popup } = ReactLeaflet;

const Map = ({ className, center, positions, zoom }) =>  {

    let mapClassName = styles.map;
    if (mapClassName) {
        mapClassName = `${mapClassName} ${className}`;
    }

    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconMarker2x.src,
        iconUrl: iconMarker.src,
        shadowUrl: iconMarkerShadow.src
        })
    }, []);

    return (
        <MapContainer className={mapClassName} center={center} scrollWheelZoom={false}>
            <UseMapInstance position={center} zoom={zoom}  />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            { positions.map(position => {
                return (
                    <Marker position={[position.location.latitude, position.location.longitude]} key={`pos-${position.location.latitude}`}>
                        <Popup>
                            <p>{position.name}</p>
                            <p>{position.address}</p>
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    )
}

export default Map;