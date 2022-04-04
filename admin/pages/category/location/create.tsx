import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import areaAPI from '../../../api/area';
import languageAPI from '../../../api/language';
import { useValidateAll } from '../../../common/hooks/useValidate';
import Input from '../../../components/site/Input';
import Select from '../../../components/site/Select';
import { DashboardLayout } from '../../../components/widgets/Layout';
import { RootState } from '../../../redux/reducers';

/*---------- type form input ----------*/
interface typeForm {
    id: string;
    nameArea: string;
    language: any;
    lat: string;
    lng: string;
    active: any;
    zoom: string;
}

/*---------- type form submit ----------*/
interface typeFormSubmit {
    id: string;
    nameArea: string;
    languageId: string;
    lat: number;
    lng: number;
    active: number;
    zoom: number;
}

/*===========> MAIN COMPONENT <==========*/
function index() {
    const validator = useValidateAll;
    const { token } = useSelector((state: RootState) => state.auth);
    const [listLanguage, setListLanguage] = useState<Array<any>>([]);
    const [dataForm, setDataForm] = useState<typeForm>({
        id: '',
        nameArea: '',
        language: null,
        lat: '',
        lng: '',
        active: {
            txt: 'Có',
            value: 1,
        },
        zoom: '6',
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
            id: dataForm.id,
            nameArea: dataForm.nameArea,
            languageId: dataForm.language.value,
            lat: Number(dataForm.lat),
            lng: Number(dataForm.lng),
            active: Number(dataForm.active.value),
            zoom: Number(dataForm.zoom),
        };

        (async () => {
            try {
                const [res, status]: any = await areaAPI.post(
                    formSubmit,
                    token
                );
                if (res && status === 200) {
                    toast.success(res?.message);

                    /*---------- Clear form ----------*/
                    setDataForm({
                        id: '',
                        nameArea: '',
                        language: null,
                        lat: '',
                        lng: '',
                        active: {
                            txt: 'Có',
                            value: 1,
                        },
                        zoom: '',
                    });
                } else {
                    toast.warn(res?.message);
                }
            } catch (err: any) {
                toast.error(err?.message || 'Thêm mới thất bại');
            }
        })();
    };

    const GetCoordinates = dynamic(
        () => import('../../../components/map/GetCoordinates'),
        { ssr: false }
    );

    return (
        <DashboardLayout
            title="Thêm khu vực mới"
            hrefBack="/category/location/"
        >
            <div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <Input
                            title="ID khu vực"
                            value={dataForm?.id}
                            name="id"
                            onChange={handleChange}
                        />
                        <Input
                            title="Tên khu vực"
                            value={dataForm?.nameArea}
                            name="nameArea"
                            onChange={handleChange}
                        />
                        <Input
                            title="Tọa độ Lat"
                            value={dataForm?.lat}
                            name="lat"
                            type="number"
                            onChange={handleChange}
                        />
                        <Input
                            title="Tọa độ Lng"
                            value={dataForm?.lng}
                            name="lng"
                            type="number"
                            onChange={handleChange}
                        />
                        <Input
                            title="Zoom"
                            value={dataForm?.zoom}
                            name="zoom"
                            type="number"
                            onChange={handleChange}
                        />
                        <Select
                            title="Ngôn ngữ"
                            value={dataForm?.language?.txt}
                            data={listLanguage}
                            onChange={(v) => handleChangeSelect(v, 'language')}
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
                            onChange={(v) => handleChangeSelect(v, 'active')}
                        />
                        <button className="btn-create">Thêm mới</button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default memo(index);
