import { Fragment, useState } from 'react';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

import icon from '../../../assets/image/location.svg';
import style from './GetCoordinates.module.scss';

function LocationMarker({ position, onSetPosition }: any) {
    const [positionMap, setPositionMap] = useState(position);
    let iconLocation = L.icon({
        iconUrl: icon.src,
        iconSize: [30, 30],
        popupAnchor: [0, -15],
        shadowAnchor: [13, 28],
    });

    useMapEvents({
        click(e: any) {
            setPositionMap(e.latlng);
            onSetPosition && onSetPosition(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={positionMap} icon={iconLocation}></Marker>
    );
}

const Map = ({ position, onSetPosition }: any) => {
    const [showMap, setShowMap] = useState<boolean>(false);
    return (
        <Fragment>
            <div className={style.btnShow} onClick={() => setShowMap(true)}>
                Chọn tọa độ
            </div>
            {showMap && (
                <div className={style.container}>
                    <Fragment>
                        <div
                            className={style.overlay}
                            onClick={() => setShowMap(false)}
                        ></div>
                        <MapContainer
                            center={[9.975896274502997, 105.77857732772829]}
                            zoom={6}
                            scrollWheelZoom={true}
                            style={{
                                height: '80vh',
                                width: '90%',
                                position: 'absolute',
                            }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker
                                position={position}
                                onSetPosition={onSetPosition}
                            />
                        </MapContainer>
                    </Fragment>
                </div>
            )}
        </Fragment>
    );
};

export default Map;
