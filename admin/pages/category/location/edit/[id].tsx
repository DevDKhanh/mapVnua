import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import areaAPI from '../../../../api/area';
import languageAPI from '../../../../api/language';
import siteAPI from '../../../../api/site';
import { useValidateAll } from '../../../../common/hooks/useValidate';
import Input from '../../../../components/site/Input';
import Select from '../../../../components/site/Select';
import { DashboardLayout } from '../../../../components/widgets/Layout';
import { RootState } from '../../../../redux/reducers';

const GetCoordinates = dynamic(
    () => import('../../../../components/map/GetCoordinates'),
    { ssr: false }
);
/*---------- type form input ----------*/
interface typeForm {
    nameArea: string;
    language: any;
    lat: string;
    lng: string;
    active: any;
    zoom: string;
}

/*---------- type form submit ----------*/
interface typeFormSubmit {
    nameArea: string;
    languageId: string;
    lat: number;
    lng: number;
    active: number;
    zoom: number;
}

/*===========> MAIN COMPONENT <==========*/
function index() {
    const router = useRouter();
    const { id } = router.query;
    const { token } = useSelector((state: RootState) => state.auth);

    const [listLanguage, setListLanguage] = useState<Array<any>>([]);
    const [dataForm, setDataForm] = useState<typeForm>({
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

    /*---------- Get info data insert form ----------*/
    useEffect(() => {
        if (token && id) {
            (async () => {
                try {
                    const [res, status]: any = await siteAPI.get(
                        'area',
                        id,
                        token
                    );
                    if (res && status === 200) {
                        const { data } = res;
                        setDataForm({
                            ...data,
                            active: {
                                txt: data.active ? 'Có' : 'Không',
                                value: data.active,
                            },
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

    const handleSetPosition = (e: any) => {
        setDataForm({ ...dataForm, ...e });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const formSubmit: typeFormSubmit = {
            nameArea: dataForm.nameArea,
            languageId: dataForm.language.value,
            lat: Number(dataForm.lat),
            lng: Number(dataForm.lng),
            active: Number(dataForm.active.value),
            zoom: Number(dataForm.zoom),
        };

        (async () => {
            try {
                const [res, status]: any = await areaAPI.update(
                    id,
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
        <DashboardLayout
            title="Chỉnh sửa khu vực"
            hrefBack="/category/location/"
        >
            <div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
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
                        <button className="btn-create">Cập nhật</button>
                    </form>
                </div>
            </div>
            <GetCoordinates
                position={[dataForm.lat, dataForm.lng]}
                onSetPosition={handleSetPosition}
            />
        </DashboardLayout>
    );
}

export default memo(index);
