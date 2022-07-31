import { memo, useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

import { API } from '../../constant/config';
import uploadAPI from '../../api/upload';

function Vector({ path, data }) {
    const [file, setFile] = useState();
    const icon = new L.Icon({
        iconUrl: `${API}/upload${data.icon}`,
        iconSize: [26, 26],
        popupAnchor: [0, -15],
        shadowAnchor: [13, 28],
        shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    });
    useEffect(() => {
        if (path) {
            (async () => {
                const [res] = await uploadAPI.getFile(null, path);
                setFile(res);
            })();
        }
    }, [path]);

    const getInfo = (data) => {
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

    const handleEachInfo = (info, layer) => {
        const { properties } = info;
        layer.bindPopup(getInfo(properties).join(''));
    };

    const handleCustomMarker = (feature, latlng) => {
        return L.marker(latlng, {
            icon,
        });
    };

    const handleStyle = (info, layer) => {
        const { properties } = info;

        return {
            color: getColor(properties[`${data.keyColor}`], 0),
            opacity: data.opacityBorder,
            weight: data.widthBorder,
            fillOpacity: data.opacityBackground,
            fillColor: getColor(properties[`${data.keyColor}`], 1),
        };
    };

    const getColor = (d, t) => {
        if (!!d) {
            return d > 100
                ? '#c18c7b'
                : d > 50
                ? '#d09d80'
                : d > 30
                ? '#dfb482'
                : d > 20
                ? '#f2ce83'
                : d > 10
                ? '#f3d98f'
                : d > 7
                ? '#f2d49b'
                : d > 5
                ? '#f2efa2'
                : d > 2
                ? '#c8d489'
                : d > 1
                ? '#99b570'
                : '#709858';
        }

        return t ? data.backgroundColor : data.borderColor;
    };

    return (
        <>
            {file && (
                <GeoJSON
                    data={file}
                    style={handleStyle}
                    pointToLayer={handleCustomMarker}
                    onEachFeature={handleEachInfo}
                />
            )}
        </>
    );
}

export default memo(Vector);
