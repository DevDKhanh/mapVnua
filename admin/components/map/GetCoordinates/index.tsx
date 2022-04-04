import { MapContainer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Fragment } from 'react';

function MyComponent() {
    const map = useMap();
    map.off();
    map.remove();
    console.log('map center:', map.getCenter());
    return null;
}

const index = () => {
    return (
        <Fragment>
            <h1>hello</h1>
            <MapContainer
                id="mapContainer"
                center={[40.8054, -74.0241]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <MyComponent />
            </MapContainer>
        </Fragment>
    );
};

export default index;
