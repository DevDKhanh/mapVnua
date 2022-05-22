import { DocumentUpload, Image } from 'iconsax-react';
import { Fragment, useState } from 'react';
import ImageN from 'next/image';
import { RiArrowGoBackLine, RiCloseFill } from 'react-icons/ri';
import Popup from '../Popup';
import style from './ButtonUpload.module.scss';
import clsx from 'clsx';

interface props {
    title: string;
    name: string;
    value: any;
    onChange: (event: any) => void;
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
                            <MainSelectImage onSetmethod={setMethod} />
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
                <h4>Chức năng sắp ra mắt</h4>
                {/* <div className={style.item}>
                    <ImageN
                        src={
                            'https://genk.mediacdn.vn/139269124445442048/2021/3/13/ava-1615607562651629147713.jpeg'
                        }
                        layout="fill"
                        alt="anh"
                    />
                </div>
                <div className={style.item}>
                    <ImageN
                        src={
                            'https://genk.mediacdn.vn/139269124445442048/2021/3/13/ava-1615607562651629147713.jpeg'
                        }
                        layout="fill"
                        alt="anh"
                    />
                </div>
                <div className={style.item}>
                    <ImageN
                        src={
                            'https://genk.mediacdn.vn/139269124445442048/2021/3/13/ava-1615607562651629147713.jpeg'
                        }
                        layout="fill"
                        alt="anh"
                    />
                </div>
                <div className={style.item}>
                    <ImageN
                        src={
                            'https://genk.mediacdn.vn/139269124445442048/2021/3/13/ava-1615607562651629147713.jpeg'
                        }
                        layout="fill"
                        alt="anh"
                    />
                </div>
                <div className={style.item}>
                    <ImageN
                        src={
                            'https://genk.mediacdn.vn/139269124445442048/2021/3/13/ava-1615607562651629147713.jpeg'
                        }
                        layout="fill"
                        alt="anh"
                    />
                </div>
                <div className={style.item}>
                    <ImageN
                        src={
                            'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png'
                        }
                        layout="fill"
                        alt="anh"
                    />
                </div>
                <div className={style.item}>
                    <ImageN
                        src={
                            'https://genk.mediacdn.vn/zoom/223_140/139269124445442048/2022/5/22/avatar1653188711222-1653188711803343302696.jpg'
                        }
                        layout="fill"
                        alt="anh"
                    />
                </div> */}
            </div>
        </div>
    );
}
