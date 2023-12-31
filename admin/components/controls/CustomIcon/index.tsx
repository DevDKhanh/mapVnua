import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { RiCloseFill, RiInformationFill } from "react-icons/ri";

import { API_URL } from "../../../constants/config";
import { Button } from "@mui/material";
import ImageN from "next/image";
import PaginationCustom from "../../site/PaginationCustom";
import Popup from "../Popup";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import styles from "./CustomIcon.module.scss";
import { toast } from "react-toastify";
import uploadAPI from "../../../api/upload";

export default function CustomIcon({ form, setForm }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [fileData, setFileData] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [valueKey, setValueKey] = useState<string>("");

  const handleOpen = useCallback(() => {
    if (fileData?.features) {
      setOpen(true);
    } else {
      toast.warn("Vui lòng chọn file");
    }
  }, [data?.length, fileData?.features]);

  useEffect(() => {
    if (fileData?.features) {
      const dataFeatures = fileData?.features;
      const { properties, geometry } = fileData?.features?.[0];
      if (valueKey != "key" && properties && geometry?.type == "Point") {
        const uniqueArray = [
          ...new Set(dataFeatures.map((x: any) => x.properties[valueKey])),
        ];
        setData(uniqueArray.map((x) => ({ id: x, icon: "", note: "" })));
      }
    }
  }, [valueKey]);

  useEffect(() => {
    function onReaderLoad(event: any) {
      var obj = JSON.parse(event.target.result);
      setFileData(obj);
    }
    if (!!form.file && typeof form.file !== "string") {
      if (form.file?.type === "application/json") {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(form.file);
      } else {
        toast.warn("Sai định dạng đường dẫn");
      }
    } else if (typeof form.file === "string") {
      (async () => {
        try {
          const [res, status]: any = await uploadAPI.getFile(form.file);
          if (res && status === 200) {
            setFileData(res);
          }
        } catch (err) {}
      })();
    }
  }, [form.file]);

  useEffect(() => {
    setData(form.defaultData);
    setValueKey(form.keyIcon);
  }, [form?.defaultData]);

  const selectFile = (file: any, index: number) => {
    const icon = typeof file == "string" ? file : getLink(file);
    const fileIcon = typeof file == "string" ? null : file;

    setData((prev: any[]) => {
      prev[index] = { ...prev[index], icon, fileIcon };
      return [...prev];
    });
  };

  const setNote = (content: string, index: number) => {
    setData((prev: any[]) => {
      prev[index] = { ...prev[index], note: content };
      return [...prev];
    });
  };

  function getLink(file: any) {
    return URL.createObjectURL(file);
  }

  const handleSubmit = () => {
    setOpen(false);
    setForm((prev: any) => ({ ...prev, dataIcon: data, keyIcon: valueKey }));
  };

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

  return fileData?.features?.[0]?.geometry?.type == "Point" ? (
    <div>
      <div
        className={styles.btn}
        onClick={handleOpen}
        style={{ marginBottom: 24 }}
      >
        Tùy chỉnh Icon điểm
      </div>
      <Popup open={open} onClose={() => setOpen(false)}>
        <div className={styles.form}>
          <div>
            <div className={styles.btnClose} onClick={() => setOpen(false)}>
              <RiCloseFill />
            </div>
            <h2>Tuỳ chỉnh Icon điểm</h2>
            <select
              name="keyColor"
              onChange={(e: any) => {
                setValueKey(e.target.value);
              }}
              value={valueKey}
            >
              <option value="key">Lựa chọn key icon</option>
              {properties.map((v, i) => (
                <option key={i} value={v.key}>
                  {v.key}
                </option>
              ))}
            </select>
            <div className={styles.list}>
              {data?.map((x, i) => (
                <Item
                  key={x.id}
                  data={x}
                  index={i}
                  selectFile={selectFile}
                  setNote={setNote}
                />
              ))}
            </div>
            <br />
            <Button
              variant="contained"
              disabled={
                JSON.stringify(form?.defaultData) == JSON.stringify(data)
              }
              onClick={handleSubmit}
            >
              Áp dụng
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  ) : null;
}

function Item({ data, index, selectFile, setNote }: any) {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(() => false);
  };

  const handleOpen = () => {
    setShow(() => true);
  };

  const info = useMemo(() => {
    const info = [];
    for (let i in data?.properties) {
      info.push(
        <div>
          <p>
            <b>{i}: </b>
            {data?.properties[i]}
          </p>
        </div>
      );
    }
    return info;
  }, [data]);

  return (
    <Fragment>
      <div className={styles.item}>
        <Tippy content={info}>
          <i>
            <RiInformationFill />
          </i>
        </Tippy>
        <div className={styles.icon} onClick={handleOpen}>
          {data?.icon ? (
            <img
              src={
                typeof data?.icon == "string" &&
                data?.icon?.startsWith("/image")
                  ? `${API_URL}/upload${data.icon}`
                  : data.icon
              }
              alt="icon"
            />
          ) : (
            <p>Tải ảnh lên</p>
          )}
        </div>
        {data.icon ? (
          <input
            value={data.note}
            placeholder="Nhập ghi chú cho icon..."
            onChange={(e) => setNote(e.target.value, index)}
          />
        ) : null}
      </div>
      <Popup open={show} onClose={handleClose}>
        <div className={styles.main}>
          <div className={styles.content}>
            <MainSelectImage
              onClose={handleClose}
              onSelect={(e: any) => selectFile(e, index)}
            />
          </div>
          <div className={styles.btnClose} onClick={handleClose}>
            <RiCloseFill />
          </div>
        </div>
      </Popup>
    </Fragment>
  );
}

function MainSelectImage(props: any) {
  const pageSize: number = 8;
  const [dataFiles, setDataFiles] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const handleSelect = (path: string) => {
    props.onSelect(path);
    props.onClose();
  };

  useEffect(() => {
    (async () => {
      try {
        const [res]: any = await uploadAPI.getPaths({
          page,
          pageSize,
          type: 0,
        });
        setLoading(false);
        setDataFiles(res.records);
        setTotalItem(res.total);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, [page]);

  return (
    <div className={styles.selectImage}>
      <div className={styles.header}>
        <div className={styles.headerBtn}>
          <label className={styles.btnSelect} onClick={() => {}}>
            <input
              type="file"
              hidden
              name={props.name}
              onChange={(e: any) => {
                props.onSelect(e.target.files[0]);
                props.onClose();
              }}
              value={props.value?.path}
            />
            Tải tệp mới
          </label>
        </div>
        <h3 className={styles.title}>
          {props.isFile ? "Tệp trong thư viện" : "Ảnh trong thư viện"}
        </h3>
      </div>
      {!loading && totalItem > 0 ? (
        <Fragment>
          <div className={styles.listImage}>
            {dataFiles.map((file) => (
              <div
                key={file.id}
                className={styles.item}
                onClick={() => handleSelect(file.path)}
              >
                <ImageN
                  src={`${API_URL}/upload${file.path}`}
                  layout="fill"
                  alt="anh"
                />
              </div>
            ))}
          </div>
          <br />
          <PaginationCustom
            pageSize={pageSize}
            page={page}
            totalItem={totalItem}
            onSetPage={setPage}
          />
        </Fragment>
      ) : (
        <p className={styles.note}>Chưa có dữ liệu tệp cho mục này</p>
      )}
    </div>
  );
}
