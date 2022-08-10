import { Trash } from 'iconsax-react';
import styles from './InputColor.module.scss';

interface InputColor {
    color: string;
    from: number;
    to: number;
    index: number;
    onChange: (e: any, i: number) => void;
    onDelete: (i: number) => void;
}

function InputColor({
    color,
    from,
    to,
    index,
    onChange,
    onDelete,
}: InputColor) {
    return (
        <div className={styles.conainter}>
            <input
                type="color"
                value={color}
                name="color"
                onChange={(e) => onChange(e, index)}
            />
            <input
                type="number"
                className={styles.input}
                placeholder="Từ"
                name="from"
                value={from || 0}
                onChange={(e) => onChange(e, index)}
            />
            <input
                type="number"
                className={styles.input}
                placeholder="Đến"
                name="to"
                value={to || 0}
                onChange={(e) => onChange(e, index)}
            />
            <div className={styles.btnDel} onClick={() => onDelete(index)}>
                <Trash variant="Bold" />
            </div>
        </div>
    );
}

export default InputColor;
