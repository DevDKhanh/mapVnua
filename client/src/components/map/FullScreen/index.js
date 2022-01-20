import { memo } from 'react';
import screenfull from 'screenfull';

function FullScreen() {
	const handleFullScreen = () => {
		screenfull.isEnabled && screenfull.toggle();
	};
	return (
		<div className="wrapper_icon_fullscreen" onClick={handleFullScreen}>
			<i className="fas fa-expand"></i>
		</div>
	);
}

export default memo(FullScreen);
