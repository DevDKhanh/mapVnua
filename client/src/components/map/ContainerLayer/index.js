import { memo } from 'react';
import clsx from 'clsx';

import ItemContainerLayer from '../ItemContainerLayer';
import style from './ContainerLayer.module.scss';

function ContainerLayer({ active = true, title = 'Các lớp bản đồ' }) {
	return (
		<div className={clsx([style.main, { [style.active]: active }])}>
			<h3 className={style.title}>{title}</h3>
			<ul className={style.list}>
				<ItemContainerLayer nameItem="Thủy văn" />
				<ItemContainerLayer nameItem="Thủy văn2" />
				<ItemContainerLayer nameItem="Thủy văn3" />
			</ul>
		</div>
	);
}

export default memo(ContainerLayer);
