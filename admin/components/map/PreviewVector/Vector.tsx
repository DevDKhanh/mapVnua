import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import iconImg from '../../../assets/image/location.svg';

interface dataType {
    icon: any;
    borderColor: string;
    widthBorder: string;
    opacityBorder: string;
    backgroundColor: string;
    opacityBackground: string;
}

function Vector({ fileData, data }: { fileData: any; data: dataType }) {
    const [iconPreview, setIconPreview] = useState<string>(iconImg.src);

    const getInfo = (data: any) => {
        const info = [];
        for (let i in data) {
            info.push(`<div>
                    <p>
                        <b>${i}: </b> ${data[i]}
                    </p>
                </div>`);
        }
        return info;
    };

    const handleEachInfo = (info: any, layer: any) => {
        const { properties } = info;
        layer.bindPopup(getInfo(properties).join(''));
    };

    useEffect(() => {
        if (data?.icon && typeof data?.icon !== 'string') {
            const link = URL.createObjectURL(data.icon);
            setIconPreview(link);
            return () => {
                URL.revokeObjectURL(link);
            };
        }
    }, [data?.icon]);

    const handleCustomMarker = (feature: any, latlng: any) => {
        return L.marker(latlng, {
            icon: new L.Icon({
                iconUrl: iconPreview,
                iconSize: [26, 26],
                popupAnchor: [0, -15],
                shadowAnchor: [13, 28],
                shadowUrl:
                    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
            }),
        });
    };

    return (
        <>
            {fileData && (
                <GeoJSON
                    key={fileData}
                    data={fileData}
                    style={{
                        color: data.borderColor,
                        opacity: +data.opacityBorder,
                        weight: +data.widthBorder,
                        fillOpacity: +data.opacityBackground,
                        fillColor: data.backgroundColor,
                    }}
                    pointToLayer={handleCustomMarker}
                    onEachFeature={handleEachInfo}
                />
            )}
        </>
    );
}

export default memo(Vector);
