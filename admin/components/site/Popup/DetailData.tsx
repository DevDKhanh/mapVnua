import { Avatar } from '@mui/material';
import { memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import siteAPI from '../../../api/site';
import { useConvertDate } from '../../../common/hooks/useConvertDate';
import { API_URL } from '../../../constants/config';
import { RootState } from '../../../redux/reducers';
import style from './Popup.module.scss';

function DeleteData(props: any) {
    const { token } = useSelector((state: RootState) => state.auth);
    const [dataDetail, setDataDetail] = useState<any>(null);

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const [res, status]: any = await siteAPI.get(
                        props.url,
                        props.id,
                        token
                    );
                    if (res?.data) {
                        setDataDetail(res.data);
                    }
                } catch (err) {}
            })();
        }
    }, [token]);

    const Render: any = useMemo(() => {
        if (dataDetail) {
            const dataShow: Array<any> = [];
            for (let i in props.detailData) {
                if (props.detailData[i] === 'icon') {
                    dataShow.push(
                        <p className={style.item}>
                            <b>{i}</b>:{' '}
                            <Avatar
                                src={`${API_URL}/upload${getData(
                                    dataDetail,
                                    props.detailData[i]
                                )}`}
                            />
                        </p>
                    );
                } else if (props.detailData[i] === 'active') {
                    dataShow.push(
                        <p className={style.item}>
                            <b>{i}</b>:{' '}
                            {getData(dataDetail, props.detailData[i])
                                ? 'Có hiển thị'
                                : 'Không được hiển thị'}
                        </p>
                    );
                } else {
                    dataShow.push(
                        <p className={style.item}>
                            <b>{i}</b>:{' '}
                            {getData(dataDetail, props.detailData[i])}
                        </p>
                    );
                }
            }
            return dataShow;
        }

        return null;
    }, [dataDetail]);

    return (
        <div className={style.container}>
            <div className={style.mainData}>
                <h2>Chi tiết dữ liệu</h2>
                <div className={style.data}>{Render}</div>
            </div>
        </div>
    );
}

export default memo(DeleteData);

function getData(o: any, s: string) {
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}
