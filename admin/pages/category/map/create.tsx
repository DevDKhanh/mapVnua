import { memo, useState } from "react";

import ButtonUpload from "../../../components/controls/ButtonUpload";
import { DashboardLayout } from "../../../components/widgets/Layout";
import Input from "../../../components/site/Input";
import RequiredPermision from "../../../components/protected/requiredPermision";
import { RootState } from "../../../redux/reducers";
import colorAPI from "../../../api/color";
import handleGetFile from "../../../common/hooks/getFile";
import mapAPI from "../../../api/map";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useValidateAll } from "../../../common/hooks/useValidate";

/*---------- type form input ----------*/
interface typeForm {
  ten: string;
  urlImage: string;
  url: string;
}

/*===========> MAIN COMPONENT <==========*/
function Index() {
  const validator = useValidateAll;
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  const [dataForm, setDataForm] = useState<typeForm>({
    ten: "",
    urlImage: "",
    url: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDataForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validator(dataForm)) {
      toast.warn("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    (async () => {
      try {
        /*---------- Create file form updaload icon ----------*/
        const urlImage = await handleGetFile(dataForm.urlImage, token);

        const [res, status]: any = await mapAPI.post(
          { ...dataForm, urlImage },
          token
        );
        if (res && status === 201) {
          toast.success(res?.message);
          router.push("/category/map");
        } else {
          toast.warn(res?.message);
        }
      } catch (err: any) {
        toast.error(err?.message || "Thêm mới thất bại");
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
    <DashboardLayout title="Thêm bản đồ nền mới" hrefBack="/category/map/">
      <RequiredPermision isCreate>
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
              <button className="btn-create">Thêm mới</button>
            </form>
          </div>
        </div>
      </RequiredPermision>
    </DashboardLayout>
  );
}

export default memo(Index);
