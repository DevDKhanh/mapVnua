import { memo, useEffect, useState } from "react";

import ButtonUpload from "../../../../components/controls/ButtonUpload";
import { DashboardLayout } from "../../../../components/widgets/Layout";
import Input from "../../../../components/site/Input";
import RequiredPermision from "../../../../components/protected/requiredPermision";
import { RootState } from "../../../../redux/reducers";
import Select from "../../../../components/site/Select";
import dynamic from "next/dynamic";
import handleGetFile from "../../../../common/hooks/getFile";
import languageAPI from "../../../../api/language";
import settingAPI from "../../../../api/setting";
import siteAPI from "../../../../api/site";
import { toast } from "react-toastify";
import uploadAPI from "../../../../api/upload";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const GetCoordinates = dynamic(
  () => import("../../../../components/map/GetCoordinates"),
  { ssr: false }
);
/*---------- type form input ----------*/
interface typeForm {
  language: any;
  map: any;
  title: string;
  slogan: string;
  lat: string;
  lng: string;
  zoom: string;
  icon: any;
}

/*---------- type form submit ----------*/
interface typeFormSubmit {
  languageId: string;
  mapId: string;
  title: string;
  slogan: string;
  lat: number;
  lng: number;
  zoom: number;
  icon: string;
}

/*===========> MAIN COMPONENT <==========*/
function Index() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useSelector((state: RootState) => state.auth);

  const [listMap, setListMap] = useState<Array<any>>([]);
  const [listLanguage, setListLanguage] = useState<Array<any>>([]);
  const [dataForm, setDataForm] = useState<typeForm>({
    language: "",
    map: "",
    slogan: "",
    icon: "",
    title: "",
    zoom: "6",
    lat: "",
    lng: "",
  });

  /*---------- get list language insert select language ----------*/
  useEffect(() => {
    (async () => {
      const [[resLang, statusLang], [resMap]]: any = await Promise.all([
        languageAPI.get({
          page: 1,
          pageSize: 100,
        }),
        settingAPI.getMaps(),
      ]);
      if (resMap) {
        setListMap(
          resMap.data.map((item: any) => ({
            txt: item.ten,
            value: item.id,
          }))
        );
      }
      if (resLang && statusLang === 200) {
        setListLanguage(
          resLang.records.map((item: any) => ({
            txt: item.nameLanguage,
            value: item.id,
          }))
        );
      }
    })();
  }, []);

  /*---------- Get info data insert form ----------*/
  useEffect(() => {
    if (token && id) {
      (async () => {
        try {
          const [res, status]: any = await siteAPI.get("setting", id, token);
          if (res && status === 200) {
            const { data } = res;
            setDataForm({
              ...data,
              language: {
                value: data.language.id,
                txt: data.language.nameLanguage,
              },
              map: {
                value: data?.map?.id,
                txt: data?.map?.ten,
              },
            });
          }
        } catch (err) {}
      })();
    }
  }, [id, token]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDataForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleChangeFile = (e: any) => {
    const { name } = e.target;
    setDataForm((prev: any) => ({ ...prev, [name]: e.target.files[0] }));
  };

  const handleSetFile = (name: string, file: string) => {
    setDataForm((prev: any) => ({ ...prev, [name]: file }));
  };

  const handleChangeSelect = (v: any, name: string) => {
    setDataForm((prev: any) => ({ ...prev, [name]: v }));
  };

  const handleSetPosition = (e: any) => {
    setDataForm({ ...dataForm, ...e });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    (async () => {
      try {
        const fileName = await handleGetFile(dataForm.icon, token);
        const formSubmit: typeFormSubmit = {
          languageId: dataForm.language.value,
          mapId: dataForm.map.value,
          title: dataForm.title,
          slogan: dataForm.slogan,
          icon: fileName,
          lat: Number(dataForm.lat),
          lng: Number(dataForm.lng),
          zoom: Number(dataForm.zoom),
        };

        const [res, status]: any = await settingAPI.update(
          id,
          formSubmit,
          token
        );

        if (res && status === 200) {
          toast.success(res?.message);
          router.push("/page/setting/");
        } else {
          toast.warn(res?.message);
        }
      } catch (err: any) {
        toast.error(err?.message || "Thêm mới thất bại");
      }
    })();
  };

  return (
    <DashboardLayout title="Chỉnh sửa cấu hình" hrefBack="/page/setting/">
      <RequiredPermision isEdit>
        <div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <Select
                title="Ngôn ngữ"
                value={dataForm?.language?.txt}
                data={listLanguage}
                onChange={(v) => handleChangeSelect(v, "language")}
              />
              {listMap.length > 0 ? (
                <Select
                  title="Bản đồ"
                  value={dataForm?.map?.txt}
                  data={listMap}
                  onChange={(v) => handleChangeSelect(v, "map")}
                />
              ) : null}
              <Input
                title="Tiêu đề"
                value={dataForm?.title}
                name="title"
                onChange={handleChange}
              />
              <Input
                title="Slogan"
                value={dataForm?.slogan}
                name="slogan"
                onChange={handleChange}
              />
              <GetCoordinates
                position={[dataForm.lat, dataForm.lng]}
                onSetPosition={handleSetPosition}
              />
              <Input
                title="Tọa độ Lat"
                value={dataForm?.lat}
                name="lat"
                type="number"
                onChange={handleChange}
              />
              <Input
                title="Tọa độ Lng"
                value={dataForm?.lng}
                name="lng"
                type="number"
                onChange={handleChange}
              />
              <Input
                title="Zoom"
                value={dataForm?.zoom}
                name="zoom"
                type="number"
                onChange={handleChange}
              />
              <ButtonUpload
                title="Tải lên icon"
                titleData="Cập nhật icon"
                name="icon"
                value={dataForm?.icon}
                onChange={handleChangeFile}
                onSetFile={handleSetFile}
              />
              <br />
              <button className="btn-create">Cập nhật</button>
            </form>
          </div>
        </div>
      </RequiredPermision>
    </DashboardLayout>
  );
}

export default memo(Index);
