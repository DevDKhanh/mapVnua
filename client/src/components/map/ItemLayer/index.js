import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { API } from '../../../constant/config';
import { addLayer, removeLayer } from '../../../redux/action/dataMap';
import style from './ItemLayer.module.scss';

function ItemLayer({ dataLayer }) {
    const { layers } = useSelector((state) => state.dataMap);
    const dispatch = useDispatch();

    const onChange = (e) => {
        const { checked } = e.target;
        if (checked) {
            dispatch(addLayer(dataLayer));
        } else {
            dispatch(removeLayer(dataLayer.id));
        }
    };

    useEffect(() => {
        if (
            dataLayer.checked &&
            !layers.some((item) => item.id === dataLayer.id)
        ) {
            dispatch(addLayer(dataLayer));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataLayer]);

    return (
        <li>
            <label className={style.item}>
                <div className={style.text}>
                    <span className={style.icon}>
                        <img
                            src={`${API}/upload${dataLayer.icon}`}
                            alt={dataLayer.nameLayer}
                        />
                    </span>
                    <span>{dataLayer.nameLayer}</span>
                </div>
                <input
                    type={'checkbox'}
                    onChange={onChange}
                    checked={layers.some((item) => item.id === dataLayer.id)}
                />
            </label>
        </li>
    );
}

export default memo(ItemLayer);
