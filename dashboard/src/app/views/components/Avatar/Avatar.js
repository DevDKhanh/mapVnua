import React from "react";
import clsx from "clsx";

// Thư mục
import styles from "./Avatar.module.scss";
import images from "../../constants/images";

function Avatar({ size }) {
  const styleSize = {
    width: `${size}px`,
    height: `${size}px`,
  };
  return (
    <div className={styles.wrapper_avatar}>
      <img style={styleSize} src={images.imageAdmin} />
    </div>
  );
}

export default Avatar;
