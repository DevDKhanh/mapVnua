import {Fragment} from 'react';
import Lottie from 'react-lottie';
import * as loading from '../../../public/static/anim/loading.json';
import styles from './LoadingScreen.module.scss';

function LoadingScreen({isLoading}: {isLoading?: boolean}) {
	const defaultOptions2 = {
		loop: true,
		autoplay: true,
		animationData: loading,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<Fragment>
			{isLoading && (
				<div className={styles.container}>
					<div className={styles.logo}>
						<Lottie options={defaultOptions2} />
					</div>
				</div>
			)}
		</Fragment>
	);
}

export default LoadingScreen;
