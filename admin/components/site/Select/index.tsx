import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import style from './Select.module.scss';

interface props {
    title: string;
    data: Array<any>;
    value: string;
    onChange?: (value: any) => void;
}

function Select({ title, data, value, onChange }: props) {
    const ref = useRef<any>(null);

    const [isTopCurent, setIsTopCurent] = useState<any>(null);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const handleClick = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShow(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [ref]);

    useEffect(() => {
        if (ref.current) {
            const winDowHeight = window.innerHeight;
            const { y } = ref.current.getBoundingClientRect();
            setIsTopCurent(winDowHeight / y > 2);
        }
    }, [ref]);

    return (
        <div className={style.groupInput}>
            <p>{title}</p>
            <div
                className={style.select}
                ref={ref}
                onClick={() => setShow(!show)}
            >
                <div>
                    <p>{value || title}</p>
                </div>
                <span className={style.icon}>
                    <RiArrowDownSLine />
                </span>
                {show && (
                    <div
                        className={clsx(style.list, {
                            [style.listTop]: !isTopCurent,
                        })}
                    >
                        {data.map((item) => (
                            <div
                                key={item.value}
                                className={style.item}
                                onClick={() => !!onChange && onChange(item)}
                            >
                                {item.txt}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Select;
