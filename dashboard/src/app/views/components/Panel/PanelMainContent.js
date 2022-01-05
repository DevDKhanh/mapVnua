import React from "react";
import { Link } from "react-router-dom";

// Thư mục
import styles from "./PanelMainContent.module.scss";

function PanelMainContent({ data }) {
  return (
    <div className={styles.wrapper_panel_content}>
      <div className={styles.wrapper_panel}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên khu vực</th>
              <th>Tọa độ lat</th>
              <th>Tọa độ lng</th>
              <th>Zoom</th>
              <th>Tên ngôn ngữ</th>
              <th>Hiển thị</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>
                <Link to="/">
                  <i class="far fa-eye"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-edit"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>
                <Link to="/">
                  <i class="far fa-eye"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-edit"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>
                <Link to="/">
                  <i class="far fa-eye"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-edit"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>
                <Link to="/">
                  <i class="far fa-eye"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-edit"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>
                <Link to="/">
                  <i class="far fa-eye"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-edit"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>
                <Link to="/">
                  <i class="far fa-eye"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-edit"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>Dữ liệu</td>
              <td>
                <Link to="/">
                  <i class="far fa-eye"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-edit"></i>
                </Link>
                <Link to="/">
                  <i class="far fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PanelMainContent;
