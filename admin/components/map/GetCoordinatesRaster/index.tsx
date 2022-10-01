import { Fragment, useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

import style from './GetCoordinates.module.scss';
import MoveRaster from './MoveRaster';
import { toast } from 'react-toastify';
import uploadAPI from '../../../api/upload';

const Map = ({ file, dataForm, onSetPosition, mapData }: any) => {
    const [showMap, setShowMap] = useState<boolean>(false);
    const [fileData, setFileData] = useState<any>(null);

    useEffect(() => {
        function onReaderLoad(event: any) {
            var obj = JSON.parse(event.target.result);
            setFileData(obj);
        }
        if (mapData && typeof mapData !== 'string') {
            if (mapData?.type === 'application/json') {
                var reader = new FileReader();
                reader.onload = onReaderLoad;
                reader.readAsText(mapData);
            } else {
                toast.warn('Sai định dạng đường dẫn');
            }
        } else if (typeof mapData === 'string') {
            (async () => {
                try {
                    const [res, status]: any = await uploadAPI.getFile(mapData);
                    if (res && status === 200) {
                        setFileData(res);
                    }
                } catch (err) {}
            })();
        }
    }, [mapData]);

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
                            scrollWheelZoom={true}
                            style={{
                                height: '80vh',
                                width: '90%',
                                position: 'absolute',
                            }}
                        >
                            {fileData && (
                                <GeoJSON key={fileData} data={fileData} />
                            )}
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
