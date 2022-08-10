import clsx from 'clsx';
import { Add } from 'iconsax-react';
import {
    Fragment,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import Draggable from 'react-draggable';
import { RiCloseFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import {
    convertColorToString,
    getColor,
} from '../../../common/func/convertColor';
import { copy } from '../../../common/func/copy';
import { DATA_COLOR } from '../../../constants/config';
import InputColor from './components/InputColor';
import styles from './SelectColorLayer.module.scss';

function SelectColorLayer({ onChange, dataColor }: any) {
    const [open, setOpen] = useState<boolean>(false);
    const [color, setColor] = useState<string>(DATA_COLOR);

    useEffect(() => {
        setColor(dataColor);
    }, [dataColor]);

    const convertColor: Array<{ color: string; from: number; to: number }> =
        useMemo(() => getColor(color), [color]);

    const handleAddColor = () => {
        setColor((prev) => {
            const arrColor = getColor(prev);
            const length = arrColor.length;
            const lastItem = arrColor[length - 1];
            return `${prev}:${lastItem.color}|${lastItem.from}_${lastItem.to}`;
        });
    };

    const handleChangeValue = useCallback(
        (e: any, i: number) => {
            const { value, name } = e.target;
            const arrColor = getColor(color);
            const newValue = arrColor.map((v, index) => {
                if (index === i) {
                    const o = {
                        ...v,
                        [name]: value,
                    };

                    return `${o.color}|${o.from}_${o.to}`;
                }
                return `${v.color}|${v.from}_${v.to}`;
            });
            setColor(newValue.join(':'));
        },
        [color]
    );

    const handleDelete = useCallback(
        (i: number) => {
            const arrColor = getColor(color);
            if (arrColor.length > 1) {
                const newValue = arrColor.filter((v, index) => index !== i);
                setColor(convertColorToString(newValue));
            } else {
                toast.warn('Vui lòng giữ lại tối thiểu 1 dải màu');
            }
        },
        [color]
    );

    const handleSubmit = () => {
        const e = {
            target: {
                name: 'dataColor',
                value: color,
            },
        };
        onChange(e);
    };

    return (
        <Fragment>
            <div
                className={styles.btn}
                onClick={() => setOpen(!open)}
                style={{ marginBottom: 24 }}
            >
                Tùy chỉnh màu
            </div>
            {open && (
                <Draggable>
                    <div className={styles.form}>
                        <div className={styles.header}>
                            <h4 className={styles.title}>Tùy chỉnh dải màu</h4>
                            <p onClick={() => copy(color)}> chép dữ liệu</p>
                        </div>
                        <div
                            className={styles.btnClose}
                            onClick={() => setOpen(false)}
                        >
                            <RiCloseFill />
                        </div>
                        <div className={styles.main}>
                            {convertColor.map((v, i) => (
                                <InputColor
                                    key={i}
                                    color={v.color}
                                    from={v.from}
                                    to={v.to}
                                    index={i}
                                    onChange={handleChangeValue}
                                    onDelete={handleDelete}
                                />
                            ))}
                            <div
                                className={clsx(styles.btn, styles.btnAdd)}
                                onClick={handleAddColor}
                            >
                                Thêm dải màu mới <Add />
                            </div>
                        </div>
                        <div className={styles.groupButton}>
                            <div
                                className={clsx(styles.btn, styles.test)}
                                onClick={handleSubmit}
                            >
                                Áp dụng
                            </div>
                            <div
                                className={clsx(styles.btn, styles.confirm)}
                                onClick={() => {
                                    handleSubmit();
                                    setOpen(false);
                                }}
                            >
                                OK
                            </div>
                        </div>
                    </div>
                </Draggable>
            )}
        </Fragment>
    );
}

export default memo(SelectColorLayer);
