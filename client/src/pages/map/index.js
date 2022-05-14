import { useMemo } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { useSelector } from 'react-redux';

import Menu from '../../components/menu/Menu';
import FullScreen from '../../components/map/FullScreen';
import ButtonDisplayLayer from '../../components/map/ButtonDisplayLayer';
import ContainerLayer from '../../components/map/ContainerLayer';
import './styles.scss';

function Map() {
    const { setting } = useSelector((state) => state.dataMap);
    const [settingMap] = setting;

    const defaultCenter = ['10.355270', '106.107159'];
    const center = useMemo(() => {
        if (!!settingMap) {
            return [settingMap?.lat, settingMap?.lng];
        } else {
            return defaultCenter;
        }
    }, [settingMap]);

    const zoom = useMemo(() => settingMap?.zoom, [settingMap?.zoom]);
    return (
        <div className="container">
            <MapContainer
                className="map_container"
                center={center}
                zoom={zoom || 6}
                zoomControl={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ZoomControl position="bottomright" />
                <Menu />
                <FullScreen />
                <ContainerLayer />
            </MapContainer>
            <ButtonDisplayLayer />
        </div>
    );
}

export default Map;
