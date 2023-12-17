import { memo, useEffect, useState } from "react";

import ActionData from "../../../components/site/ActionData";
import ButtonCreate from "../../../components/controls/ButtonCreate";
import { DashboardLayout } from "../../../components/widgets/Layout";
import DataTable from "../../../components/site/Table";
import ImportFileWork from "../../../components/controls/ImportFileWork";
import Link from "next/link";
import Pagination from "../../../components/site/Pagination";
import Search from "../../../components/controls/Search";
import areaAPI from "../../../api/area";
import colorAPI from "../../../api/color";
import { copy } from "../../../common/func/copy";
import mapAPI from "../../../api/map";
import useDebounce from "../../../common/hooks/useDebounce";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();

  const [totalItem, setTotalItem] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const [list, setList] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>("");

  const debounceKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    setPageCurrent(1);
  }, [debounceKeyword]);

  useEffect(() => {
    (async () => {
      try {
        const [res, status]: any = await mapAPI.get({
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
    ID: "id",
    Tên: "ten",
    URL: "url",
  };

  return (
    <DashboardLayout title="Quản lý bản đồ nền">
      <div className="group-header">
        <div className="d-flex gap-12">
          <ButtonCreate href="/category/map/create" />
        </div>
        {/* <Search
          placeholder="Tìm kiếm theo tên khu vực"
          name="keyword"
          onChange={(e: any) => setKeyword(e.target.value)}
        /> */}
      </div>
      <DataTable
        data={list}
        columns={[
          {
            title: "STT",
            template: (data: any, i: number) => {
              return i + 1;
            },
          },
          {
            title: "ID",
            template: (data: any) => {
              return data.id;
            },
          },
          {
            title: "Tên bản đồ",
            template: (data: any) => {
              return data.ten;
            },
          },
          {
            title: "URL",
            template: (data: any) => {
              return data.url;
            },
          },
          {
            title: "Hành động",
            template: (data: any) => {
              return (
                <ActionData id={data.id} url="map" detailData={detailData} />
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
