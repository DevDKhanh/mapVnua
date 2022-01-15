import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// path of folder
import styles from "./Logout.module.scss";
import { keysLocal } from "../../../../../localStorage/keys";
import { removeItem } from "../../../../../localStorage/localStorage";
import { setUserInfo } from "../../../../../redux/action/action.user";

function Logout() {
  // Dispatch to redux
  const dispatch = useDispatch();

  // Navigation
  const naviga = useNavigate();

  // Logout
  const handleLogout = () => {
    // remove user info in redux
    dispatch(setUserInfo([]));

    // remove token in local
    removeItem(keysLocal.token);

    // navigation to login
    naviga("/", { replace: true });
  };

  return (
    <div onClick={handleLogout} className={styles.wrapper_logoutBar}>
      <p>Đăng xuất</p>
      <i className="fas fa-sign-out-alt"></i>
    </div>
  );
}

export default Logout;
