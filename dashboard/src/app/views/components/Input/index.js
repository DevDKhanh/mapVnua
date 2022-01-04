import clsx from 'clsx';
import style from './Input.module.scss';

function Input({
	type = 'text',
	label = null,
	placeholder = '',
	className,
	onChange,
}) {
	return (
		<div className={clsx([style.groupForm, className])}>
			{label && <label className={style.label}>{label}</label>}
			<div className={style.groupInput}>
				<input
					className={style.inputElement}
					type={type}
					placeholder={placeholder}
					onChange={onChange}
				/>
			</div>
		</div>
	);
}

export default Input;
