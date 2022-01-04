import clsx from 'clsx';
import { useConcatClsx } from '../../../common/hooks/useClsx';
import style from './Button.module.scss';

function Button({ text = 'click', className, onClick, ...props }) {
	const convertClass = useConcatClsx;
	return (
		<button
			onClick={onClick}
			className={clsx(style.btn, [className, convertClass(props, style)])}
		>
			{text}
		</button>
	);
}

export default Button;
