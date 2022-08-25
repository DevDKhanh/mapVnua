import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import classifyAPI from '../../../../api/classify';
import languageAPI from '../../../../api/language';
import siteAPI from '../../../../api/site';
import RequiredPermision from '../../../../components/protected/requiredPermision';
import Input from '../../../../components/site/Input';
import Select from '../../../../components/site/Select';
import { DashboardLayout } from '../../../../components/widgets/Layout';
import { RootState } from '../../../../redux/reducers';

/*---------- type form input ----------*/
interface typeForm {
    nameClassify: string;
    language: any;
    active: any;
    show: any;
    no: string;
}

/*---------- type form submit ----------*/
interface typeFormSubmit {
    nameClassify: string;
    languageId: string;
    active: number;
    show: number;
    no: number;
}

/*===========> MAIN COMPONENT <==========*/
function Index() {
    const router = useRouter();
    const { id, addLanguage } = router.query;
    const { token } = useSelector((state: RootState) => state.auth);
    const [listLanguage, setListLanguage] = useState<Array<any>>([]);
    const [dataForm, setDataForm] = useState<typeForm>({
        nameClassify: '',
        language: null,
        active: {
            txt: 'Có',
            value: 1,
        },
        show: {
            txt: 'Có',
            value: 1,
        },
        no: '',
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
                        'classify',
                        id,
                        token
                    );
                    if (res && status === 200) {
                        const { data } = res;
                        setDataForm({
                            nameClassify: data.nameClassify,
                            language: {
                                value: data.language.id,
                                txt: data.language.nameLanguage,
                            },
                            active: {
                                txt: data.active ? 'Có' : 'Không',
                                value: data.active,
                            },
                            show: {
                                txt: data.show ? 'Có' : 'Không',
                                value: data.show,
                            },
                            no: data.no,
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

        const formSubmit: typeFormSubmit = {
            nameClassify: dataForm.nameClassify,
            languageId: dataForm.language.value,
            active: Number(dataForm.active.value),
            show: Number(dataForm.show.value),
            no: Number(dataForm.no),
        };

        if (!addLanguage) {
            (async () => {
                try {
                    const [res, status]: any = await classifyAPI.update(
                        id,
                        formSubmit,
                        token
                    );
                    if (res && status === 200) {
                        toast.success(res?.message);
                        router.push('/category/classify/');
                    } else {
                        toast.warn(res?.message);
                    }
                } catch (err: any) {
                    toast.error(err?.message || 'Cập nhật thất bại');
                }
            })();
        } else {
            (async () => {
                try {
                    const [res, status]: any = await classifyAPI.post(
                        formSubmit,
                        token
                    );
                    if (res && status === 200) {
                        toast.success(res?.message);
                    } else {
                        toast.warn(res?.message);
                    }
                } catch (err: any) {
                    toast.error(err?.message || 'Thêm mới thất bại');
                }
            })();
        }
    };

    return (
        <DashboardLayout
            title={
                !!addLanguage
                    ? 'Thêm ngôn ngữ mới cho phân loại'
                    : 'Chỉnh sửa phân loại'
            }
            hrefBack="/category/classify/"
        >
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
                                title="Số thứ tự"
                                value={dataForm?.no}
                                name="no"
                                typr="number"
                                onChange={handleChange}
                            />
                            <Input
                                title="Tên phân loại"
                                value={dataForm?.nameClassify}
                                name="nameClassify"
                                onChange={handleChange}
                            />
                            <Select
                                title="Cụp xòe phân loại"
                                value={dataForm?.show?.txt}
                                data={[
                                    {
                                        txt: 'Có',
                                        value: 1,
                                    },
                                    {
                                        txt: 'Không',
                                        value: 0,
                                    },
                                ]}
                                onChange={(v) => handleChangeSelect(v, 'show')}
                            />
                            <Select
                                title="Hiển thị"
                                value={dataForm?.active?.txt}
                                data={[
                                    {
                                        txt: 'Có',
                                        value: 1,
                                    },
                                    {
                                        txt: 'Không',
                                        value: 0,
                                    },
                                ]}
                                onChange={(v) =>
                                    handleChangeSelect(v, 'active')
                                }
                            />
                            <button className="btn-create">
                                {!!addLanguage ? 'Thêm mới ' : 'Cập nhật'}
                            </button>
                        </form>
                    </div>
                </div>
            </RequiredPermision>
        </DashboardLayout>
    );
}

export default memo(Index);
