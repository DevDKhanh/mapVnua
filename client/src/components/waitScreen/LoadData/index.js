import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import classifyAPI from "../../../api/classify";
import { dataMapAdd } from "../../../redux/action/dataMap";
import images from "../../../constant/image";
import layerAPI from "../../../api/layer";
import settingAPI from "../../../api/setting";
import style from "./LoadData.module.scss";

function LoadData({ children }) {
  const pageSize = 100;
  const dispacth = useDispatch();
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);

  const { language } = useSelector((state) => state.dataMap);

  useEffect(() => {
    (async () => {
      try {
        const [[classifys], [setting], [layers]] = await Promise.all([
          classifyAPI.getList(null, page, pageSize, language.id),
          settingAPI.getList(null, page, pageSize),
          layerAPI.getList(null, page, pageSize),
        ]);

        dispacth(
          dataMapAdd(layers.records, classifys.records, setting.records)
        );

        let timer = setTimeout(() => {
          setLoading(false);
          clearTimeout(timer);
        }, 1500);
      } catch (err) {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, page]);
  return <>{loading ? <Loading /> : children}</>;
}

const Loading = () => {
  return (
    <div className={style.mainLoad}>
      <h1>Hệ thống đang tải dữ liệu</h1>
      <img src={images.iconLoading} alt="loading data" />
    </div>
  );
};

export default LoadData;
