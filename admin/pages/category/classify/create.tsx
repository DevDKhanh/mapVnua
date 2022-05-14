import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import classifyAPI from '../../../api/classify';
import languageAPI from '../../../api/language';
import { useValidateAll } from '../../../common/hooks/useValidate';
import RequiredPermision from '../../../components/protected/requiredPermision';
import Input from '../../../components/site/Input';
import Select from '../../../components/site/Select';
import { DashboardLayout } from '../../../components/widgets/Layout';
import { RootState } from '../../../redux/reducers';

/*---------- type form input ----------*/
interface typeForm {
    // id: string;
    nameClassify: string;
    language: any;
    active: any;
    no: string;
}

/*---------- type form submit ----------*/
interface typeFormSubmit {
    // id: string;
    nameClassify: string;
    languageId: string;
    active: number;
    no: number;
}

/*===========> MAIN COMPONENT <==========*/
function Index() {
    const validator = useValidateAll;
    const router = useRouter();

    const { token } = useSelector((state: RootState) => state.auth);
    const [listLanguage, setListLanguage] = useState<Array<any>>([]);
    const [dataForm, setDataForm] = useState<typeForm>({
        // id: '',
        nameClassify: '',
        language: null,
        active: {
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

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setDataForm((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleChangeSelect = (v: any, name: string) => {
        setDataForm((prev: any) => ({ ...prev, [name]: v }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!validator(dataForm)) {
            toast.warn('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        const formSubmit: typeFormSubmit = {
            // id: dataForm.id,
            nameClassify: dataForm.nameClassify,
            languageId: dataForm.language.value,
            active: Number(dataForm.active.value),
            no: Number(dataForm.no),
        };

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
    };

    return (
        <DashboardLayout title="Thêm loại mới" hrefBack="/category/classify/">
            <RequiredPermision isCreate>
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
                            {/* <Input
                                title="ID phân loại"
                                value={dataForm?.id}
                                name="id"
                                onChange={handleChange}
                            /> */}
                            <Input
                                title="Tên phân loại"
                                value={dataForm?.nameClassify}
                                name="nameClassify"
                                onChange={handleChange}
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
                            <button className="btn-create">Thêm mới</button>
                        </form>
                    </div>
                </div>
            </RequiredPermision>
        </DashboardLayout>
    );
}

export default memo(Index);
