import { memo, useMemo, useState, useRef, useEffect } from 'react';
import { ImageOverlay, useMapEvents, Marker } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';

function MoveRaster({ file, setCoordinates }: any) {
    const markerRefTop = useRef(null);
    const markerRefBottom = useRef(null);

    const [point, setPoint] = useState({
        top: { lat: 15, lng: 108 },
        bottom: { lat: 14, lng: 107 },
    });
    const img = useMemo(() => URL.createObjectURL(file), [file]);

    useEffect(() => {
        setCoordinates(point);
    }, [point]);

    //Di chuyen anh khi dbclick
    useMapEvents({
        dblclick(e: any) {
            const { lat, lng } = e.latlng;
            const top = {
                lat: lat + 1,
                lng: lng + 1,
            };
            const bottom = {
                lat: lat - 1,
                lng: lng - 1,
            };

            setPoint({
                top,
                bottom,
            });
        },
    });

    const eventHandlers = useMemo(
        () => ({
            drag() {
                const markerTop: any = markerRefTop.current;
                if (markerTop != null) {
                    const { lat, lng } = markerTop.getLatLng();
                    setPoint((prev) => ({
                        ...prev,
                        top: { lat, lng },
                    }));
                }
                const markerBottom: any = markerRefBottom.current;
                if (markerBottom != null) {
                    const { lat, lng } = markerBottom.getLatLng();
                    setPoint((prev) => ({
                        ...prev,
                        bottom: { lat, lng },
                    }));
                }
            },
        }),
        []
    );

    const handleDrag = () => {
        const { top, bottom } = point;
        return new LatLngBounds([top.lat, top.lng], [bottom.lat, bottom.lng]);
    };

    return (
        <>
            <ImageOverlay url={img} bounds={handleDrag()} />
            <Marker
                position={[point.top.lat, point.top.lng]}
                eventHandlers={eventHandlers}
                ref={markerRefTop}
            ></Marker>
            <Marker
                position={[point.bottom.lat, point.bottom.lng]}
                eventHandlers={eventHandlers}
                ref={markerRefBottom}
            />
        </>
    );
}

export default memo(MoveRaster);
