import { memo } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import ItemContainerLayer from '../ItemContainerLayer';
import style from './ContainerLayer.module.scss';

function ContainerLayer({ active = true, title = 'Các lớp bản đồ' }) {
	const { classifys } = useSelector(state => state.dataMap);
	return (
		<div className={clsx([style.main, { [style.active]: active }])}>
			<h3 className={style.title}>{title}</h3>
			<ul className={style.list}>
				{classifys.map(item => (
					<ItemContainerLayer
						key={item.id}
						nameItem={item.nameClassify}
						dataLayers={item.layers}
					/>
				))}
			</ul>
		</div>
	);
}

export default memo(ContainerLayer);
