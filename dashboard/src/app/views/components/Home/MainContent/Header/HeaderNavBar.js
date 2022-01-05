import React, { useState } from "react";

// Thư viện
import styles from "./HeaderNavBar.module.scss";

// Components
import Avatar from "../../../Avatar/Avatar";
import Logout from "../Logout/Logout";

function HeaderNavBar({ text, isVisible, setIsVisible }) {
  return (
    <div
      className={styles.wrapper_header_navBar}
      onClick={() => setIsVisible(!isVisible)}
    >
      <div className={styles.wrapper_header_navBarLeft}>
        <h2>{text}</h2>
      </div>
      <div className={styles.wrapper_header_navBarRight}>
        <Avatar size={40} />
        <p>Thanh</p>
        <i className="fas fa-caret-down"></i>
      </div>
      {/* logout */}
      {isVisible && (
        <div className={styles.wrapper_logout}>
          <Logout />
        </div>
      )}
    </div>
  );
}

export default HeaderNavBar;
