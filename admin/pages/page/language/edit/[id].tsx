import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import languageAPI from '../../../../api/language';
import siteAPI from '../../../../api/site';
import uploadAPI from '../../../../api/upload';
import handleGetFile from '../../../../common/hooks/getFile';
import { useValidateAll } from '../../../../common/hooks/useValidate';
import ButtonUpload from '../../../../components/controls/ButtonUpload';
import RequiredPermision from '../../../../components/protected/requiredPermision';
import Input from '../../../../components/site/Input';
import { DashboardLayout } from '../../../../components/widgets/Layout';
import { RootState } from '../../../../redux/reducers';

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
    const router = useRouter();
    const { id } = router.query;
    const { token } = useSelector((state: RootState) => state.auth);

    const [dataForm, setDataForm] = useState<typeForm>({
        icon: '',
        nameLanguage: '',
        idLanguage: '',
    });

    /*---------- Get info data insert form ----------*/
    useEffect(() => {
        if (token && id) {
            (async () => {
                try {
                    const [res, status]: any = await siteAPI.get(
                        'language',
                        id,
                        token
                    );
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

    const handleChangeFile = (e: any) => {
        const { name } = e.target;
        setDataForm((prev: any) => ({ ...prev, [name]: e.target.files[0] }));
    };

    const handleSetFile = (name: string, file: string) => {
        setDataForm((prev: any) => ({ ...prev, [name]: file }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        (async () => {
            try {
                /*---------- create submit form ----------*/
                const fileName = await handleGetFile(dataForm.icon, token);
                const formSubmit: typeFormSubmit = {
                    ...dataForm,
                };

                const [res, status]: any = await languageAPI.update(
                    id,
                    { ...formSubmit, icon: fileName },
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
        <DashboardLayout title="Chỉnh sửa ngôn ngữ" hrefBack="/page/language/">
            <RequiredPermision isEdit>
                <div>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <Input
                                title="Tên ngôn ngữ"
                                value={dataForm?.nameLanguage}
                                name="nameLanguage"
                                onChange={handleChange}
                            />
                            <ButtonUpload
                                title="Cập nhật icon"
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
