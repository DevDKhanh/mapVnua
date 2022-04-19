import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import languageAPI from '../../../../api/language';
import displayAPI from '../../../../api/display';
import { useValidateAll } from '../../../../common/hooks/useValidate';
import RequiredPermision from '../../../../components/protected/requiredPermision';
import Input from '../../../../components/site/Input';
import Select from '../../../../components/site/Select';
import { DashboardLayout } from '../../../../components/widgets/Layout';
import { RootState } from '../../../../redux/reducers';
import siteAPI from '../../../../api/site';

/*---------- type form input ----------*/
interface typeForm {
    keyword: string;
    language: any;
    trans: string;
}

/*---------- type form submit ----------*/
interface typeFormSubmit {
    keyword: string;
    languageId: string;
    trans: string;
}

/*===========> MAIN COMPONENT <==========*/
function Index() {
    const validator = useValidateAll;
    const router = useRouter();
    const { id } = router.query;

    const { token } = useSelector((state: RootState) => state.auth);
    const [listLanguage, setListLanguage] = useState<Array<any>>([]);
    const [dataForm, setDataForm] = useState<typeForm>({
        keyword: '',
        language: null,
        trans: '',
    });

    /*---------- get list language insert select language ----------*/
    useEffect(() => {
        (async () => {
            const [res, status]: any = await languageAPI.get({
                page: 1,
                pageSize: 100,
            });
            if (res && status === 200) {
                setListLanguage(
                    res.records.map((item: any) => ({
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
                    const [res, status]: any = await siteAPI.get(
                        'display',
                        id,
                        token
                    );
                    if (res && status === 200) {
                        const { data } = res;
                        setDataForm({
                            ...data,
                            language: {
                                value: data.language.id,
                                txt: data.language.nameLanguage,
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

    const handleChangeSelect = (v: any, name: string) => {
        setDataForm((prev: any) => ({ ...prev, [name]: v }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        (async () => {
            try {
                const formSubmit: typeFormSubmit = {
                    languageId: dataForm.language.value,
                    keyword: dataForm.keyword,
                    trans: dataForm.trans,
                };

                const [res, status]: any = await displayAPI.update(
                    id,
                    formSubmit,
                    token
                );
                if (res && status === 200) {
                    toast.success(res?.message);
                    router.push('/page/display/');
                } else {
                    toast.warn(res?.message);
                }
            } catch (err: any) {
                toast.error(err?.message || 'Thêm mới thất bại');
            }
        })();
    };

    return (
        <DashboardLayout title="Chỉnh sửa giao diện" hrefBack="/page/display/">
            <RequiredPermision isEdit>
                <div>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <Select
                                title="Ngôn ngữ"
                                value={dataForm?.language?.txt}
                                data={listLanguage}
                                onChange={(v) =>
                                    handleChangeSelect(v, 'language')
                                }
                            />
                            <Input
                                title="Tiêu đề"
                                value={dataForm?.keyword}
                                name="keyword"
                                onChange={handleChange}
                            />
                            <Input
                                title="Nội dung"
                                value={dataForm?.trans}
                                name="trans"
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
