import { DocumentUpload, Image } from 'iconsax-react';
import { Fragment, useEffect, useState } from 'react';
import ImageN from 'next/image';
import { RiArrowGoBackLine, RiCloseFill } from 'react-icons/ri';
import Popup from '../Popup';
import style from './ButtonUpload.module.scss';
import clsx from 'clsx';
import uploadAPI from '../../../api/upload';
import { API_URL } from '../../../constants/config';

interface props {
    title: string;
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
                    {props.title}
                </div>
            </div>
            <Popup open={show} onClose={handleClose}>
                <div className={style.main}>
                    <div className={style.content}>
                        {method === 0 && (
                            <MainSelect
                                onSetmethod={setMethod}
                                onClose={handleClose}
                                {...props}
                            />
                        )}
                        {method === 1 && (
                            <MainSelectImage
                                onSetmethod={setMethod}
                                onClose={handleClose}
                                {...props}
                            />
                        )}
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

function MainSelect(props: any) {
    return (
        <div className={style.select}>
            <div
                className={style.btnSelect}
                onClick={() => props.onSetmethod(1)}
            >
                <Image />
                Chọn tệp có sẵn
            </div>
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
                <div className={style.icon}>
                    <DocumentUpload />
                </div>
                Tải tệp mới
            </label>
        </div>
    );
}

function MainSelectImage(props: any) {
    const [dataFiles, setDataFiles] = useState<Array<any>>([]);
    const [page, setPage] = useState<number>(1);
    const [type, setType] = useState<number>(0);

    const handleSelect = (path: string) => {
        props.onSetFile(props.name, path);
        props.onClose();
    };

    useEffect(() => {
        (async () => {
            try {
                const [res]: any = await uploadAPI.getPaths({
                    page,
                    pageSize: 16,
                    type,
                });

                setDataFiles(res.records);
            } catch (err) {}
        })();
    }, [page, type]);

    return (
        <div className={style.selectImage}>
            <div className={style.header}>
                <div
                    className={style.btnBack}
                    onClick={() => props.onSetmethod(0)}
                >
                    <RiArrowGoBackLine />
                </div>
                <h3>Ảnh trong thư viện</h3>
            </div>
            <div className={style.listImage}>
                {dataFiles.map((file, i) => (
                    <div
                        key={i}
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
        </div>
    );
}
