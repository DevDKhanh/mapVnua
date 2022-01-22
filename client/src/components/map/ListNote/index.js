import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import style from './ListNote.module.scss';

function ListNote() {
	const { layers } = useSelector(state => state.dataMap);
	const [toggle, setToggle] = useState(true);
	useEffect(() => {
		document.addEventListener('keypress', e => {
			if (e.code === 'KeyN') {
				setToggle(prev => !prev);
			}
		});

		return () => document.removeEventListener('keypress');
	}, []);

	return (
		<div className={clsx([style.main, { [style.active]: toggle }])}>
			<button
				className={style.btnToggle}
				onClick={() => setToggle(!toggle)}
			></button>
			<h3 className={style.title}>Chú giải</h3>
			<ul>
				{layers.map(item => (
					<li key={item.id}>{item.nameLayer}</li>
				))}
			</ul>
		</div>
	);
}

export default memo(ListNote);
