import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import layerAPI from '../../../api/layer';
import ButtonCreate from '../../../components/controls/ButtonCreate';
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
                const [res, status]: any = await layerAPI.get({
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
        'ID Lớp': 'id',
        'Tên Lớp': 'nameLayer',
        'Tên ngôn ngữ': 'language.nameLanguage',
        'Kiểu lớp': 'style',
        'Id khu vực': 'area.id',
        'Thuộc khu vực': 'area.nameArea',
        'Thuộc phân loại': 'classify.nameClassify',
        'Tọa độ latSW': 'latSW',
        'Tọa độ lngSW': 'lngSW',
        'Tọa độ latNE': 'latNE',
        'Tọa độ lngNE': 'lngNE',
        'Hiển thị': 'active',
        'Lớp xếp chồng': 'zIndex',
    };

    return (
        <DashboardLayout title="Quản lí các lớp">
            <ButtonCreate href="/category/layer/create" />
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
                        title: 'ID lớp',
                        template: (data: any) => {
                            return data.id;
                        },
                    },
                    {
                        title: 'Tên lớp',
                        template: (data: any) => {
                            return data.nameLayer;
                        },
                    },
                    {
                        title: 'Tên ngôn ngữ',
                        template: (data: any) => {
                            return data.language.nameLanguage;
                        },
                    },
                    {
                        title: 'Tên phân loại',
                        template: (data: any) => {
                            return data.classify.nameClassify;
                        },
                    },
                    {
                        title: 'Tên khu vực',
                        template: (data: any) => {
                            return data.area.nameArea;
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
                                    url="layer"
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
