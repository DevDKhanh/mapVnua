import { memo, useEffect, useState } from 'react';

import { GeoJSON } from 'react-leaflet';
import uploadAPI from '../../api/upload';

function Vector({ path, data }) {
    const [file, setFile] = useState();
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

    return (
        <>
            {file && (
                <GeoJSON
                    data={file}
                    style={{
                        color: data.borderColor,
                        opacity: data.opacityBorder,
                        fillOpacity: data.opacityBackground,
                        fillColor: data.backgroundColor,
                    }}
                    onEachFeature={handleEachInfo}
                />
            )}
        </>
    );
}

export default memo(Vector);
