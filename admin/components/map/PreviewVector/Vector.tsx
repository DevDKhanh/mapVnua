import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import iconImg from '../../../assets/image/location.svg';
import { getColor } from '../../../common/func/convertColor';

interface dataType {
    icon: any;
    keyColor: string;
    borderColor: string;
    widthBorder: string;
    opacityBorder: string;
    backgroundColor: string;
    opacityBackground: string;
    dataColor: string;
}

function Vector({ fileData, data }: { fileData: any; data: dataType }) {
    const [iconPreview, setIconPreview] = useState<string>(iconImg.src);

    const setColor = (d: any, t: any, l: any) => {
        if (!!d) {
            for (let i of l) {
                if (d >= i.from && d <= i.to) {
                    return i.color;
                }
            }
        }

        return t ? data.backgroundColor : data.borderColor;
    };

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

    const handleStyle: any = (info: any, layer: any) => {
        const { properties } = info;

        return {
            color: setColor(
                properties[`${data.keyColor}`],
                0,
                getColor(data.dataColor)
            ),
            opacity: +data.opacityBorder,
            weight: +data.widthBorder,
            fillOpacity: +data.opacityBackground,
            fillColor: setColor(
                properties[`${data.keyColor}`],
                1,
                getColor(data.dataColor)
            ),
        };
    };

    return (
        <>
            {fileData && (
                <GeoJSON
                    key={fileData}
                    data={fileData}
                    style={handleStyle}
                    pointToLayer={handleCustomMarker}
                    onEachFeature={handleEachInfo}
                />
            )}
        </>
    );
}

export default memo(Vector);
