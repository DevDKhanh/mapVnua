import clsx from 'clsx';
import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowDownSFill } from 'react-icons/ri';

import { useCancelToken } from '../../../common/hooks/useCancelToken';
import { updateLanguage } from '../../../redux/action/dataMap';
import languageAPI from '../../../api/language';
import { API } from '../../../constant/config';
import style from './TabLanguage.module.scss';
function TabLanguage() {
    const dispatch = useDispatch();
    const { newCancelToken } = useCancelToken();

    const { language } = useSelector((state) => state.dataMap);

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const [res] = await languageAPI.getList(
                    newCancelToken(),
                    1,
                    100
                );
                dispatch(updateLanguage(res.records[0]));
                setData(res.records);
            } catch (e) {}
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={style.container}>
            <div
                className={clsx(style.language, style.main)}
                onClick={() => setShow(!show)}
            >
                <div className={style.icon}>
                    <img
                        src={`${API}/upload${language.icon}`}
                        alt={language.nameLanguage}
                    />
                </div>
                <p>{language.nameLanguage}</p>
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
                                [style.active]: language.id === item.id,
                            })}
                            onClick={() => {
                                dispatch(updateLanguage(item));
                                setShow(!show);
                            }}
                        >
                            <div className={style.icon}>
                                <img
                                    src={`${API}/upload${item.icon}`}
                                    alt={language.nameLanguage}
                                />
                            </div>
                            <p>{item.nameLanguage}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(TabLanguage);
