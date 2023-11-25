import { memo, useCallback, useEffect, useState } from "react";

import ActionData from "../../../components/site/ActionData";
import ButtonCreate from "../../../components/controls/ButtonCreate";
import { DashboardLayout } from "../../../components/widgets/Layout";
import DataTable from "../../../components/site/Table";
import Link from "next/link";
import Pagination from "../../../components/site/Pagination";
import { RootState } from "../../../redux/reducers";
import Search from "../../../components/controls/Search";
import SwitchButton from "../../../components/controls/SwitchButton";
import layerAPI from "../../../api/layer";
import { toast } from "react-toastify";
import useDebounce from "../../../common/hooks/useDebounce";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Index() {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  const [totalItem, setTotalItem] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const [list, setList] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>("");

  const debounceKeyword = useDebounce(keyword, 500);

  const handleUpdateCheckbox = useCallback(
    async (id: string, e: any) => {
      try {
        const { name, value } = e.target;
        const [res, status]: any = await layerAPI.update(
          id,
          {
            [name]: value ? 1 : 0,
          },
          token
        );
        if (!res || status !== 200) {
          toast.warn(res?.message);
        }
      } catch (err: any) {
        toast.error(err?.message || "Cập nhật thất bại");
      }
    },
    [token]
  );

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
    "Hình ảnh kí hiệu": "icon",
    "ID Lớp": "id",
    "Tên Lớp": "nameLayer",
    "Tên ngôn ngữ": "language.nameLanguage",
    "Kiểu lớp": "style",
    "Id khu vực": "area.id",
    "Thuộc khu vực": "area.nameArea",
    "Thuộc phân loại": "classify.nameClassify",
    "Tọa độ latSW": "latSW",
    "Tọa độ lngSW": "lngSW",
    "Tọa độ latNE": "latNE",
    "Tọa độ lngNE": "lngNE",
    "Hiển thị": "active",
    "Thứ tự xếp chồng": "zIndex",
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
            title: "STT",
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
            title: "Tên lớp",
            template: (data: any) => {
              return data.nameLayer;
            },
          },
          {
            title: "Tên ngôn ngữ",
            template: (data: any) => {
              return data.language.nameLanguage;
            },
          },
          {
            title: "Tên phân loại",
            template: (data: any) => {
              return data.classify.nameClassify;
            },
          },
          {
            title: "Tên khu vực",
            template: (data: any) => {
              return data.area.nameArea;
            },
          },
          {
            title: "Tích chọn",
            template: (data: any) => {
              return (
                <SwitchButton
                  value={data.checked}
                  name="checked"
                  onChange={(e: any) => {
                    console.log(e);
                    handleUpdateCheckbox(data.id, e);
                  }}
                />
              );
            },
          },
          {
            title: "Hiển thị popup",
            template: (data: any) => {
              return (
                <SwitchButton
                  value={data.activeTooltip}
                  name="activeTooltip"
                  onChange={(e: any) => {
                    console.log(e);
                    handleUpdateCheckbox(data.id, e);
                  }}
                />
              );
            },
          },
          {
            title: "Hiển thị chú thích",
            template: (data: any) => {
              return (
                <SwitchButton
                  value={data.activeNote}
                  name="activeNote"
                  onChange={(e: any) => {
                    console.log(e);
                    handleUpdateCheckbox(data.id, e);
                  }}
                />
              );
            },
          },
          {
            title: "Hiển thị nhãn",
            template: (data: any) => {
              return (
                <SwitchButton
                  value={data.displayLabel}
                  name="displayLabel"
                  onChange={(e: any) => {
                    console.log(e);
                    handleUpdateCheckbox(data.id, e);
                  }}
                />
              );
            },
          },
          {
            title: "Hiển thị",
            template: (data: any) => {
              return (
                <SwitchButton
                  value={data.active}
                  name="active"
                  onChange={(e: any) => {
                    console.log(e);
                    handleUpdateCheckbox(data.id, e);
                  }}
                />
              );
            },
          },
          {
            title: "Hành động",
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
