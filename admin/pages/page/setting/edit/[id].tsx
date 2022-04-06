import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import languageAPI from '../../../../api/language';
import settingAPI from '../../../../api/setting';
import siteAPI from '../../../../api/site';
import uploadAPI from '../../../../api/upload';
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
    language: any;
    title: string;
    lat: string;
    lng: string;
    zoom: string;
    icon: any;
}

/*---------- type form submit ----------*/
interface typeFormSubmit {
    languageId: string;
    title: string;
    lat: number;
    lng: number;
    zoom: number;
    icon: string;
}

/*===========> MAIN COMPONENT <==========*/
function index() {
    const router = useRouter();
    const { id } = router.query;
    const { token } = useSelector((state: RootState) => state.auth);

    const [listLanguage, setListLanguage] = useState<Array<any>>([]);
    const [dataForm, setDataForm] = useState<typeForm>({
        language: '',
        icon: '',
        title: '',
        zoom: '6',
        lat: '',
        lng: '',
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
                        'setting',
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

    const handleChangeFile = (e: any) => {
        const { name } = e.target;
        setDataForm((prev: any) => ({ ...prev, [name]: e.target.files[0] }));
    };

    const handleChangeSelect = (v: any, name: string) => {
        setDataForm((prev: any) => ({ ...prev, [name]: v }));
    };

    const handleSetPosition = (e: any) => {
        setDataForm({ ...dataForm, ...e });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        (async () => {
            try {
                const formSubmit: typeFormSubmit = {
                    languageId: dataForm.language.value,
                    title: dataForm.title,
                    icon: dataForm.icon,
                    lat: Number(dataForm.lat),
                    lng: Number(dataForm.lng),
                    zoom: Number(dataForm.zoom),
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

                const [res, status]: any = await settingAPI.update(
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
        <DashboardLayout title="Chỉnh sửa cấu hình" hrefBack="/page/setting/">
            <div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <Select
                            title="Ngôn ngữ"
                            value={dataForm?.language?.txt}
                            data={listLanguage}
                            onChange={(v) => handleChangeSelect(v, 'language')}
                        />
                        <Input
                            title="Tiêu đề"
                            value={dataForm?.title}
                            name="title"
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
            <GetCoordinates
                position={[dataForm.lat, dataForm.lng]}
                onSetPosition={handleSetPosition}
            />
        </DashboardLayout>
    );
}

export default memo(index);
