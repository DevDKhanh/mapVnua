import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  convertColorToString,
  convertColorToString2,
  getColor,
  getColor2,
  stringToColour,
} from "../../../common/func/convertColor";

import { Add } from "iconsax-react";
import { DATA_COLOR } from "../../../constants/config";
import Draggable from "react-draggable";
import InputColor from "./components/InputColor";
import InputColor2 from "./components/InputColor2";
import LoadingScreen from "../LoadingScreen";
import { RiCloseFill } from "react-icons/ri";
import { arrayMove } from "../../../common/func/helper";
import clsx from "clsx";
import colorAPI from "../../../api/color";
import { copy } from "../../../common/func/copy";
import styles from "./SelectColorLayer.module.scss";
import { toast } from "react-toastify";
import uploadAPI from "../../../api/upload";

function SelectColorLayer({
  onChange,
  dataColor,
  file,
  keyColor,
  typeColor,
  titleNote,
}: any) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>(DATA_COLOR);
  const [valueKey, setValueKey] = useState<Array<string>>([]);
  const [fileData, setFileData] = useState<any>(null);

  useEffect(() => {
    if (dataColor) {
      setColor(dataColor);
    }
  }, [dataColor]);

  useEffect(() => {
    if (fileData?.features && typeColor !== "0" && keyColor !== "key") {
      setLoading(true);
      new Promise((resolve, reject) => {
        const arr: Array<any> = [];
        for (let v of fileData?.features) {
          if (!arr.includes(v.properties[keyColor])) {
            arr.push(v.properties[keyColor]);
          }
        }
        resolve(arr);
      })
        .then((data: any) => {
          setLoading(false);
          setValueKey(() => data);
        })
        .catch((err) => setLoading(false));
    }
  }, [fileData?.features, keyColor, typeColor]);

  const handleChangeKey = useCallback(() => {
    if (valueKey.length > 0) {
      setLoading(true);
      new Promise((resolve, reject) => {
        const colorString = convertColorToString2(
          valueKey.map((v: any, i: number) => {
            return {
              color: stringToColour(`${v}`),
              value: v,
              note: v,
            };
          })
        );
        resolve(colorString);
      })
        .then((data: any) => {
          setLoading(false);
          setColor(data);
        })
        .catch((err) => setLoading(false));
    }
  }, [valueKey]);

  useEffect(() => {
    function onReaderLoad(event: any) {
      var obj = JSON.parse(event.target.result);
      setFileData(obj);
    }
    if (!!file && typeof file !== "string") {
      if (file?.type === "application/json") {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(file);
      } else {
        toast.warn("Sai định dạng đường dẫn");
      }
    } else if (typeof file === "string") {
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

  const convertColor: Array<any> = useMemo(
    () => (typeColor == "0" ? getColor(color) : getColor2(color)),
    [color, typeColor]
  );

  const handleAddColor = useCallback(() => {
    setColor((prev) => {
      const arrColor = typeColor == "0" ? getColor(prev) : getColor2(prev);
      const length = arrColor.length;
      const lastItem: any = arrColor[length - 1];

      if (typeColor == "0") {
        return `${prev}@${lastItem.color}|${lastItem.from}_${lastItem.to}|${lastItem.note}`;
      } else {
        return `${prev}@${lastItem.color}|${lastItem.value}|${lastItem.note}`;
      }
    });
  }, [typeColor]);

  const handleChangeValue = useCallback(
    (e: any, i: number) => {
      const { value, name } = e.target;
      const arrColor = typeColor == "0" ? getColor(color) : getColor2(color);

      console.log(arrColor);

      const newValue = arrColor.map((v: any, index) => {
        if (index === i) {
          const o: any = {
            ...v,
            [name]: value,
          };

          return typeColor == "0"
            ? `${o.color}|${o.from}_${o.to}|${o.note}`
            : `${o.color}|${o.value}|${o.note}`;
        }
        return typeColor == "0"
          ? `${v.color}|${v.from}_${v.to}|${v.note}`
          : `${v.color}|${v.value}|${v.note}`;
      });
      setColor(newValue.join("@"));
    },
    [color, typeColor]
  );

  const handleDelete = useCallback(
    (i: number) => {
      const arrColor: any =
        typeColor == "0" ? getColor(color) : getColor2(color);
      if (arrColor.length > 1) {
        const newValue: any = arrColor.filter(
          (v: any, index: any) => index !== i
        );
        setColor(
          typeColor == "0"
            ? convertColorToString(newValue)
            : convertColorToString2(newValue)
        );
      } else {
        toast.warn("Vui lòng giữ lại tối thiểu 1 dải màu");
      }
    },
    [color, typeColor]
  );

  const handleDown = useCallback(
    (i: number) => {
      const arrColor: any =
        typeColor == "0" ? getColor(color) : getColor2(color);
      if (i < arrColor.length - 1) {
        if (typeColor == "0") {
          setColor(convertColorToString(arrayMove(arrColor, i, i + 1)));
        } else {
          setColor(convertColorToString2(arrayMove(arrColor, i, i + 1)));
        }
      }
    },
    [color, typeColor]
  );

  const handleUp = useCallback(
    (i: number) => {
      const arrColor: any =
        typeColor == "0" ? getColor(color) : getColor2(color);
      if (i > 0) {
        if (typeColor == "0") {
          setColor(convertColorToString(arrayMove(arrColor, i, i - 1)));
        } else {
          setColor(convertColorToString2(arrayMove(arrColor, i, i - 1)));
        }
      }
    },
    [color, typeColor]
  );

  const handleSubmit = useCallback(() => {
    const e = {
      target: {
        name: "dataColor",
        value: color,
      },
    };
    onChange(e);
  }, [color, onChange]);

  const handleChange = (e: any) => {
    onChange(e);
  };

  const handleSearchColors = useCallback((colors: any[]) => {
    (async () => {
      const [res, status]: any = await colorAPI.searchColors(
        { data: colors },
        ""
      );

      if (res.code == 200) {
        setColor(convertColorToString2(res.data));
      }
    })();
  }, []);

  return (
    <Fragment>
      <LoadingScreen isLoading={loading} />
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
              <span>
                <p onClick={handleChangeKey}>Cập nhật dải màu theo file</p>
                <p onClick={() => copy(color)}> Chép dữ liệu</p>
              </span>
            </div>
            <div className={styles.select}>
              <select
                name="keyColor"
                onChange={(e) => {
                  handleChange(e);
                }}
                value={keyColor}
              >
                <option value="key">Lựa chọn key color</option>
                {properties.map((v, i) => (
                  <option key={i} value={v.key}>
                    {v.key}
                  </option>
                ))}
              </select>
              <select
                name="typeColor"
                onChange={(e) => {
                  handleChange(e);
                }}
                value={typeColor}
              >
                <option value="0">Nhập khoảng giá trị</option>
                <option value="1">Nhập theo trường giá trị</option>
              </select>
              <input
                name="titleNote"
                value={titleNote}
                onChange={handleChange}
                className={styles.input}
                placeholder="Tiêu đề chú thích"
              />
              {typeColor == "1" ? (
                <div
                  className={styles.btnSearch}
                  onClick={() => {
                    handleSearchColors(convertColor);
                  }}
                >
                  Tra cứu màu
                </div>
              ) : null}
            </div>
            <div className={styles.btnClose} onClick={() => setOpen(false)}>
              <RiCloseFill />
            </div>
            <div className={styles.main}>
              {convertColor.map((v, i) => {
                if (typeColor == "0") {
                  return (
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
                  );
                } else {
                  return (
                    <InputColor2
                      key={i}
                      note={v.note}
                      color={v.color}
                      value={v.value}
                      index={i}
                      onChange={handleChangeValue}
                      onDelete={handleDelete}
                      onDown={handleDown}
                      onUp={handleUp}
                    />
                  );
                }
              })}
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
