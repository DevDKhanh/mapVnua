import clsx from 'clsx';
import { Map } from 'iconsax-react';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { toast } from 'react-toastify';
import uploadAPI from '../../../api/upload';
import Loading from '../../site/Loading';
import style from './PreviewVector.module.scss';
import Vector from './Vector';

function Index({ data }: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [showMap, setShowMap] = useState<number>(1);
    const [fileData, setFileData] = useState<any>(null);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => setLoading(true);
    }, [data?.path, data?.icon]);

    useEffect(() => {
        function onReaderLoad(event: any) {
            var obj = JSON.parse(event.target.result);
            setFileData(obj);
        }
        if (data?.path && typeof data?.path !== 'string') {
            if (data?.path?.type === 'application/json') {
                var reader = new FileReader();
                reader.onload = onReaderLoad;
                reader.readAsText(data.path);
            } else {
                toast.warn('Sai định dạng đường dẫn');
            }
        } else if (typeof data?.path === 'string') {
            (async () => {
                try {
                    const [res, status]: any = await uploadAPI.getFile(
                        data?.path
                    );
                    if (res && status === 200) {
                        setFileData(res);
                    }
                } catch (err) {}
            })();
        }
    }, [data]);

    const handleToggle = useCallback(() => {
        if (showMap !== 0) {
            setShowMap(0);
        } else {
            setShowMap(1);
        }
    }, [showMap]);

    const handleToggleFull = useCallback(() => {
        if (showMap !== 2) {
            setShowMap(2);
        } else {
            setShowMap(1);
        }
    }, [showMap]);

    return (
        <div className={style.container}>
            <div
                className={style.icon}
                title="Xem trước hình hiển thị"
                onClick={handleToggle}
            >
                <Map size="32" color="#FF8A65" variant="Bold" />
            </div>
            <div
                className={clsx(style.containerMap, {
                    [style.active]: showMap === 1,
                    [style.activeFull]: showMap === 2,
                })}
            >
                <div className={style.zoomBtn} onClick={handleToggleFull}>
                    {showMap === 2 ? <BiExitFullscreen /> : <BiFullscreen />}
                </div>
                <Loading isLoading={loading}>
                    <MapContainer
                        center={[9.975896274502997, 105.77857732772829]}
                        zoom={6}
                        scrollWheelZoom={true}
                        style={{
                            height: '100vh',
                            width: '100vw',
                            position: 'absolute',
                        }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Vector fileData={fileData} data={data} />;
                    </MapContainer>
                </Loading>
            </div>
        </div>
    );
}

export default Index;
