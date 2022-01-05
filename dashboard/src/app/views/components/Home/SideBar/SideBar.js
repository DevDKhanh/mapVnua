import React from "react";

//Thư mục
import styles from "./SideBar.module.scss";

//Component
import Avatar from "../../Avatar/Avatar";
import MenuSectionChildren from "./MenuSection/MenuSectionChildren";

function SideBar() {
  const icons = {
    iconEdit: <i className="far fa-edit"></i>,
    iconArrowDown: <i className="fas fa-chevron-down"></i>,
  };

  return (
    <div className={styles.wrapper_sideBar}>
      <div className={styles.wrapper_profile_info}>
        <Avatar size={50} />
        <div className={styles.wrapper_profile_title}>
          <h3>Xin chào</h3>
          <h3>Thanh</h3>
        </div>
      </div>
      <div className={styles.wrapper_menu_section}>
        <MenuSectionChildren
          icon={icons.iconEdit}
          text="Quản lý danh mục"
          iconArrowDown={icons.iconArrowDown}
          children={["Khu vực", "Phân loại", "Lớp", "Tài liệu"]}
        />
        <MenuSectionChildren
          icon={icons.iconEdit}
          text="Quản lý trang"
          iconArrowDown={icons.iconArrowDown}
          children={["Cấu hình", "Giao diện", "Ngôn ngữ"]}
        />
        <MenuSectionChildren
          icon={icons.iconEdit}
          text="Quản lý bảo mật"
          iconArrowDown={icons.iconArrowDown}
          children={["Tài khoản"]}
        />
      </div>
    </div>
  );
}

export default SideBar;
