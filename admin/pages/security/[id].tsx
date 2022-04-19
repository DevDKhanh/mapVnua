import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import authAPI from '../../api/auth';
import RequiredPermision from '../../components/protected/requiredPermision';
import Loading from '../../components/site/Loading';
import { DashboardLayout } from '../../components/widgets/Layout';
import { RootState } from '../../redux/reducers';
import style from './Security.module.scss';

function Index() {
    const router = useRouter();
    const { id } = router.query;

    const { token, permission } = useSelector((state: RootState) => state.auth);

    const [isLoading, setIsloading] = useState<boolean>(true);
    const [data, setData] = useState<any>();

    useEffect(() => {
        if (id && token) {
            (async () => {
                try {
                    const [res, status]: any = await authAPI.getDetail(
                        id,
                        token
                    );
                    if (res && status === 200) {
                        setData(res.data);
                        setIsloading(false);
                    }
                } catch (err) {}
            })();
        }
    }, [id, token, router]);

    const handleChangePermission = useCallback(
        async (permission: string, type: boolean) => {
            if (id && token) {
                try {
                    const [res, status]: any = await authAPI.permissionUpdate(
                        { [permission]: type },
                        id,
                        token
                    );

                    if (res && status === 200) {
                        toast.success('Đã cập nhật quyền');
                        router.replace(router.asPath);
                    } else {
                        toast.success(res?.message);
                    }
                } catch (err) {}
            }
        },
        [id, token]
    );

    const handleUpdate = useCallback(
        async (key: string, value: boolean) => {
            if (id && token) {
                try {
                    const [res, status]: any = await authAPI.update(
                        { [key]: value },
                        id,
                        token
                    );

                    if (res && status === 200) {
                        toast.success('Đã cập nhật trạng thái');
                        router.replace(router.asPath);
                    } else {
                        toast.success(res?.message);
                    }
                } catch (err) {}
            }
        },
        [id, token]
    );

    return (
        <DashboardLayout title="Cấp quyền tài khoản" hrefBack="/security">
            <RequiredPermision role={1}>
                <div className={style.mainDetail}>
                    <Loading isLoading={isLoading}>
                        <ul>
                            <li>Họ và tên: {data?.fullName}</li>
                            <li>
                                Tên tài khoản: {data?.userName}{' '}
                                {/* {permission?.role > data?.role && (
                                    <span className={style.btnDel}>
                                        Xóa tài khoản
                                    </span>
                                )} */}
                            </li>
                            <li>
                                <p>Cấp tài khoản:</p>
                                <span
                                    className={clsx(
                                        style.role,
                                        style[`role${data?.role}`]
                                    )}
                                >
                                    {data?.role}
                                </span>
                                {permission?.role > data?.role && (
                                    <span
                                        className={style.btnChange}
                                        onClick={() =>
                                            handleUpdate('role', data?.role + 1)
                                        }
                                    >
                                        Tăng cấp
                                    </span>
                                )}
                            </li>
                            <li>
                                <p>Trạng thái tài khoản:</p>
                                <div>
                                    <span
                                        className={clsx(
                                            {
                                                [style.accountActive]:
                                                    data?.actived,
                                            },
                                            style.account
                                        )}
                                    >
                                        {data?.actived
                                            ? 'Hoạt động'
                                            : 'Đang khóa'}
                                    </span>
                                    {permission?.role > data?.role && (
                                        <span
                                            className={style.btnChange}
                                            onClick={() =>
                                                handleUpdate(
                                                    'actived',
                                                    !data?.actived
                                                )
                                            }
                                        >
                                            {data?.actived
                                                ? 'Khóa tài khoản'
                                                : 'Mở khóa'}
                                        </span>
                                    )}
                                </div>
                            </li>
                            <li>
                                <p>Quyền tạo mới dữ liệu:</p>
                                <div>
                                    <span
                                        className={clsx(
                                            {
                                                [style.accountActive]:
                                                    data?.permission
                                                        ?.permissionCreate,
                                            },
                                            style.account
                                        )}
                                    >
                                        {data?.permission?.permissionCreate
                                            ? 'Đã được cấp quyền'
                                            : 'Chưa được cấp quyền'}
                                    </span>
                                    <span
                                        className={style.btnChange}
                                        onClick={() =>
                                            handleChangePermission(
                                                'permissionCreate',
                                                !data?.permission
                                                    ?.permissionCreate
                                            )
                                        }
                                    >
                                        Thay đổi
                                    </span>
                                </div>
                            </li>
                            <li>
                                <p>Quyền chỉnh sửa dữ liệu:</p>
                                <div>
                                    <span
                                        className={clsx(
                                            {
                                                [style.accountActive]:
                                                    data?.permission
                                                        ?.permissionEdit,
                                            },
                                            style.account
                                        )}
                                    >
                                        {data?.permission?.permissionEdit
                                            ? 'Đã được cấp quyền'
                                            : 'Chưa được cấp quyền'}
                                    </span>
                                    <span
                                        className={style.btnChange}
                                        onClick={() =>
                                            handleChangePermission(
                                                'permissionEdit',
                                                !data?.permission
                                                    ?.permissionEdit
                                            )
                                        }
                                    >
                                        Thay đổi
                                    </span>
                                </div>
                            </li>
                            <li>
                                <p>Quyền xóa dữ liệu:</p>
                                <div>
                                    <span
                                        className={clsx(
                                            {
                                                [style.accountActive]:
                                                    data?.permission
                                                        ?.permissionDelete,
                                            },
                                            style.account
                                        )}
                                    >
                                        {data?.permission?.permissionDelete
                                            ? 'Đã được cấp quyền'
                                            : 'Chưa được cấp quyền'}
                                    </span>
                                    <span
                                        className={style.btnChange}
                                        onClick={() =>
                                            handleChangePermission(
                                                'permissionDelete',
                                                !data?.permission
                                                    ?.permissionDelete
                                            )
                                        }
                                    >
                                        Thay đổi
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </Loading>
                </div>
            </RequiredPermision>
        </DashboardLayout>
    );
}

export default Index;
