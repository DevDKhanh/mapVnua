import { memo, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ImageOverlay, useMapEvents, Marker } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';

function RasterForm() {
    const [point, setPoint] = useState({ lat: 0, lng: 0 });
    const { SIZE_H, SIZE_W } = useSelector((state) => state.overImage);

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPoint({ lat, lng });
        },
    });

    const bounds = useMemo(() => {
        const top = {
            lat: point.lat - SIZE_H,
            lng: point.lng - SIZE_W,
        };
        const bottom = {
            lat: point.lat + SIZE_H,
            lng: point.lng + SIZE_W,
        };
        console.log({ top, bottom });
        return new LatLngBounds([top.lat, top.lng], [bottom.lat, bottom.lng]);
    }, [point, SIZE_W, SIZE_H]);

    return (
        <>
            <ImageOverlay
                url={`https://maps.vnmc.gov.vn/data/layers/210401_sal.png`}
                bounds={bounds}
                zIndex={5}
            />
            <Marker position={point}></Marker>
        </>
    );
}

export default memo(RasterForm);
