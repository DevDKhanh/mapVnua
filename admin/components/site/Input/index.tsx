import InputColor from 'react-input-color';
import style from './Input.module.scss';
interface props {
    title: string;
    value: string;
    type?: string;
    name: string;
    isColorPicker?: boolean;
    onChange?: (value: any) => void;
    [props: string]: any;
}

function Input({
    title,
    value,
    name,
    type = 'text',
    onChange,
    isColorPicker,
    ...props
}: props) {
    return (
        <div className={style.groupInput}>
            <p>{title}</p>
            <div className={style.input}>
                {isColorPicker && (
                    <InputColor initialValue={`#ccc`} placement="right" />
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
            </div>
        </div>
    );
}

export default Input;
