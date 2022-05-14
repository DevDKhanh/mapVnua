import { memo } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import ItemListLayer from '../ItemListLayer';
import style from './ListLayer.module.scss';

function ListLayer({ active = true, title = 'Các lớp bản đồ' }) {
    const { classifys } = useSelector((state) => state.dataMap);
    return (
        <div className={clsx([style.main, { [style.active]: active }])}>
            <h3 className={style.title}>{title}</h3>
            <ul className={style.list}>
                {classifys.map((item) => (
                    <ItemListLayer
                        key={item.id}
                        nameItem={item.nameClassify}
                        classifyId={item.id}
                    />
                ))}
            </ul>
        </div>
    );
}

export default memo(ListLayer);
