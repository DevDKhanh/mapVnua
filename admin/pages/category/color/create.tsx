import { memo, useState } from "react";

import { DashboardLayout } from "../../../components/widgets/Layout";
import Input from "../../../components/site/Input";
import RequiredPermision from "../../../components/protected/requiredPermision";
import { RootState } from "../../../redux/reducers";
import colorAPI from "../../../api/color";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useValidateAll } from "../../../common/hooks/useValidate";

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
  const validator = useValidateAll;
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  const [dataForm, setDataForm] = useState<typeForm>({
    code: "",
    description: "",
    red: "",
    green: "",
    blue: "",
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
        const [res, status]: any = await colorAPI.post(dataForm, token);
        if (res && status === 201) {
          toast.success(res?.message);
          router.push("/category/color");
        } else {
          toast.warn(res?.message);
        }
      } catch (err: any) {
        toast.error(err?.message || "Thêm mới thất bại");
      }
    })();
  };

  return (
    <DashboardLayout title="Thêm mã màu mới" hrefBack="/category/color/">
      <RequiredPermision isCreate>
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
              <button className="btn-create">Thêm mới</button>
            </form>
          </div>
        </div>
      </RequiredPermision>
    </DashboardLayout>
  );
}

export default memo(Index);
