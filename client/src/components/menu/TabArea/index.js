import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, memo } from 'react';

import { updateArea } from '../../../redux/action/dataMap';
import areaAPI from '../../../api/area';
import style from './TabArea.module.scss';

function TabArea() {
    const dispatch = useDispatch();
    const { area, language } = useSelector((state) => state.dataMap);

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

    const handleChange = (e) => {
        const areaData = data.filter((v, i) => v.id === e.target.value)[0];
        dispatch(updateArea(areaData));
    };

    return (
        <>
            {data.length > 1 ? (
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
            ) : null}
        </>
    );
}

export default memo(TabArea);
