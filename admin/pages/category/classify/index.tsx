import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import classifyAPI from '../../../api/classify';
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
                const [res, status]: any = await classifyAPI.get({
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
        'Số thứ tự': 'no',
        'ID phân loại': 'id',
        'Tên phân loại': 'nameClassify',
        'Tên ngôn ngữ': 'language.nameLanguage',
        'Hiển thị': 'active',
    };

    return (
        <DashboardLayout title="Phân loại">
            <div className="group-header">
                <ButtonCreate href="/category/classify/create" />
                <Search
                    placeholder="Tìm kiếm theo tên phân loại"
                    name="keyword"
                    onChange={(e: any) => setKeyword(e.target.value)}
                />
            </div>
            <DataTable
                data={list}
                columns={[
                    {
                        title: 'Tên phân loại',
                        template: (data: any) => {
                            return data.nameClassify;
                        },
                    },
                    {
                        title: 'Thứ tự hiển thị',
                        template: (data: any) => {
                            return data.no;
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
                                    addLang
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
