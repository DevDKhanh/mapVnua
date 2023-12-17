import * as XLSX from "xlsx";

import { Fragment, useState } from "react";
import { PropsImportFileWork, Template } from "./interfaces";

import { Button } from "@mui/material";
import Image from "next/image";
import Popup from "../Popup2";
import { RootState } from "../../../redux/reducers";
import clsx from "clsx";
import colorAPI from "../../../api/color";
import styles from "./ImportFileWork.module.scss";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export function convertFileSize(fileSizeInKB: number) {
  if (typeof fileSizeInKB !== "number" || fileSizeInKB < 0) {
    return "Kích thước không hợp lệ";
  }

  if (fileSizeInKB < 1024) {
    return fileSizeInKB.toFixed(2) + " kb";
  } else if (fileSizeInKB < 1048576) {
    // 1024 KB = 1 MB
    return (fileSizeInKB / 1024).toFixed(2) + " mb";
  } else if (fileSizeInKB < 1073741824) {
    // 1024 MB = 1 GB
    return (fileSizeInKB / 1048576).toFixed(2) + " gb";
  } else {
    return (fileSizeInKB / 1073741824).toFixed(2) + " tb";
  }
}

function ImportFileWork({}: PropsImportFileWork) {
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const handleClose = () => {
    setSelectedFile(null);
    const { importFile, ...rest } = router.query;
    router.replace({
      ...router,
      query: rest,
    });
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [listData, setListData] = useState<any[]>([]);
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    convertData(file);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    convertData(file);
  };

  async function convertData(file: any) {
    try {
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data: Template[] = XLSX.utils.sheet_to_json(ws);

        const convert = data.map((v: Template) => ({
          code: v["MaDat"],
          description: v["MoTa"],
          red: v["Red"],
          green: v["Green"],
          blue: v["Blue"],
        }));

        if (convert.length > 0) {
          setListData(convert);
          setSelectedFile(file);
        } else {
          toast.warn("Không có dữ liệu trong file đầu vào");
        }
      };
      reader.readAsBinaryString(file);
    } catch (err) {
      toast.error("Không nạp được dữ liệu, vui lòng kiểm tra file đầu vào");
    }
  }

  const handleSubmit = () => {
    (async () => {
      try {
        const [res, status]: any = await colorAPI.postMany(listData, token);
        if (res && status === 201) {
          setSelectedFile(null);
          toast.success(res?.message);
          router.push("/category/color");
        } else {
          toast.warn(res?.message);
        }
      } catch (err: any) {
        toast.error(err?.message || "Thêm mới thất bại");
      }
    })();
  };

  return (
    <Fragment>
      <Popup open={router.query.importFile == "open"} onClose={handleClose}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Nhập file từ Excel</h2>
            <p className={styles.note}>
              Bạn có thể tải tệp .xls, .xlsx, .csv lên bản của mình
            </p>
            <p className={styles.download}>
              <a
                href="/template_import_color.xlsx"
                style={{ color: "#2A85FF" }}
              >
                Tải xuống{" "}
              </a>
              Tệp tài liệu mẫu
            </p>
          </div>
          <div className={styles.main}>
            {selectedFile && listData?.length > 0 ? (
              <div className={styles.selectedFile}>
                <div className={styles.file}>
                  <div className={styles.icon}>
                    <i>
                      <Image
                        src="/xsl.svg"
                        width={36}
                        height={36}
                        alt="icon xsl"
                      />
                    </i>
                  </div>
                  <div className={styles.info}>
                    <p className={styles.name}>{selectedFile?.name}</p>
                    <p className={styles.size}>
                      {convertFileSize(selectedFile?.size / 1000)}
                    </p>
                  </div>
                  <label htmlFor="file-work" className={styles.change}>
                    <input
                      hidden
                      id="file-work"
                      type="file"
                      accept=".xls, .xlsx, .csv"
                      onClick={(e: any) => {
                        e.target.value = null;
                      }}
                      onChange={handleFileChange}
                    />
                    Thay thế
                  </label>
                </div>
              </div>
            ) : (
              <label
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={clsx(styles.inputFile, {
                  [styles.dragging]: dragging,
                })}
                htmlFor="file-work"
              >
                <div className={styles.groupEmpty}>
                  <div className={styles.imageEmpty}>
                    <Image
                      alt="Image "
                      width={200}
                      height={150}
                      className={styles.image}
                      src={"/Empty_File.png"}
                    />
                  </div>
                  <p>Kéo và thả tệp của bạn vào đây hoặc</p>
                  <p>Tải lên</p>
                </div>
                <input
                  hidden
                  id="file-work"
                  type="file"
                  accept=".xls, .xlsx, .csv"
                  onChange={handleFileChange}
                  onClick={(e: any) => {
                    e.target.value = null;
                  }}
                />
              </label>
            )}
          </div>
          <div className={styles.groupBtn}>
            <Button
              variant="contained"
              disabled={!selectedFile}
              onClick={handleSubmit}
            >
              Tải lên
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Đóng
            </Button>
          </div>
        </div>
      </Popup>
    </Fragment>
  );
}

export default ImportFileWork;
