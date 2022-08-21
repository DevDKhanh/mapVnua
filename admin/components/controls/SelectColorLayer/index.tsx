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
import uploadAPI from '../../../api/upload';
import {
    convertColorToString,
    getColor,
} from '../../../common/func/convertColor';
import { copy } from '../../../common/func/copy';
import { arrayMove } from '../../../common/func/helper';
import { DATA_COLOR } from '../../../constants/config';
import InputColor from './components/InputColor';
import styles from './SelectColorLayer.module.scss';

function SelectColorLayer({
    onChange,
    dataColor,
    file,
    keyColor,
    titleNote,
}: any) {
    const [open, setOpen] = useState<boolean>(false);
    const [color, setColor] = useState<string>(DATA_COLOR);
    const [fileData, setFileData] = useState<any>(null);

    useEffect(() => {
        setColor(dataColor);
    }, [dataColor]);

    useEffect(() => {
        function onReaderLoad(event: any) {
            var obj = JSON.parse(event.target.result);
            setFileData(obj);
        }
        if (!!file && typeof file !== 'string') {
            if (file?.type === 'application/json') {
                var reader = new FileReader();
                reader.onload = onReaderLoad;
                reader.readAsText(file);
            } else {
                toast.warn('Sai định dạng đường dẫn');
            }
        } else if (typeof file === 'string') {
            (async () => {
                try {
                    const [res, status]: any = await uploadAPI.getFile(file);
                    if (res && status === 200) {
                        setFileData(res);
                    }
                } catch (err) {}
            })();
        }
    }, [file]);

    const properties: Array<{ key: string; value: string }> = useMemo(() => {
        const arr = [];
        if (fileData?.features[0]?.properties) {
            for (let i in fileData?.features[0]?.properties) {
                arr.push({
                    key: i,
                    value: fileData?.features[0]?.properties[i],
                });
            }
        }
        return arr;
    }, [fileData]);

    const convertColor: Array<{
        color: string;
        from: number;
        to: number;
        note: string;
    }> = useMemo(() => getColor(color), [color]);

    const handleAddColor = () => {
        setColor((prev) => {
            const arrColor = getColor(prev);
            const length = arrColor.length;
            const lastItem = arrColor[length - 1];
            return `${prev}@${lastItem.color}|${lastItem.from}_${lastItem.to}|${lastItem.note}`;
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

                    return `${o.color}|${o.from}_${o.to}|${o.note}`;
                }
                return `${v.color}|${v.from}_${v.to}|${v.note}`;
            });
            setColor(newValue.join('@'));
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

    const handleDown = useCallback(
        (i: number) => {
            const arrColor = getColor(color);
            if (i < arrColor.length - 1) {
                setColor(convertColorToString(arrayMove(arrColor, i, i + 1)));
            }
        },
        [color]
    );

    const handleUp = useCallback(
        (i: number) => {
            const arrColor = getColor(color);
            if (i > 0) {
                setColor(convertColorToString(arrayMove(arrColor, i, i - 1)));
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

    const handleChange = (e: any) => {
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
                        <div className={styles.select}>
                            <select
                                name="keyColor"
                                onChange={handleChange}
                                value={keyColor}
                            >
                                <option value="">Lựa chọn key color</option>
                                {properties.map((v, i) => (
                                    <option key={i} value={v.key}>
                                        {v.key}
                                    </option>
                                ))}
                            </select>
                            <input
                                name="titleNote"
                                value={titleNote}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Tiêu đề chú thích"
                            />
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
                                    note={v.note}
                                    color={v.color}
                                    from={v.from}
                                    to={v.to}
                                    index={i}
                                    onChange={handleChangeValue}
                                    onDelete={handleDelete}
                                    onDown={handleDown}
                                    onUp={handleUp}
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
