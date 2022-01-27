import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

import FullScreen from '../../components/map/FullScreen';
import ButtonDisplayLayer from '../../components/map/ButtonDisplayLayer';
import ContainerLayer from '../../components/map/ContainerLayer';
import './styles.scss';

function Map() {
    const center = [14.276775196630261, 107.87027510367739];

    return (
        <div className="container">
            <MapContainer
                className="map_container"
                center={center}
                zoom={6}
                zoomControl={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ZoomControl position="bottomright" />
                <FullScreen />
                <ContainerLayer />
            </MapContainer>
            <ButtonDisplayLayer />
        </div>
    );
}

export default Map;
