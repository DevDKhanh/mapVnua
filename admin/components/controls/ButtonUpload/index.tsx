import { DocumentText1, DocumentUpload, Image } from 'iconsax-react';
import { Fragment, useEffect, useState } from 'react';
import ImageN from 'next/image';
import { RiArrowGoBackLine, RiCloseFill } from 'react-icons/ri';
import Popup from '../Popup';
import style from './ButtonUpload.module.scss';
import clsx from 'clsx';
import uploadAPI from '../../../api/upload';
import { API_URL } from '../../../constants/config';
import PaginationCustom from '../../site/PaginationCustom';

interface props {
    isFile?: boolean;
    title: string;
    titleData: string;
    name: string;
    value: any;
    onChange: (event: any) => void;
    onSetFile: (name: string, file: string) => void;
}

function ButtonUpload(props: props) {
    const [show, setShow] = useState<boolean>(false);
    const [method, setMethod] = useState<number>(0);

    const handleClose = () => {
        setShow(false);
        setMethod(0);
    };

    const handleOpen = () => {
        setShow(true);
        setMethod(0);
    };

    return (
        <Fragment>
            <div className={style.container}>
                <div
                    className={clsx(style.btn, {
                        [style.active]: props.value !== '',
                    })}
                    onClick={handleOpen}
                >
                    {props.value !== '' ? props.titleData : props.title}
                </div>
            </div>
            <Popup open={show} onClose={handleClose}>
                <div className={style.main}>
                    <div className={style.content}>
                        <MainSelectImage
                            onSetmethod={setMethod}
                            onClose={handleClose}
                            {...props}
                        />
                    </div>
                    <div className={style.btnClose} onClick={handleClose}>
                        <RiCloseFill />
                    </div>
                </div>
            </Popup>
        </Fragment>
    );
}

export default ButtonUpload;

function MainSelectImage(props: any) {
    const pageSize: number = 8;
    const [dataFiles, setDataFiles] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalItem, setTotalItem] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const handleSelect = (path: string) => {
        props.onSetFile(props.name, path);
        props.onClose();
    };

    useEffect(() => {
        (async () => {
            try {
                const [res]: any = await uploadAPI.getPaths({
                    page,
                    pageSize,
                    type: props.isFile ? 1 : 0,
                });
                setLoading(false);
                setDataFiles(res.records);
                setTotalItem(res.total);
            } catch (err) {
                setLoading(false);
            }
        })();
    }, [page, props.isFile]);

    return (
        <div className={style.selectImage}>
            <div className={style.header}>
                <div className={style.headerBtn}>
                    <label className={style.btnSelect} onClick={() => {}}>
                        <input
                            type="file"
                            hidden
                            name={props.name}
                            onChange={(e: any) => {
                                props.onChange(e);
                                props.onClose();
                            }}
                            value={props.value?.path}
                        />
                        Tải tệp mới
                    </label>
                </div>
                <h3 className={style.title}>
                    {props.isFile ? 'Tệp trong thư viện' : 'Ảnh trong thư viện'}
                </h3>
            </div>
            {!loading && totalItem > 0 ? (
                <Fragment>
                    {props.isFile ? (
                        <div className={style.listFile}>
                            {dataFiles.map((file) => (
                                <div
                                    className={clsx(style.itemFile, {
                                        [style.active]: false,
                                    })}
                                    key={file.id}
                                    onClick={() => handleSelect(file.path)}
                                >
                                    <DocumentText1 size="32" />
                                    <p>{file.path.split('/')[2]}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={style.listImage}>
                            {dataFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className={style.item}
                                    onClick={() => handleSelect(file.path)}
                                >
                                    <ImageN
                                        src={` ${API_URL}/upload${file.path}`}
                                        layout="fill"
                                        alt="anh"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <br />
                    <PaginationCustom
                        pageSize={pageSize}
                        page={page}
                        totalItem={totalItem}
                        onSetPage={setPage}
                    />
                </Fragment>
            ) : (
                <p className={style.note}>Chưa có dữ liệu tệp cho mục này</p>
            )}
        </div>
    );
}
