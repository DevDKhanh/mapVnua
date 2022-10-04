import { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Vector from '../../layers/Vector';
import Raster from '../../layers/Raster';
import { updateLayer } from '../../../redux/action/dataMap';

function ContainerLayer({ zoom }) {
    const dispatch = useDispatch();
    const { layers, language, classify } = useSelector(
        (state) => state.dataMap
    );

    useEffect(() => {
        dispatch(updateLayer([]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language, classify]);

    const render = useMemo(() => {
        return layers.map((item) => {
            if (item.style === 'Vector') {
                return (
                    <Vector
                        key={item.id}
                        path={item.path}
                        data={item}
                        zoom={zoom}
                    />
                );
            }
            if (item.style === 'Raster') {
                return <Raster key={item.id} data={item} />;
            }
            return null;
        });
    }, [layers]);
    return <>{render}</>;
}

export default memo(ContainerLayer);
