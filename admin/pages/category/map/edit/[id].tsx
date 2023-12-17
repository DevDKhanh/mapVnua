import { memo, useEffect, useState } from "react";

import ButtonUpload from "../../../../components/controls/ButtonUpload";
import { DashboardLayout } from "../../../../components/widgets/Layout";
import Input from "../../../../components/site/Input";
import RequiredPermision from "../../../../components/protected/requiredPermision";
import { RootState } from "../../../../redux/reducers";
import areaAPI from "../../../../api/area";
import colorAPI from "../../../../api/color";
import languageAPI from "../../../../api/language";
import mapAPI from "../../../../api/map";
import siteAPI from "../../../../api/site";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

/*---------- type form input ----------*/
interface typeForm {
  ten: string;
  urlImage: string;
  url: string;
}

/*===========> MAIN COMPONENT <==========*/
function Index() {
  const router = useRouter();
  const { id, addLanguage } = router.query;
  const { token } = useSelector((state: RootState) => state.auth);

  const [dataForm, setDataForm] = useState<typeForm>({
    ten: "",
    urlImage: "",
    url: "",
  });

  /*---------- Get info data insert form ----------*/
  useEffect(() => {
    if (token && id) {
      (async () => {
        try {
          const [res, status]: any = await siteAPI.get("map", id, token);
          if (res && status === 200) {
            const { data } = res;
            setDataForm({
              ...data,
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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    (async () => {
      try {
        const [res, status]: any = await mapAPI.update(id, dataForm, token);

        if (res && status === 200) {
          toast.success(res?.message);
          router.push("/category/map/");
        } else {
          toast.warn(res?.message);
        }
      } catch (err: any) {
        toast.error(err?.message || "Cập nhật thất bại");
      }
    })();
  };

  const handleChangeFile = (e: any) => {
    const { name } = e.target;
    setDataForm((prev: any) => ({ ...prev, [name]: e.target.files[0] }));
  };

  const handleSetFile = (name: string, file: string) => {
    setDataForm((prev: any) => ({ ...prev, [name]: file }));
  };

  return (
    <DashboardLayout title={"Chỉnh sửa bản đồ nền"} hrefBack="/category/map/">
      <RequiredPermision isEdit>
        <div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <Input
                title="Tên bản đồ"
                value={dataForm?.ten}
                name="ten"
                onChange={handleChange}
              />
              <Input
                title="URL"
                value={dataForm?.url}
                name="url"
                onChange={handleChange}
              />
              <ButtonUpload
                title="Chọn ảnh đại diện"
                titleData="Cập nhật ảnh đại diện"
                name="urlImage"
                value={dataForm?.urlImage}
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
