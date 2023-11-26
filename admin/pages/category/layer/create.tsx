import { Fragment, memo, useEffect, useMemo, useState } from "react";

import ButtonUpload from "../../../components/controls/ButtonUpload";
import { DATA_COLOR } from "../../../constants/config";
import { DashboardLayout } from "../../../components/widgets/Layout";
import Input from "../../../components/site/Input";
import NoteRaster from "../../../components/controls/NoteRaster";
import RequiredPermision from "../../../components/protected/requiredPermision";
import { RootState } from "../../../redux/reducers";
import Select from "../../../components/site/Select";
import SelectColorLayer from "../../../components/controls/SelectColorLayer";
import areaAPI from "../../../api/area";
import classifyAPI from "../../../api/classify";
import dynamic from "next/dynamic";
import handleGetFile from "../../../common/hooks/getFile";
import languageAPI from "../../../api/language";
import layerAPI from "../../../api/layer";
import { toast } from "react-toastify";
import uploadAPI from "../../../api/upload";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useValidateAll } from "../../../common/hooks/useValidate";

const GetCoordinatesRaster = dynamic(
  () => import("../../../components/map/GetCoordinatesRaster"),
  { ssr: false }
);

const PreviewVector = dynamic(
  () => import("../../../components/map/PreviewVector"),
  { ssr: false }
);

/*---------- type form input ----------*/
interface typeForm {
  // id: string;
  nameLayer: string;
  language: any;
  classify: any;
  area: any;
  style: any;
  path: any;
  icon: any;
  titleNote?: string;
  keyColor: string;
  typeColor: string;
  borderColor: string;
  widthBorder: string;
  opacityBorder: string;
  backgroundColor: string;
  opacityBackground: string;
  latNE: string;
  lngNE: string;
  latSW: string;
  lngSW: string;
  zIndex: string;
  dataColor: string;
  labelMap: any;
  active: any;
  mapData: any;
  checked: any;
  displayLabel: any;
  activeNote: any;
  activeTooltip: any;
}

/*---------- type form submit ----------*/
interface typeFormSubmit {
  // id: string;
  nameLayer: string;
  languageId: string;
  classifyId: string;
  areaId: string;
  style: string;
  path: string;
  icon: string;
  titleNote?: string;
  keyColor: string;
  typeColor: number;
  borderColor: string;
  widthBorder: number;
  opacityBorder: number;
  labelMap: string;
  backgroundColor: string;
  opacityBackground: number;
  latNE: number;
  lngNE: number;
  latSW: number;
  lngSW: number;
  zIndex: number;
  checked: number;
  displayLabel: number;
  active: number;
  activeNote: number;
  activeTooltip: number;
}

/*===========> MAIN COMPONENT <==========*/
function Index() {
  const router = useRouter();
  const validator = useValidateAll;
  const { token } = useSelector((state: RootState) => state.auth);

  const [fileData, setFileData] = useState<any>(null);
  const [listLanguage, setListLanguage] = useState<Array<any>>([]);
  const [listClassify, setListClassify] = useState<Array<any>>([]);
  const [listArea, setListArea] = useState<Array<any>>([]);

  const [dataForm, setDataForm] = useState<typeForm>({
    active: {
      txt: "Có",
      value: 1,
    },
    checked: {
      txt: "Không",
      value: 0,
    },
    activeNote: {
      txt: "Có",
      value: 1,
    },
    displayLabel: {
      txt: "Không",
      value: 1,
    },
    labelMap: {
      txt: "Chọn nhãn hiển thị",
      value: "",
    },
    activeTooltip: {
      txt: "Có",
      value: 1,
    },
    nameLayer: "",
    language: null,
    classify: null,
    area: null,
    style: {
      txt: "Raster",
      value: "Raster",
    },
    keyColor: "key",
    typeColor: "0",
    path: "",
    icon: "",
    dataColor: DATA_COLOR,
    borderColor: "#ccc",
    widthBorder: "1",
    opacityBorder: "1",
    backgroundColor: "#ccc",
    opacityBackground: "1",
    latNE: "15",
    lngNE: "108",
    latSW: "14",
    lngSW: "107",
    zIndex: "10",
    mapData: ".",
  });

  /*---------- get list language insert select language ----------*/
  useEffect(() => {
    (async () => {
      const [[resLang]]: any = await Promise.all([
        languageAPI.get({
          page: 1,
          pageSize: 1000,
        }),
      ]);
      if (resLang?.records) {
        setListLanguage(
          resLang.records.map((item: any) => ({
            txt: item.nameLanguage,
            value: item.id,
          }))
        );
      }
    })();
  }, []);

  useEffect(() => {
    /*---------- Xóa dữ liệu hiện có nếu thay đổi ngôn ngữ  ----------*/
    setDataForm((prev: any) => ({ ...prev, classify: null, area: null }));

    /*---------- Lọc khu vực và phân loại theo id ngôn ngữ  ----------*/
    (async () => {
      const [[resArea], [resClassify]]: any = await Promise.all([
        areaAPI.get({
          page: 1,
          pageSize: 1000,
          langId: dataForm.language?.value,
        }),
        classifyAPI.get({
          page: 1,
          pageSize: 1000,
          langId: dataForm.language?.value,
          keyword: "",
        }),
      ]);

      if (resArea?.records && resClassify?.records) {
        setListArea(
          resArea.records.map((item: any) => ({
            ...item,
            txt: item.nameArea,
            value: item.id,
          }))
        );
        setListClassify(
          resClassify.records.map((item: any) => ({
            txt: item.nameClassify,
            value: item.id,
          }))
        );
      }
    })();
  }, [dataForm.language]);

  const handleChange = (e: any, key?: any) => {
    if (key) {
      setDataForm((prev: any) => ({ ...prev, [key]: e.hex }));
    } else {
      const { name, value } = e.target;
      setDataForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleChangeFile = (e: any) => {
    const { name } = e.target;
    setDataForm((prev: any) => ({ ...prev, [name]: e.target.files[0] }));
  };

  const handleSetFile = (name: string, file: string) => {
    setDataForm((prev: any) => ({ ...prev, [name]: file }));
  };

  const handleChangeSelect = (v: any, name: string) => {
    if (name === "style") {
      setDataForm((prev: any) => ({ ...prev, path: "" }));
    }
    setDataForm((prev: any) => ({ ...prev, [name]: v }));
  };

  const handleSetPosition = (e: any) => {
    const { bottom, top } = e;
    setDataForm((prev: any) => ({
      ...prev,
      latNE: top.lat,
      lngNE: top.lng,
      latSW: bottom.lat,
      lngSW: bottom.lng,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validator(dataForm)) {
      toast.warn("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    (async () => {
      /*---------- Create file form updaload icon ----------*/
      const fileIcon = await handleGetFile(dataForm.icon, token);

      /*---------- Upload file or raster ----------*/
      const filePath = await handleGetFile(
        dataForm.path,
        token,
        dataForm?.style?.value === "Raster" ? "image" : "file"
      );

      try {
        const formSubmit: typeFormSubmit = {
          ...dataForm,
          typeColor: +dataForm.typeColor,
          titleNote: dataForm?.titleNote || dataForm.nameLayer,
          nameLayer: dataForm.nameLayer,
          languageId: dataForm.language.value,
          classifyId: dataForm.classify.value,
          areaId: dataForm.area.value,
          style: dataForm.style.value,
          path: filePath,
          icon: fileIcon,
          keyColor: dataForm.keyColor,
          borderColor: dataForm.borderColor,
          widthBorder: Number(dataForm.widthBorder),
          opacityBorder: Number(dataForm.opacityBorder),
          backgroundColor: dataForm.backgroundColor,
          opacityBackground: Number(dataForm.opacityBackground),
          latNE: Number(dataForm.latNE),
          lngNE: Number(dataForm.lngNE),
          latSW: Number(dataForm.latSW),
          lngSW: Number(dataForm.lngSW),
          zIndex: Number(dataForm.zIndex),
          active: dataForm.active.value,
          checked: dataForm.checked.value,
          labelMap: dataForm.labelMap.value,
          displayLabel: dataForm.displayLabel.value,
          activeNote: dataForm.activeNote.value,
          activeTooltip: dataForm.activeTooltip.value,
        };

        const [res, status]: any = await layerAPI.post(formSubmit, token);
        if (res && status === 200) {
          toast.success(res?.message);
          router.push("/category/layer");
        } else {
          toast.warn(res?.message);
        }
      } catch (err: any) {
        toast.error(err?.message || "Thêm mới thất bại");
      }
    })();
  };

  useEffect(() => {
    function onReaderLoad(event: any) {
      var obj = JSON.parse(event.target.result);
      setFileData(obj);
    }
    if (!!dataForm.path && typeof dataForm.path !== "string") {
      if (dataForm.path?.type === "application/json") {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(dataForm.path);
      } else {
        toast.warn("Sai định dạng đường dẫn");
      }
    } else if (typeof dataForm.path === "string") {
      (async () => {
        try {
          const [res, status]: any = await uploadAPI.getFile(dataForm.path);
          if (res && status === 200) {
            setFileData(res);
          }
        } catch (err) {}
      })();
    }
  }, [dataForm.path]);

  const properties: Array<{ txt: string; value: string }> = useMemo(() => {
    const arr = [];
    if (dataForm?.style?.value == "Vector") {
      if (fileData?.features?.[0]?.properties) {
        for (let i in fileData?.features[0]?.properties) {
          arr.push({
            txt: i,
            value: i,
          });
        }
      }
    }
    return arr;
  }, [dataForm?.style?.value, fileData?.features]);

  return (
    <DashboardLayout title="Thêm lớp mới" hrefBack="/category/layer/">
      <RequiredPermision isCreate>
        <div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <Select
                title="Ngôn ngữ"
                value={dataForm?.language?.txt}
                data={listLanguage}
                onChange={(v) => handleChangeSelect(v, "language")}
              />
              <Select
                title="Tên khu vực"
                value={dataForm?.area?.txt}
                data={listArea}
                onChange={(v) => handleChangeSelect(v, "area")}
              />
              <Select
                title="Tên phân loại"
                value={dataForm?.classify?.txt}
                data={listClassify}
                onChange={(v) => handleChangeSelect(v, "classify")}
              />
              <Input
                title="Tên lớp"
                value={dataForm?.nameLayer}
                name="nameLayer"
                onChange={handleChange}
              />
              <Select
                title="Kiểu lớp"
                value={dataForm?.style?.txt}
                data={[
                  {
                    txt: "Vector",
                    value: "Vector",
                  },
                  {
                    txt: "Raster",
                    value: "Raster",
                  },
                ]}
                onChange={(v) => handleChangeSelect(v, "style")}
              />
              <ButtonUpload
                title="Tải tệp bản đồ hoặc ảnh"
                titleData="Cập nhật tệp bản đồ hoặc ảnh"
                name="path"
                value={dataForm?.path}
                onChange={handleChangeFile}
                onSetFile={handleSetFile}
                isFile={dataForm?.style?.value !== "Raster"}
              />
              <br />
              <ButtonUpload
                title="Tải lên icon của lớp"
                titleData="Cập nhật icon của lớp"
                name="icon"
                value={dataForm?.icon}
                onChange={handleChangeFile}
                onSetFile={handleSetFile}
              />
              <br />
              <Input
                title="Thứ tự xếp chồng"
                value={dataForm?.zIndex}
                name="zIndex"
                type="number"
                onChange={handleChange}
              />

              {/*---------- Vector ----------*/}
              {dataForm?.style?.value === "Vector" && (
                <Fragment>
                  <SelectColorLayer
                    onChange={handleChange}
                    titleNote={dataForm.titleNote}
                    dataColor={dataForm.dataColor}
                    file={dataForm.path}
                    keyColor={dataForm.keyColor}
                    typeColor={dataForm.typeColor}
                  />
                  <PreviewVector data={dataForm} />
                  <Input
                    title="Màu viền"
                    isColorPicker
                    value={dataForm?.borderColor}
                    name="borderColor"
                    type="text"
                    onChange={handleChange}
                  />
                  <Input
                    title="Độ trong suốt viền"
                    value={dataForm?.opacityBorder}
                    name="opacityBorder"
                    step={0.1}
                    type="number"
                    onChange={handleChange}
                  />
                  <Input
                    title="Độ rộng viền"
                    value={dataForm?.widthBorder}
                    name="widthBorder"
                    type="number"
                    step={0.1}
                    onChange={handleChange}
                  />
                  <Input
                    title="Màu nền"
                    isColorPicker
                    value={dataForm?.backgroundColor}
                    name="backgroundColor"
                    type="text"
                    onChange={handleChange}
                  />
                  <Input
                    title="Độ trong suốt nền"
                    value={dataForm?.opacityBackground}
                    name="opacityBackground"
                    type="number"
                    step={0.1}
                    onChange={handleChange}
                  />
                  <Select
                    title="Hiển thị nhãn"
                    value={dataForm?.displayLabel?.txt}
                    data={[
                      {
                        txt: "Có",
                        value: 1,
                      },
                      {
                        txt: "Không",
                        value: 0,
                      },
                    ]}
                    onChange={(v) => handleChangeSelect(v, "displayLabel")}
                  />
                  {properties.length > 0 && (
                    <Select
                      title="Trường hiển thị nhãn"
                      value={dataForm?.labelMap?.txt}
                      data={properties}
                      onChange={(v) => handleChangeSelect(v, "labelMap")}
                    />
                  )}
                </Fragment>
              )}
              {/*---------- Raster ----------*/}
              {dataForm?.style?.value === "Raster" && (
                <Fragment>
                  <NoteRaster
                    onChange={handleChange}
                    titleNote={dataForm.titleNote}
                    dataColor={dataForm.dataColor}
                    file={dataForm.path}
                    keyColor={dataForm.keyColor}
                    typeColor={dataForm.typeColor}
                  />
                  <ButtonUpload
                    title="Chọn bản đồ bản đồ tham chiếu"
                    titleData="Chọn bản đồ bản đồ tham chiếu"
                    name="mapData"
                    value={dataForm?.mapData}
                    onChange={handleChangeFile}
                    onSetFile={handleSetFile}
                    isFile={true}
                  />
                  <br />
                  <GetCoordinatesRaster
                    file={dataForm.path}
                    dataForm={dataForm}
                    mapData={dataForm?.mapData}
                    onSetPosition={handleSetPosition}
                  />
                  <Input
                    title="Tọa độ LatSW"
                    value={dataForm?.latSW}
                    name="latSW"
                    type="number"
                    onChange={handleChange}
                  />
                  <Input
                    title="Tọa độ LngSW"
                    value={dataForm?.lngSW}
                    name="lngSW"
                    type="number"
                    onChange={handleChange}
                  />
                  <Input
                    title="Tọa độ LatNE"
                    value={dataForm?.latNE}
                    name="latNE"
                    type="number"
                    onChange={handleChange}
                  />
                  <Input
                    title="Tọa độ LngNE"
                    value={dataForm?.lngNE}
                    name="lngNE"
                    type="number"
                    onChange={handleChange}
                  />
                </Fragment>
              )}

              {/*---------- Default ----------*/}
              <Select
                title="Tích chọn"
                value={dataForm?.checked?.txt}
                data={[
                  {
                    txt: "Có",
                    value: 1,
                  },
                  {
                    txt: "Không",
                    value: 0,
                  },
                ]}
                onChange={(v) => handleChangeSelect(v, "checked")}
              />
              <Select
                title="Hiển thị chú thích"
                value={dataForm?.activeNote?.txt}
                data={[
                  {
                    txt: "Có",
                    value: 1,
                  },
                  {
                    txt: "Không",
                    value: 0,
                  },
                ]}
                onChange={(v) => handleChangeSelect(v, "activeNote")}
              />
              <Select
                title="Hiển thị popup"
                value={dataForm?.activeTooltip?.txt}
                data={[
                  {
                    txt: "Có",
                    value: 1,
                  },
                  {
                    txt: "Không",
                    value: 0,
                  },
                ]}
                onChange={(v) => handleChangeSelect(v, "activeTooltip")}
              />
              <Select
                title="Hiển thị"
                value={dataForm?.active?.txt}
                data={[
                  {
                    txt: "Có",
                    value: 1,
                  },
                  {
                    txt: "Không",
                    value: 0,
                  },
                ]}
                onChange={(v) => handleChangeSelect(v, "active")}
              />
              <button className="btn-create">Thêm mới</button>
            </form>
          </div>
        </div>
      </RequiredPermision>
    </DashboardLayout>
  );
}

export default memo(Index);
