import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import images from '../../../constant/image';
import classifyAPI from '../../../api/classify';
import settingAPI from '../../../api/setting';
import layerAPI from '../../../api/layer';
import { dataMapAdd } from '../../../redux/action/dataMap';
import style from './LoadData.module.scss';

function LoadData({ children }) {
    const pageSize = 100;
    const dispacth = useDispatch();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                const [[classifys], [setting], [layers]] = await Promise.all([
                    classifyAPI.getList(null, page, pageSize),
                    settingAPI.getList(null, page, pageSize),
                    layerAPI.getList(null, page, pageSize),
                ]);

                dispacth(
                    dataMapAdd(
                        layers.records,
                        classifys.records,
                        setting.records
                    )
                );

                let timer = setTimeout(() => {
                    setLoading(false);
                    clearTimeout(timer);
                }, 1500);
            } catch (err) {}
        })();
    }, []);

    return <>{loading ? <Loading /> : children}</>;
}

const Loading = () => {
    return (
        <div className={style.mainLoad}>
            <h1>Hệ thống đang tải dữ liệu</h1>
            <img src={images.iconLoading} />
        </div>
    );
};

export default LoadData;
