import { ArrowDown2, ArrowUp2, Trash } from 'iconsax-react';
import styles from './InputColor.module.scss';

interface InputColor {
    color: string;
    note: string;
    from: number;
    to: number;
    index: number;
    onChange: (e: any, i: number) => void;
    onDelete: (i: number) => void;
    onDown: (i: number) => void;
    onUp: (i: number) => void;
}

function InputColor({
    color,
    note,
    from,
    to,
    index,
    onChange,
    onDelete,
    onDown,
    onUp,
}: InputColor) {
    return (
        <div className={styles.conainter}>
            <input
                type="color"
                value={color}
                name="color"
                onChange={(e) => onChange(e, index)}
            />
            <div className={styles.gourpBtnPosition}>
                <div className={styles.btn} onClick={() => onUp(index)}>
                    <ArrowUp2 size="32" color="#FF8A65" variant="Bold" />
                </div>
                <div className={styles.btn} onClick={() => onDown(index)}>
                    <ArrowDown2 size="32" color="#FF8A65" variant="Bold" />
                </div>
            </div>
            <input
                type="text"
                className={styles.input}
                placeholder="Chú thích"
                name="note"
                value={note}
                onChange={(e) => onChange(e, index)}
            />
            <div className={styles.btnDel} onClick={() => onDelete(index)}>
                <Trash variant="Bold" />
            </div>
        </div>
    );
}

export default InputColor;
