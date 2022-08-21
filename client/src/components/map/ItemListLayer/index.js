import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import ItemLayer from '../ItemLayer';
import style from './ItemContainerLayer.module.scss';
import { useCancelToken } from '../../../common/hooks/useCancelToken';
import layerAPI from '../../../api/layer';

function ItemContainerLayer({ nameItem, classifyId }) {
    const { language, area } = useSelector((state) => state.dataMap);
    const { newCancelToken } = useCancelToken();

    const [toggle, setToggle] = useState(false);
    const [dataLayers, setDataLayers] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const [res] = await layerAPI.getList(
                    newCancelToken(),
                    1,
                    100,
                    language.id,
                    area.id,
                    classifyId
                );
                setDataLayers(res);
            } catch (e) {}
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area.id, classifyId, language.id]);

    return (
        <li className={style.item}>
            <div className={style.title} onClick={() => setToggle(!toggle)}>
                <span>{nameItem}</span>
                <div
                    className={clsx([style.icon, { [style.active]: toggle }])}
                />
            </div>
            <ul className={clsx([style.list, { [style.show]: toggle }])}>
                {dataLayers.map((item) => (
                    <ItemLayer key={item.id} dataLayer={item} />
                ))}
            </ul>
        </li>
    );
}

export default memo(ItemContainerLayer);
