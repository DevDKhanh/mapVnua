import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import authAPI from '../../api/auth';
import { useConvertDate } from '../../common/hooks/useConvertDate';
import RequiredPermision from '../../components/protected/requiredPermision';
import Pagination from '../../components/site/Pagination';
import DataTable from '../../components/site/Table';
import { DashboardLayout } from '../../components/widgets/Layout';
import { RootState } from '../../redux/reducers';

import style from './Security.module.scss';

function Index() {
    const date = useConvertDate;
    const router = useRouter();
    const { token, permission } = useSelector((state: RootState) => state.auth);

    const [totalItem, setTotalItem] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageCurrent, setPageCurrent] = useState<number>(1);
    const [list, setList] = useState<any>([]);

    useEffect(() => {
        (async () => {
            try {
                const [res, status]: any = await authAPI.getList({
                    page: pageCurrent,
                    pageSize,
                    token,
                });
                if (res && status === 200) {
                    setList(res.records);
                    setTotalItem(res.total);
                }
            } catch (err) {}
        })();
    }, [pageCurrent, pageSize, router]);

    return (
        <DashboardLayout title="Bảo mật">
            <RequiredPermision role={1}>
                {/*---------- Tài khoản có role >=1 hiển thị nút tạo tài khoản ----------*/}
                {permission?.role >= 1 && (
                    <Link href="/security/create">
                        <a className="btn-create">Tạo tài khoản</a>
                    </Link>
                )}
                <DataTable
                    data={list}
                    columns={[
                        {
                            title: 'STT',
                            template: (data: any, i: number) => {
                                return i + 1;
                            },
                        },
                        {
                            title: 'Tên tài khoản',
                            template: (data: any) => {
                                return data.userName;
                            },
                        },
                        {
                            title: 'Họ và tên',
                            template: (data: any) => {
                                return data.fullName;
                            },
                        },
                        {
                            title: 'Cấp bậc',
                            template: (data: any) => {
                                return (
                                    <span
                                        className={clsx(
                                            style.role,
                                            style[`role${data.role}`]
                                        )}
                                    >
                                        {data.role}
                                    </span>
                                );
                            },
                        },
                        {
                            title: 'Trạng thái',
                            template: (data: any) => {
                                return (
                                    <span
                                        className={clsx(
                                            {
                                                [style.accountActive]:
                                                    data.actived,
                                            },
                                            style.account
                                        )}
                                    >
                                        {data.actived
                                            ? 'Hoạt động'
                                            : 'Đang khóa'}
                                    </span>
                                );
                            },
                        },
                        {
                            title: 'Ngày tạo',
                            template: (data: any) => {
                                return `${date(
                                    data.createdAt
                                ).getTime()} ${date(data.createdAt).getDate()}`;
                            },
                        },
                        {
                            title: 'Thao tác',
                            template: (data: any) => {
                                return (
                                    <div className={style.btnAction}>
                                        Chi tiết
                                    </div>
                                );
                            },
                        },
                    ]}
                />
                <Pagination
                    totalItem={totalItem}
                    pageSize={pageSize}
                    pageCurrent={pageCurrent}
                    onSetPage={setPageCurrent}
                    onSetPageSize={setPageSize}
                />
            </RequiredPermision>
        </DashboardLayout>
    );
}

export default memo(Index);
