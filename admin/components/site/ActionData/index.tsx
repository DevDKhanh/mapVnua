import { Eye, Edit2, ClipboardClose, LanguageSquare } from 'iconsax-react';
import { useRouter } from 'next/router';
import { Fragment, memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/reducers';
import DeleteData from '../Popup/DeleteData';
import DetailData from '../Popup/DetailData';
import Popup from '../Popup';
import siteAPI from '../../../api/site';
import style from './ActionData.module.scss';
import Link from 'next/link';
function Index(props: any) {
    const router = useRouter();
    const { token, permission } = useSelector((state: RootState) => state.auth);
    const [showPopupDel, setShowPopupDel] = useState<boolean>(false);
    const [showPopupDetail, setShowPopupDetail] = useState<boolean>(false);

    const handleDelete = useCallback(() => {
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
                    toast.warn(
                        'Dữ liệu đang được sử dụng ở một bảng khác, không thể xóa bây giờ'
                    );
                }
                setShowPopupDel(false);
            } catch (err) {
                toast.error('Không thể xóa mục này');
                setShowPopupDel(false);
            }
        })();
    }, [props.url, props.id, token, router]);

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

                {permission?.permissionEdit && (
                    <Link href={`${router.pathname}/edit/${props.id}`}>
                        <a className={style.item} title="Sửa">
                            <Edit2 variant="Bold" />
                        </a>
                    </Link>
                )}

                {permission?.permissionDelete && (
                    <div
                        className={style.item}
                        title="Xóa"
                        onClick={() => setShowPopupDel(true)}
                    >
                        <ClipboardClose variant="Bold" />
                    </div>
                )}
                {permission?.permissionCreate && !!props.addLang && (
                    <Link
                        href={`${router.pathname}/edit/${props.id}?addLanguage=true`}
                    >
                        <a className={style.item} title="Thêm ngôn ngữ">
                            <LanguageSquare variant="Bold" />
                        </a>
                    </Link>
                )}
            </div>
            {/*---------- Delete ----------*/}
            <Popup
                key={props.id}
                isShow={showPopupDel}
                onClose={() => setShowPopupDel(false)}
            >
                <DeleteData
                    key={props.id}
                    onClose={() => setShowPopupDel(false)}
                    onSubmit={handleDelete}
                />
            </Popup>

            {/*---------- Detail ----------*/}
            <Popup
                key={props.id}
                isShow={showPopupDetail}
                onClose={() => setShowPopupDetail(false)}
            >
                <DetailData
                    key={props.id}
                    onClose={() => setShowPopupDetail(false)}
                    {...props}
                />
            </Popup>
        </Fragment>
    );
}

export default memo(Index);
