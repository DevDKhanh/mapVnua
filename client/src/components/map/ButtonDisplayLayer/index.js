import { memo, useState, useEffect } from 'react';
import clsx from 'clsx';
import ContainerLayer from '../ContainerLayer';

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
			<ContainerLayer active={toggle} />
		</>
	);
}

export default memo(ButtonDisplayLayer);
