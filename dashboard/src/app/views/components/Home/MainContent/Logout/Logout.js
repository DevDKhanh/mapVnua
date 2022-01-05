import React from "react";

// Thư mục
import styles from "./Logout.module.scss";

function Logout() {
  return (
    <div className={styles.wrapper_logoutBar}>
      <p>Logout</p>
      <i class="fas fa-sign-out-alt"></i>
    </div>
  );
}

export default Logout;
