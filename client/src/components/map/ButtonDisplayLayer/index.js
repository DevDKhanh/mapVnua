import { memo, useState } from 'react';
import clsx from 'clsx';
import ContainerLayer from '../ContainerLayer';

function ButtonDisplayLayer() {
	const [toggle, setToggle] = useState(false);

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
