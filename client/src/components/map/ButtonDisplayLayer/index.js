import { memo, useState, useEffect } from 'react';
import clsx from 'clsx';
import ListLayer from '../ListLayer';

function ButtonDisplayLayer() {
	const [toggle, setToggle] = useState(true);
	useEffect(() => {
		document.addEventListener('keypress', e => {
			if (e.code === 'KeyL') {
				setToggle(prev => !prev);
			}
		});

		return () => document.removeEventListener('keypress');
	}, []);
	return (
		<>
			<div
				className={clsx(['icon_layer'])}
				onClick={() => setToggle(!toggle)}
			>
				<i className="fas fa-layer-group"></i>
			</div>
			<ListLayer active={toggle} />
		</>
	);
}

export default memo(ButtonDisplayLayer);
