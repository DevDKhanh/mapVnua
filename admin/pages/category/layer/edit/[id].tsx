import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment, memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import areaAPI from '../../../../api/area';
import classifyAPI from '../../../../api/classify';
import languageAPI from '../../../../api/language';
import layerAPI from '../../../../api/layer';
import siteAPI from '../../../../api/site';
import uploadAPI from '../../../../api/upload';
import RequiredPermision from '../../../../components/protected/requiredPermision';
import Input from '../../../../components/site/Input';
import Select from '../../../../components/site/Select';
import { DashboardLayout } from '../../../../components/widgets/Layout';
import { RootState } from '../../../../redux/reducers';

const GetCoordinatesRaster = dynamic(
    () => import('../../../../components/map/GetCoordinatesRaster'),
    { ssr: false }
);

const PreviewVector = dynamic(
    () => import('../../../../components/map/PreviewVector'),
    { ssr: false }
);

/*---------- type form input ----------*/
interface typeForm {
    nameLayer: string;
    language: any;
    classify: any;
    area: any;
    style: any;
    path: any;
    icon: any;
    borderColor: string;
    widthBorder: string;
    opacityBorder: string;
    backgroundColor: string;
    opacityBackground: string;
    latNE: string;
    lngNE: string;
    latSW: string;
    lngSW: string;
    zIndex: string;
    active: any;
}

/*---------- type form submit ----------*/
interface typeFormSubmit {
    nameLayer: string;
    languageId: string;
    classifyId: string;
    areaId: string;
    style: string;
    path?: string;
    icon?: string;
    borderColor: string;
    widthBorder: number;
    opacityBorder: number;
    backgroundColor: string;
    opacityBackground: number;
    latNE: number;
    lngNE: number;
    latSW: number;
    lngSW: number;
    zIndex: number;
    active: number;
}

/*===========> MAIN COMPONENT <==========*/
function Index() {
    const router = useRouter();
    const { id } = router.query;
    const { token } = useSelector((state: RootState) => state.auth);

    const [listLanguage, setListLanguage] = useState<Array<any>>([]);
    const [listClassify, setListClassify] = useState<Array<any>>([]);
    const [listArea, setListArea] = useState<Array<any>>([]);

    const [dataForm, setDataForm] = useState<typeForm>({
        active: {
            txt: 'Có',
            value: 1,
        },
        nameLayer: '',
        language: null,
        classify: null,
        area: null,
        style: {
            txt: 'Vector',
            value: 'Vector',
        },
        path: '',
        icon: '',
        borderColor: '#ccc',
        widthBorder: '1',
        opacityBorder: '1',
        backgroundColor: '#ccc',
        opacityBackground: '1',
        latNE: '15',
        lngNE: '108',
        latSW: '14',
        lngSW: '107',
        zIndex: '10',
    });

    /*---------- get list language insert select language ----------*/
    useEffect(() => {
        (async () => {
            const [[resLang]]: any = await Promise.all([
                languageAPI.get({
                    page: 1,
                    pageSize: 1000,
                }),
            ]);
            if (resLang?.records) {
                setListLanguage(
                    resLang.records.map((item: any) => ({
                        txt: item.nameLanguage,
                        value: item.id,
                    }))
                );
            }
        })();
    }, []);

    useEffect(() => {
        /*---------- Lọc khu vực và phân loại theo id ngôn ngữ  ----------*/
        (async () => {
            const [[resArea], [resClassify]]: any = await Promise.all([
                areaAPI.get({
                    page: 1,
                    pageSize: 1000,
                    langId: dataForm.language?.value,
                }),
                classifyAPI.get({
                    page: 1,
                    pageSize: 1000,
                    langId: dataForm.language?.value,
                }),
            ]);

            if (resArea?.records && resClassify?.records) {
                setListArea(
                    resArea.records.map((item: any) => ({
                        txt: item.nameArea,
                        value: item.id,
                    }))
                );
                setListClassify(
                    resClassify.records.map((item: any) => ({
                        txt: item.nameClassify,
                        value: item.id,
                    }))
                );
            }
        })();

        return () => {
            if (dataForm.language !== null) {
                /*---------- Xóa dữ liệu hiện có nếu thay đổi ngôn ngữ  ----------*/
                setDataForm((prev: any) => ({
                    ...prev,
                    classify: null,
                    area: null,
                }));
            }
        };
    }, [dataForm.language]);

    /*---------- Get info data insert form ----------*/
    useEffect(() => {
        if (token && id) {
            (async () => {
                try {
                    const [res, status]: any = await siteAPI.get(
                        'layer',
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
                            nameLayer: data.nameLayer,
                            language: {
                                value: data.language.id,
                                txt: data.language.nameLanguage,
                            },
                            classify: {
                                value: data.classify.id,
                                txt: data.classify.nameClassify,
                            },
                            area: {
                                value: data.area.id,
                                txt: data.area.nameArea,
                            },
                            style: {
                                txt: data.style,
                                value: data.style,
                            },
                        });
                    }
                } catch (err) {}
            })();
        }
    }, [id, token]);

    const handleChange = (e: any, key?: any) => {
        if (key) {
            setDataForm((prev: any) => ({ ...prev, [key]: e.hex }));
        } else {
            const { name, value } = e.target;
            setDataForm((prev: any) => ({ ...prev, [name]: value }));
        }
    };

    const handleChangeFile = (e: any) => {
        const { name } = e.target;
        setDataForm((prev: any) => ({ ...prev, [name]: e.target.files[0] }));
    };

    const handleChangeSelect = (v: any, name: string) => {
        setDataForm((prev: any) => ({ ...prev, [name]: v }));
    };

    const handleSetPosition = (e: any) => {
        const { bottom, top } = e;
        setDataForm((prev: any) => ({
            ...prev,
            latNE: top.lat,
            lngNE: top.lng,
            latSW: bottom.lat,
            lngSW: bottom.lng,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        (async () => {
            const formSubmit: typeFormSubmit = {
                nameLayer: dataForm.nameLayer,
                languageId: dataForm.language.value,
                classifyId: dataForm.classify.value,
                areaId: dataForm.area.value,
                style: dataForm.style.value,
                borderColor: dataForm.borderColor,
                widthBorder: Number(dataForm.widthBorder),
                opacityBorder: Number(dataForm.opacityBorder),
                backgroundColor: dataForm.backgroundColor,
                icon: dataForm.icon,
                path: dataForm.path,
                opacityBackground: Number(dataForm.opacityBackground),
                latNE: Number(dataForm.latNE),
                lngNE: Number(dataForm.lngNE),
                latSW: Number(dataForm.latSW),
                lngSW: Number(dataForm.lngSW),
                zIndex: Number(dataForm.zIndex),
                active: dataForm.active.value,
            };
            /*---------- Create file form updaload icon ----------*/

            if (typeof dataForm.icon !== 'string') {
                try {
                    const file: any = new FormData();
                    file.append('file', dataForm.icon);
                    const [URL_icon]: any = await uploadAPI.upload(
                        'image',
                        file,
                        token
                    );
                    if (URL_icon) {
                        formSubmit.icon = URL_icon.filename;
                    }

                    toast.warn(URL_icon?.message);
                } catch (err: any) {
                    toast.warn(err?.message);
                }
            }

            if (typeof dataForm.path !== 'string') {
                /*---------- Upload file or raster ----------*/
                try {
                    const filePath: any = new FormData();
                    filePath.append('file', dataForm.path);
                    const [URL_path]: any = await uploadAPI.upload(
                        dataForm?.style?.value === 'Raster' ? 'image' : 'file',
                        filePath,
                        token
                    );
                    if (URL_path) {
                        formSubmit.path = URL_path.filename;
                    }

                    toast.warn(URL_path?.message);
                } catch (err: any) {
                    toast.warn(err?.message);
                }
            }

            try {
                const [res, status]: any = await layerAPI.update(
                    id,
                    formSubmit,
                    token
                );
                if (res && status === 200) {
                    toast.success(res?.message);
                    router.push('/category/layer/');
                } else {
                    toast.warn(res?.message);
                }
            } catch (err: any) {
                toast.error(err?.message || 'Thêm mới thất bại');
            }
        })();
    };

    return (
        <DashboardLayout title="Chỉnh sửa lớp" hrefBack="/category/layer/">
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
                            <Select
                                title="Tên khu vực"
                                value={dataForm?.area?.txt}
                                data={listArea}
                                onChange={(v) => handleChangeSelect(v, 'area')}
                            />
                            <Select
                                title="Tên phân loại"
                                value={dataForm?.classify?.txt}
                                data={listClassify}
                                onChange={(v) =>
                                    handleChangeSelect(v, 'classify')
                                }
                            />
                            <Input
                                title="Tên lớp"
                                value={dataForm?.nameLayer}
                                name="nameLayer"
                                onChange={handleChange}
                            />
                            <Select
                                title="Kiểu lớp"
                                value={dataForm?.style?.txt}
                                data={[
                                    {
                                        txt: 'Vector',
                                        value: 'Vector',
                                    },
                                    {
                                        txt: 'Raster',
                                        value: 'Raster',
                                    },
                                ]}
                                onChange={(v) => handleChangeSelect(v, 'style')}
                            />
                            <Input
                                title="Đường dẫn tệp hoặc ảnh"
                                value={dataForm?.path?.path}
                                name="path"
                                type="file"
                                onChange={handleChangeFile}
                            />
                            <Input
                                title="Icon của lớp"
                                value={dataForm?.icon?.path}
                                name="icon"
                                type="file"
                                onChange={handleChangeFile}
                            />
                            <Input
                                title="Lớp xếp chồng"
                                value={dataForm?.zIndex}
                                name="zIndex"
                                type="number"
                                onChange={handleChange}
                            />

                            {/*---------- Vector ----------*/}
                            {dataForm?.style?.value === 'Vector' && (
                                <Fragment>
                                    <PreviewVector data={dataForm} />
                                    <Input
                                        title="Màu viền"
                                        isColorPicker
                                        value={dataForm?.borderColor}
                                        name="borderColor"
                                        type="text"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        title="Màu nền"
                                        isColorPicker
                                        value={dataForm?.backgroundColor}
                                        name="backgroundColor"
                                        type="text"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        title="Độ trong suốt viền"
                                        value={dataForm?.opacityBorder}
                                        name="opacityBorder"
                                        type="number"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        title="Độ rộng viền"
                                        value={dataForm?.widthBorder}
                                        name="widthBorder"
                                        type="number"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        title="Độ trong nền viền"
                                        value={dataForm?.opacityBackground}
                                        name="opacityBackground"
                                        type="number"
                                        onChange={handleChange}
                                    />
                                </Fragment>
                            )}
                            {/*---------- Raster ----------*/}
                            {dataForm?.style?.value === 'Raster' && (
                                <Fragment>
                                    <GetCoordinatesRaster
                                        file={dataForm.path}
                                        dataForm={dataForm}
                                        onSetPosition={handleSetPosition}
                                    />
                                    <Input
                                        title="Tọa độ LatSW"
                                        value={dataForm?.latSW}
                                        name="latSW"
                                        type="number"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        title="Tọa độ LngSW"
                                        value={dataForm?.lngSW}
                                        name="lngSW"
                                        type="number"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        title="Tọa độ LatNE"
                                        value={dataForm?.latNE}
                                        name="latNE"
                                        type="number"
                                        onChange={handleChange}
                                    />
                                    <Input
                                        title="Tọa độ LngNE"
                                        value={dataForm?.lngNE}
                                        name="lngNE"
                                        type="number"
                                        onChange={handleChange}
                                    />
                                </Fragment>
                            )}

                            {/*---------- Default ----------*/}
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
                            <button className="btn-create">Cập nhật</button>
                        </form>
                    </div>
                </div>
            </RequiredPermision>
        </DashboardLayout>
    );
}

export default memo(Index);
