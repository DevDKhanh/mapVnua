import { useState } from 'react';
import style from './ItemNote.module.scss';

function ItemNote({ data, index }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={style.container}>
            {open && (
                <div className={style.table}>
                    <h4>{data.titleNote}</h4>
                    {data.data.map((v, i) => (
                        <div className={style.item} key={i}>
                            <div
                                className={style.color}
                                style={{ backgroundColor: v.color }}
                            ></div>
                            <p>
                                {v.from} - {v.to}: {v.note}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <div className={style.btn} onClick={() => setOpen(!open)}>
                Chú giải {index + 1}
            </div>
        </div>
    );
}

export default ItemNote;
