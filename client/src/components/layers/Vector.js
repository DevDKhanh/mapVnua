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

    const setColor = (d, t, l) => {
        if (!!d) {
            for (let i of l) {
                if (d >= i.from && d <= i.to) {
                    return i.color;
                }
            }
        }

        return t ? data.backgroundColor : data.borderColor;
    };

    const handleStyle = (info, layer) => {
        const { properties } = info;

        return {
            color: setColor(
                properties[`${data.keyColor}`],
                0,
                getColor(data.dataColor)
            ),
            opacity: data.opacityBorder,
            weight: data.widthBorder,
            fillOpacity: data.opacityBackground,
            fillColor: setColor(
                properties[`${data.keyColor}`],
                1,
                getColor(data.dataColor)
            ),
        };
    };

    const getColor = (c) => {
        const arr = [];
        const e = c.split(':');
        for (let i of e) {
            const a = i.split('|');
            const o = {
                color: a[0],
                from: Number(a[1].split('_')[0]),
                to: Number(a[1].split('_')[1]),
            };
            arr.push(o);
        }
        return arr;
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
