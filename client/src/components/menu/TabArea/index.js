import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, memo } from 'react';

import { updateArea } from '../../../redux/action/dataMap';
import areaAPI from '../../../api/area';
import style from './TabArea.module.scss';

function TabArea() {
    const dispatch = useDispatch();
    const { area, language } = useSelector((state) => state.dataMap);

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (language) {
            (async () => {
                try {
                    const [res] = await areaAPI.getList(
                        null,
                        1,
                        100,
                        language.id
                    );
                    dispatch(updateArea(res.records[0]));
                    setData(res.records);
                } catch (e) {}
            })();
        }
    }, [language, dispatch]);

    const handleChange = (e) => {
        dispatch(updateArea({ id: e.target.value }));
    };

    return (
        <div>
            <select className={style.select} onChange={handleChange}>
                {data.map((item, i) => (
                    <option
                        key={i}
                        value={item.id}
                        checked={item.id === area.id}
                        onClick={handleChange}
                    >
                        {item.nameArea}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default memo(TabArea);
