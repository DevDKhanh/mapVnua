import style from './Input.module.scss';

interface props {
    title: string;
    value: string;
    type?: string;
    name: string;
    onChange?: (value: any) => void;
    [props: string]: any;
}

function Input({
    title,
    value,
    name,
    type = 'text',
    onChange,
    ...props
}: props) {
    return (
        <div className={style.groupInput}>
            <p>{title}</p>
            <div className={style.input}>
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
