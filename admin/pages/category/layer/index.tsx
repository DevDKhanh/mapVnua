import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import layerAPI from '../../../api/layer';
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
                const [res, status]: any = await layerAPI.get({
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
        'Thứ tự xếp chồng': 'zIndex',
    };

    return (
        <DashboardLayout title="Quản lí các lớp">
            <div className="group-header">
                <ButtonCreate href="/category/layer/create" />
                <Search
                    placeholder="Tìm kiếm theo tên lớp"
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
                    // {
                    //     title: 'ID lớp',
                    //     template: (data: any) => {
                    //         return data.id;
                    //     },
                    // },
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
                        title: 'Tích chọn',
                        template: (data: any) => {
                            return data.checked ? 'Có' : 'Không';
                        },
                    },
                    {
                        title: 'Hiển thị popup',
                        template: (data: any) => {
                            return data.activeTooltip ? 'Có' : 'Không';
                        },
                    },
                    {
                        title: 'Hiển thị chú thích',
                        template: (data: any) => {
                            return data.activeNote ? 'Có' : 'Không';
                        },
                    },
                    {
                        title: 'Hiển thị',
                        template: (data: any) => {
                            return data.active ? 'Có' : 'Không';
                        },
                    },
                    {
                        title: 'Hiển thị nhãn',
                        template: (data: any) => {
                            return data.displayLabel ? 'Có' : 'Không';
                        },
                    },
                    {
                        title: 'Hành động',
                        template: (data: any) => {
                            return (
                                <ActionData
                                    addLang
                                    clone
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
