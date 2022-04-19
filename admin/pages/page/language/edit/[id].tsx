import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import languageAPI from '../../../../api/language';
import siteAPI from '../../../../api/site';
import uploadAPI from '../../../../api/upload';
import { useValidateAll } from '../../../../common/hooks/useValidate';
import RequiredPermision from '../../../../components/protected/requiredPermision';
import Input from '../../../../components/site/Input';
import { DashboardLayout } from '../../../../components/widgets/Layout';
import { RootState } from '../../../../redux/reducers';

/*---------- type form input ----------*/
interface typeForm {
    id: string;
    nameLanguage: string;
    icon: any;
}

/*---------- type form submit ----------*/
interface typeFormSubmit {
    id: string;
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
        id: '',
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

    const handleSubmit = (e: any) => {
        e.preventDefault();

        (async () => {
            try {
                /*---------- create submit form ----------*/
                const formSubmit: typeFormSubmit = {
                    ...dataForm,
                };

                /*---------- Create file form updaload icon ----------*/
                if (typeof dataForm.icon !== 'string') {
                    try {
                        const file: any = new FormData();
                        file.append('file', dataForm.icon);

                        /*---------- upload icon and get link icon ----------*/
                        const [URL]: any = await uploadAPI.upload(
                            'image',
                            file,
                            token
                        );
                        if (URL.filename) {
                            formSubmit.icon = URL.filename;
                        }
                        toast.warn(URL?.message);
                    } catch (err: any) {
                        toast.warn(err?.message);
                    }
                }

                const [res, status]: any = await languageAPI.update(
                    id,
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
                            <Input
                                title="Icon"
                                value={dataForm?.icon?.path}
                                name="icon"
                                type="file"
                                onChange={handleChangeFile}
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
