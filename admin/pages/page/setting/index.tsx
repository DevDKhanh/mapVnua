import { memo, useEffect, useState } from "react";

import ActionData from "../../../components/site/ActionData";
import ButtonCreate from "../../../components/controls/ButtonCreate";
import { DashboardLayout } from "../../../components/widgets/Layout";
import DataTable from "../../../components/site/Table";
import Link from "next/link";
import Pagination from "../../../components/site/Pagination";
import settingAPI from "../../../api/setting";
import { useRouter } from "next/router";

const detailData = {
  "Hình ảnh kí hiệu": "icon",
  "ID cấu hình": "id",
  "Tiêu đề": "title",
  Slogan: "slogan",
  "Ngôn ngữ mặc định": "language.nameLanguage",
  "Tọa độ lat": "lat",
  "Tọa độ lng": "lng",
  Map: "map.ten",
  Zoom: "zoom",
};

function Index() {
  const router = useRouter();

  const [totalItem, setTotalItem] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const [res, status]: any = await settingAPI.get({
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

  return (
    <DashboardLayout title="Cấu hình">
      <ButtonCreate href="/page/setting/create" />
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
            title: "ID cấu hình",
            template: (data: any) => {
              return data.id;
            },
          },
          {
            title: "Tên ngôn ngữ",
            template: (data: any) => {
              return data.language.nameLanguage;
            },
          },
          {
            title: "Tiêu đề",
            template: (data: any) => {
              return data.title;
            },
          },
          {
            title: "Map",
            template: (data: any) => {
              return data.map.ten;
            },
          },
          {
            title: "Tọa độ Lat",
            template: (data: any) => {
              return data.lat;
            },
          },
          {
            title: "Tọa độ Lng",
            template: (data: any) => {
              return data.lng;
            },
          },
          {
            title: "Zoom",
            template: (data: any) => {
              return data.zoom;
            },
          },
          {
            title: "Hành động",
            template: (data: any) => {
              return (
                <ActionData
                  id={data.id}
                  url="setting"
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
