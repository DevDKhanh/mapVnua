import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import areaAPI from '../../../api/area';
import useDebounce from '../../../common/hooks/useDebounce';
import ButtonCreate from '../../../components/controls/ButtonCreate';
import Search from '../../../components/controls/Search';
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
    const [keyword, setKeyword] = useState<string>('');

    const debounceKeyword = useDebounce(keyword, 500);

    useEffect(() => {
        setPageCurrent(1);
    }, [debounceKeyword]);

    useEffect(() => {
        (async () => {
            try {
                const [res, status]: any = await areaAPI.get({
                    page: pageCurrent,
                    pageSize,
                    keyword: debounceKeyword,
                });
                if (res && status === 200) {
                    setList(res.records);
                    setTotalItem(res.total);
                }
            } catch (err) {}
        })();
    }, [debounceKeyword, pageCurrent, pageSize, router]);

    const detailData = {
        ID: 'id',
        'ID khu vực': 'idArea',
        'Tên khu vực': 'nameArea',
        'ID ngôn ngữ': 'languageId',
        'Tên ngôn ngữ': 'language.nameLanguage',
        'Tọa độ lat': 'lat',
        'Tọa độ lng': 'lng',
        'Hiển thị': 'active',
        Zoom: 'zoom',
    };

    return (
        <DashboardLayout title="Quản lí khu vực">
            <div className="group-header">
                <ButtonCreate href="/category/location/create" />
                <Search
                    placeholder="Tìm kiếm theo tên khu vực"
                    name="keyword"
                    onChange={(e: any) => setKeyword(e.target.value)}
                />
            </div>
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
                        title: 'ID khu vực',
                        template: (data: any) => {
                            return data.idArea;
                        },
                    },
                    {
                        title: 'Tên khu vực',
                        template: (data: any) => {
                            return data.nameArea;
                        },
                    },
                    {
                        title: 'Tọa độ lat',
                        template: (data: any) => {
                            return data.lat;
                        },
                    },
                    {
                        title: 'Tọa độ lng',
                        template: (data: any) => {
                            return data.lng;
                        },
                    },
                    {
                        title: 'Zoom',
                        template: (data: any) => {
                            return data.zoom;
                        },
                    },
                    {
                        title: 'ID ngôn ngữ',
                        template: (data: any) => {
                            return data.languageId;
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
                                    addLang
                                    id={data.id}
                                    url="area"
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
