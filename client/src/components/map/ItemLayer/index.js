import { memo } from 'react';
import style from './ItemLayer.module.scss';

function ItemLayer() {
	return (
		<li>
			<label className={style.item}>
				<span>Lowsp 1</span>
				<input type={'checkbox'} />
			</label>
		</li>
	);
}

export default memo(ItemLayer);
