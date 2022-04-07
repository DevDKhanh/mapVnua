import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import classifyAPI from '../../../api/classify';
import ActionData from '../../../components/site/ActionData';
import Pagination from '../../../components/site/Pagination';
import DataTable from '../../../components/site/Table';
import { DashboardLayout } from '../../../components/widgets/Layout';

function Index() {
    const router = useRouter();

    const [totalItem, setTotalItem] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageCurrent, setPageCurrent] = useState<number>(1);
    const [list, setList] = useState<any>([]);

    useEffect(() => {
        (async () => {
            try {
                const [res, status]: any = await classifyAPI.get({
                    page: pageCurrent,
                    pageSize,
                });
                if (res && status === 200) {
                    setList(res.records);
                    setTotalItem(res.total);
                }
            } catch (err) {}
        })();
    }, [pageCurrent, pageSize, router]);

    const detailData = {
        'Hình ảnh kí hiệu': 'icon',
        'Số thứ tự': 'no',
        'ID phân loại': 'id',
        'Tên phân loại': 'nameClassify',
        'Tên ngôn ngữ': 'language.nameLanguage',
        'Hiển thị': 'active',
    };

    return (
        <DashboardLayout title="Phân loại">
            <Link href="/category/classify/create">
                <a className="btn-create">Thêm mới</a>
            </Link>
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
                        title: 'ID phân loại',
                        template: (data: any) => {
                            return data.id;
                        },
                    },
                    {
                        title: 'Tên phân loại',
                        template: (data: any) => {
                            return data.nameClassify;
                        },
                    },
                    {
                        title: 'Tên ngôn ngữ',
                        template: (data: any) => {
                            return data.language.nameLanguage;
                        },
                    },
                    {
                        title: 'Hiển thị',
                        template: (data: any) => {
                            return data.active ? 'Có' : 'Không';
                        },
                    },
                    {
                        title: 'Hành động',
                        template: (data: any) => {
                            return (
                                <ActionData
                                    id={data.id}
                                    url="classify"
                                    detailData={detailData}
                                />
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
        </DashboardLayout>
    );
}

export default memo(Index);
