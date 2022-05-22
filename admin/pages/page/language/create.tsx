import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import languageAPI from '../../../api/language';
import uploadAPI from '../../../api/upload';
import { useValidateAll } from '../../../common/hooks/useValidate';
import ButtonUpload from '../../../components/controls/ButtonUpload';
import RequiredPermision from '../../../components/protected/requiredPermision';
import Input from '../../../components/site/Input';
import { DashboardLayout } from '../../../components/widgets/Layout';
import { RootState } from '../../../redux/reducers';

/*---------- type form input ----------*/
interface typeForm {
    idLanguage: string;
    nameLanguage: string;
    icon: any;
}

/*---------- type form submit ----------*/
interface typeFormSubmit {
    idLanguage: string;
    nameLanguage: string;
    icon: string;
}

/*===========> MAIN COMPONENT <==========*/
function Index() {
    const validator = useValidateAll;
    const router = useRouter();

    const { token } = useSelector((state: RootState) => state.auth);
    const [dataForm, setDataForm] = useState<typeForm>({
        icon: '',
        nameLanguage: '',
        idLanguage: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setDataForm((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleChangeFile = (e: any) => {
        const { name } = e.target;
        setDataForm((prev: any) => ({ ...prev, [name]: e.target.files[0] }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!validator(dataForm)) {
            toast.warn('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        (async () => {
            try {
                /*---------- Create file form updaload icon ----------*/
                const file: any = new FormData();
                file.append('file', dataForm.icon);

                /*---------- upload icon and get link icon ----------*/
                const [URL]: any = await uploadAPI.upload('image', file, token);

                /*---------- create submit form ----------*/
                const formSubmit: typeFormSubmit = {
                    ...dataForm,
                    icon: `${URL.filename}`,
                };

                const [res, status]: any = await languageAPI.post(
                    formSubmit,
                    token
                );
                if (res && status === 200) {
                    toast.success(res?.message);
                    router.push('/page/language/');
                } else {
                    toast.warn(res?.message);
                }
            } catch (err: any) {
                toast.error(err?.message || 'Thêm mới thất bại');
            }
        })();
    };

    return (
        <DashboardLayout title="Thêm ngôn ngữ mới" hrefBack="/page/language/">
            <RequiredPermision isCreate>
                <div>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <Input
                                title="ID ngôn ngữ"
                                value={dataForm?.idLanguage}
                                name="idLanguage"
                                onChange={handleChange}
                            />
                            <Input
                                title="Tên ngôn ngữ"
                                value={dataForm?.nameLanguage}
                                name="nameLanguage"
                                onChange={handleChange}
                            />
                            <ButtonUpload
                                title="Tải lên icon"
                                name="icon"
                                value={dataForm?.icon}
                                onChange={handleChangeFile}
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
