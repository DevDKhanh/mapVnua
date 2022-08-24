import { useEffect, useMemo, useState } from 'react';
import {
    MapContainer,
    TileLayer,
    ZoomControl,
    useMapEvents,
    Marker,
    Popup,
} from 'react-leaflet';
import { useSelector } from 'react-redux';

import Menu from '../../components/menu/Menu';
import FullScreen from '../../components/map/FullScreen';
import ButtonDisplayLayer from '../../components/map/ButtonDisplayLayer';
import ContainerLayer from '../../components/map/ContainerLayer';
import NoteTable from '../../components/map/NoteTable';
import './styles.scss';

function Map() {
    const { area, setting } = useSelector((state) => state.dataMap);

    const [settingMap] = setting;

    const center = useMemo(() => {
        const defaultCenter = ['10.355270', '106.107159'];

        if (!!area.lat && !!area.lng) {
            return [area?.lat, area?.lng];
        }

        if (!!settingMap) {
            return [settingMap?.lat, settingMap?.lng];
        } else {
            return defaultCenter;
        }
    }, [area.lat, area.lng, settingMap]);

    const zoom = useMemo(() => {
        return area?.zoom || settingMap?.zoom;
    }, [area?.zoom, settingMap?.zoom]);

    return (
        <div className="container">
            <MapContainer
                className="map_container"
                center={center}
                zoom={zoom || 6}
                zoomControl={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ZoomControl position="topleft" />
                <Menu />
                <FullScreen />
                <ContainerLayer />
                <NoteTable />
                <LocationMarker center={center} zoom={zoom} />
            </MapContainer>
            <ButtonDisplayLayer />
        </div>
    );
}

export default Map;

function LocationMarker({ center, zoom }) {
    const map = useMapEvents({
        locationfound(e) {
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        if (center && zoom) {
            map.flyTo(center, zoom);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [center, zoom]);

    return null;
}
