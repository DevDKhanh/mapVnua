import { memo, useEffect, useState } from 'react';
import { updateArea, updateLayer } from '../../../redux/action/dataMap';
import { useDispatch, useSelector } from 'react-redux';

import { API } from '../../../constant/config';
import { RiArrowDownSFill } from 'react-icons/ri';
import areaAPI from '../../../api/area';
import clsx from 'clsx';
import style from './TabArea.module.scss';

function TabArea() {
    const dispatch = useDispatch();
    const { area, language } = useSelector((state) => state.dataMap);

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!!language) {
            (async () => {
                try {
                    const [res] = await areaAPI.getList(
                        null,
                        1,
                        100,
                        language.id
                    );

                    if (!!res.records[0]) {
                        dispatch(updateArea(res.records[0]));
                        setData(res.records);
                    }
                } catch (e) {}
            })();
        }
    }, [language, dispatch]);

    const handleChange = (item) => {
        const areaData = data.filter((v, i) => v.id === item.id)[0];
        dispatch(updateArea(areaData));
        dispatch(updateLayer([]));
        setShow(false);
    };

    return (
        <>
            {/* {data.length > 1 ? (
                <div>
                    <select className={style.select} onChange={handleChange}>
                        {data.map((item, i) => (
                            <option
                                key={i}
                                value={item.id}
                                checked={item.id === area.id}
                            >
                                {item.nameArea}
                            </option>
                        ))}
                    </select>
                </div>
            ) : null} */}
            {data.length > 1 ? (
                <div className={style.container}>
                    <div
                        className={clsx(style.language, style.main)}
                        onClick={() => setShow(!show)}
                    >
                        <p>{area.nameArea}</p>
                        <div className={style.icon}>
                            <RiArrowDownSFill />
                        </div>
                    </div>
                    {show && (
                        <div className={style.list}>
                            {data.map((item, i) => (
                                <div
                                    key={i}
                                    className={clsx(style.language, {
                                        [style.active]: area.id === item.id,
                                    })}
                                    onClick={() => {
                                        handleChange(item)
                                    }}
                                >
                                    <p>{item.nameArea}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : null}
        </>
    );
}

export default memo(TabArea);
