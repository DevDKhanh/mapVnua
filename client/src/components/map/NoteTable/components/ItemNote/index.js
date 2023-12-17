import { API } from "../../../../../constant/config";
import style from "./ItemNote.module.scss";

function ItemNote({ data }) {
  console.log(data.arrIcon);
  return (
    <div className={style.table}>
      {data.data.length > 0 ? (
        <>
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
        </>
      ) : (
        <>
          <div className={style.icon}>
            <img src={API + "/upload" + data.icon} alt="" />
            <p>{data.titleNote}</p>
          </div>
          {data?.arrIcon?.map((v, i) => (
            <div className={style.icon} key={i}>
              <img src={API + "/upload" + v.icon} alt="" />
              <p>{v.note}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ItemNote;
