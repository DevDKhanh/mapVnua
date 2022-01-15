import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Thư viện
import styles from "./HeaderNavBar.module.scss";

// Components
import Avatar from "../../../Avatar/Avatar";
import Logout from "../Logout/Logout";

function HeaderNavBar({ icon, text, isVisible, setIsVisible }) {
  //navigate
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper_header_navBar}>
      <div
        className={styles.wrapper_header_navBarLeft}
        onClick={() => setIsVisible(false)}
      >
        {icon && <div onClick={() => navigate(-1)}>{icon.arrowLeft}</div>}
        {text && <h2>{text}</h2>}
      </div>
      <div
        onClick={() => setIsVisible(!isVisible)}
        className={styles.wrapper_header_navBarRight}
      >
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
