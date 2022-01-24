import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addLayer, removeLayer } from '../../../redux/action/dataMap';
import style from './ItemLayer.module.scss';

function ItemLayer({ dataLayer }) {
	const { layers } = useSelector(state => state.dataMap);
	const dispatch = useDispatch();
	const onChange = e => {
		const { checked } = e.target;
		if (checked) {
			dispatch(addLayer(dataLayer));
		} else {
			dispatch(removeLayer(dataLayer.id));
		}
	};
	return (
		<li>
			<label className={style.item}>
				<div className={style.text}>
					<span className={style.icon}>
						<img src={dataLayer.icon} alt={dataLayer.nameLayer} />
					</span>
					<span>{dataLayer.nameLayer}</span>
				</div>
				<input
					type={'checkbox'}
					onChange={onChange}
					checked={layers.some(item => item.id === dataLayer.id)}
				/>
			</label>
		</li>
	);
}

export default memo(ItemLayer);
