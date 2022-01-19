import { memo, useState } from 'react';
import clsx from 'clsx';

import ItemLayer from '../ItemLayer';
import style from './ItemContainerLayer.module.scss';

function ItemContainerLayer({ nameItem }) {
	const [toggle, setToggle] = useState(false);
	return (
		<li className={style.item}>
			<div className={style.title} onClick={() => setToggle(!toggle)}>
				<span>{nameItem}</span>
				<div
					className={clsx([style.icon, { [style.active]: toggle }])}
				></div>
			</div>
			<ul className={clsx([style.list, { [style.show]: toggle }])}>
				<ItemLayer />
				<ItemLayer />
				<ItemLayer />
				<ItemLayer />
				<ItemLayer />
				<ItemLayer />
				<ItemLayer />
			</ul>
		</li>
	);
}

export default memo(ItemContainerLayer);
