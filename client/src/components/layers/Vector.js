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

    return (
        <>
            {file && (
                <GeoJSON
                    data={file}
                    style={{
                        color: data.borderColor,
                        opacity: data.opacityBorder,
                        weight: data.widthBorder,
                        fillOpacity: data.opacityBackground,
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
