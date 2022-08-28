import { ArrowDown2, ArrowUp2, Trash } from 'iconsax-react';
import styles from './InputColor2.module.scss';

interface InputColor2 {
    color: string;
    note: string;
    value: any;
    index: number;
    onChange: (e: any, i: number) => void;
    onDelete: (i: number) => void;
    onDown: (i: number) => void;
    onUp: (i: number) => void;
}

function InputColor2({
    color,
    note,
    value,
    index,
    onChange,
    onDelete,
    onDown,
    onUp,
}: InputColor2) {
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
            <div></div>
            <input
                className={styles.input}
                placeholder="Giá trị"
                name="value"
                value={value || ''}
                onChange={(e) => onChange(e, index)}
            />
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

export default InputColor2;
