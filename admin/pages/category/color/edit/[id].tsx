import { memo, useEffect, useState } from "react";

import { DashboardLayout } from "../../../../components/widgets/Layout";
import Input from "../../../../components/site/Input";
import RequiredPermision from "../../../../components/protected/requiredPermision";
import { RootState } from "../../../../redux/reducers";
import areaAPI from "../../../../api/area";
import colorAPI from "../../../../api/color";
import languageAPI from "../../../../api/language";
import siteAPI from "../../../../api/site";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

/*---------- type form input ----------*/
interface typeForm {
  code: string;
  description: string;
  red: string;
  green: string;
  blue: string;
}

/*===========> MAIN COMPONENT <==========*/
function Index() {
  const router = useRouter();
  const { id, addLanguage } = router.query;
  const { token } = useSelector((state: RootState) => state.auth);

  const [dataForm, setDataForm] = useState<typeForm>({
    code: "",
    description: "",
    red: "",
    green: "",
    blue: "",
  });

  /*---------- Get info data insert form ----------*/
  useEffect(() => {
    if (token && id) {
      (async () => {
        try {
          const [res, status]: any = await siteAPI.get("colors", id, token);
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
        const [res, status]: any = await colorAPI.update(id, dataForm, token);

        if (res && status === 200) {
          toast.success(res?.message);
          router.push("/category/color/");
        } else {
          toast.warn(res?.message);
        }
      } catch (err: any) {
        toast.error(err?.message || "Cập nhật thất bại");
      }
    })();
  };

  return (
    <DashboardLayout title={"Chỉnh sửa mã màu"} hrefBack="/category/colors/">
      <RequiredPermision isEdit>
        <div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <Input
                title="Mã màu"
                value={dataForm?.code}
                name="code"
                onChange={handleChange}
              />
              <Input
                title="Mô tả"
                value={dataForm?.description}
                name="description"
                onChange={handleChange}
              />
              <Input
                title="RED"
                value={dataForm?.red}
                name="red"
                type="number"
                min={0}
                max={255}
                onChange={handleChange}
              />
              <Input
                title="GREEN"
                value={dataForm?.green}
                name="green"
                type="number"
                min={0}
                max={255}
                onChange={handleChange}
              />
              <Input
                title="BLUE"
                value={dataForm?.blue}
                name="blue"
                type="number"
                min={0}
                max={255}
                onChange={handleChange}
              />
              <button className="btn-create">Cập nhật</button>
            </form>
          </div>
        </div>
      </RequiredPermision>
    </DashboardLayout>
  );
}

export default memo(Index);
