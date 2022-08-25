import style from './ItemNote.module.scss';

function ItemNote({ data }) {
    return (
        <div className={style.table}>
            <h4>{data.titleNote}</h4>
            {data.data.map((v, i) => (
                <div className={style.item} key={i}>
                    <div
                        className={style.color}
                        style={{ backgroundColor: v.color }}
                    ></div>
                    <p>{v.note}</p>
                </div>
            ))}
        </div>
    );
}

export default ItemNote;
