import { Eye, Edit2, ClipboardClose } from 'iconsax-react';
import { useRouter } from 'next/router';
import { Fragment, memo, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/reducers';
import DeleteData from '../Popup/DeleteData';
import DetailData from '../Popup/DetailData';
import Popup from '../Popup';
import siteAPI from '../../../api/site';
import style from './ActionData.module.scss';
function index(props: any) {
    const router = useRouter();
    const { token } = useSelector((state: RootState) => state.auth);
    const [showPopupDel, setShowPopupDel] = useState<boolean>(false);
    const [showPopupDetail, setShowPopupDetail] = useState<boolean>(false);

    const handleDelete = () => {
        (async () => {
            try {
                const [res, status]: any = await siteAPI.del(
                    props.url,
                    props.id,
                    token
                );

                if (res && res?.status !== 400) {
                    router.replace(router);
                    toast.success(res?.message || 'Xóa dữ liệu thành công!');
                } else {
                    toast.warn(res?.message || 'Không thể xóa mục này');
                }
                setShowPopupDel(false);
            } catch (err) {
                toast.error('Không thể xóa mục này');
                setShowPopupDel(false);
            }
        })();
    };

    return (
        <Fragment>
            <div className={style.main}>
                <div
                    className={style.item}
                    title="Xem chi tiết"
                    onClick={() => setShowPopupDetail(true)}
                >
                    <Eye variant="Bold" />
                </div>
                <div className={style.item} title="Sửa">
                    <Edit2 variant="Bold" />
                </div>
                <div
                    className={style.item}
                    title="Xóa"
                    onClick={() => setShowPopupDel(true)}
                >
                    <ClipboardClose variant="Bold" />
                </div>
            </div>
            {/*---------- Delete ----------*/}
            <Popup isShow={showPopupDel} onClose={() => setShowPopupDel(false)}>
                <DeleteData
                    onClose={() => setShowPopupDel(false)}
                    onSubmit={handleDelete}
                />
            </Popup>

            {/*---------- Detail ----------*/}
            <Popup
                isShow={showPopupDetail}
                onClose={() => setShowPopupDetail(false)}
            >
                <DetailData
                    onClose={() => setShowPopupDetail(false)}
                    {...props}
                />
            </Popup>
        </Fragment>
    );
}

export default memo(index);
