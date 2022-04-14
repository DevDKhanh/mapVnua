import { Fragment, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import style from './GetCoordinates.module.scss';
import MoveRaster from './MoveRaster';
import { toast } from 'react-toastify';

const Map = ({ file, dataForm, onSetPosition }: any) => {
    const [showMap, setShowMap] = useState<boolean>(false);

    const handleShowMap = () => {
        if (!file) {
            toast.warning(
                'Vui lòng chọn hình ảnh trước khi thực hiện thao tác này'
            );
            return;
        }

        if (typeof file === 'string') {
            setShowMap(true);
            return;
        }

        const { type } = file;
        if (
            type !== 'image/jpeg' &&
            type !== 'image/jpg' &&
            type !== 'image/png' &&
            type !== 'image/svg+xml'
        ) {
            toast.warning(
                `Định dạng tệp không chính xác, đuôi tệp chấp nhận .jpg, .jpeg, .png`
            );
            return;
        }
        setShowMap(true);
    };

    return (
        <Fragment>
            <div className={style.btnShow} onClick={handleShowMap}>
                Chọn tọa độ
            </div>
            {showMap && (
                <div className={style.container}>
                    <Fragment>
                        <div
                            className={style.overlay}
                            onClick={() => setShowMap(false)}
                        ></div>
                        <MapContainer
                            center={[9.975896274502997, 105.77857732772829]}
                            zoom={6}
                            scrollWheelZoom={false}
                            style={{
                                height: '80vh',
                                width: '90%',
                                position: 'absolute',
                            }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MoveRaster
                                file={file}
                                dataForm={dataForm}
                                setCoordinates={onSetPosition}
                            />
                        </MapContainer>
                    </Fragment>
                </div>
            )}
        </Fragment>
    );
};

export default Map;
