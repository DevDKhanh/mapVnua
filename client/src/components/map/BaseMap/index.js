import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";

import { API } from "../../../constant/config";
import mapAPI from "../../../api/map";
import { setBaseMap } from "../../../redux/action/dataMap";
import styles from "./BaseMap.module.scss";

export default function BaseMap() {
  const { setting, baseMap } = useSelector((state) => state.dataMap);
  const dispatch = useDispatch();
  const [settingMap] = setting;
  const [listBaseMap, setListBaseMap] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      try {
        const [res] = await mapAPI.getList(null, 1, 100);
        if (!!res.records[0]) {
          setListBaseMap(res.records);
        }
      } catch (e) {}
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.currentmap}>
        <img
          src={`${API}/upload${baseMap?.urlImage || settingMap?.map?.urlImage}`}
          alt="map base"
        />
        <div className={styles.title}>Lớp bản đồ</div>
      </div>
      <div className={styles.containerList}>
        {listBaseMap.map((x) => (
          <div
            className={styles.item}
            key={x.id}
            onClick={() => dispatch(setBaseMap(x))}
          >
            <img src={`${API}/upload${x.urlImage}`} alt="map base" />
            <p>{x.ten}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
