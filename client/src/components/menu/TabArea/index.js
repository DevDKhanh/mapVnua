import { memo, useEffect, useRef, useState } from "react";
import { updateArea, updateLayer } from "../../../redux/action/dataMap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RiArrowDownSFill } from "react-icons/ri";
import areaAPI from "../../../api/area";
import clsx from "clsx";
import style from "./TabArea.module.scss";

function TabArea() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { area, language } = useSelector((state) => state.dataMap);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const updateQueryParam = (key, value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(key, value);
    navigate(`?${queryParams.toString()}`);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ref]);

  useEffect(() => {
    if (!!language) {
      (async () => {
        try {
          const kv = searchParams.get("kv");
          const [res] = await areaAPI.getList(null, 1, 100, language.id);

          if (!!res.records[0]) {
            dispatch(
              updateArea(
                res.records.find((x) => x.idArea === kv) || res.records[0]
              )
            );
            setData(res.records);
          }
        } catch (e) {}
      })();
    }
  }, [language, dispatch, searchParams]);

  const handleChange = (item) => {
    const areaData = data.filter((v, i) => v.id === item.id)[0];
    updateQueryParam("kv", areaData.idArea);
    dispatch(updateArea(areaData));
    dispatch(updateLayer([]));
    setShow(false);
  };

  return (
    <>
      {data.length > 1 ? (
        <div className={style.container} ref={ref}>
          <div
            className={clsx(style.language, style.main)}
            onClick={() => setShow(!show)}
          >
            <p>{area.nameArea}</p>
            <div className={style.icon}>
              <RiArrowDownSFill />
            </div>
          </div>
          {show && (
            <div className={style.list}>
              {data.map((item, i) => (
                <div
                  key={i}
                  className={clsx(style.language, {
                    [style.active]: area.id === item.id,
                  })}
                  onClick={() => {
                    handleChange(item);
                  }}
                >
                  <p>{item.nameArea}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default memo(TabArea);
