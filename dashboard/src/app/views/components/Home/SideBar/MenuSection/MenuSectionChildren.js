import React, { useState } from "react";

// Thư mục
import styles from "./MenuSection.module.scss";
import MenuSectionChildrenSecond from "./MenuSectionChildrenSecond";

function MenuSectionChildren({ icon, text, iconArrowDown, children }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleChildrenSecond = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div
        onClick={handleChildrenSecond}
        className={styles.wrapper_menu_section_children}
      >
        {/* tab i */}
        {icon}
        <p>{text}</p>
        {children && iconArrowDown}
      </div>

      {children && isVisible && (
        <MenuSectionChildrenSecond children={children} />
      )}
    </>
  );
}

export default MenuSectionChildren;
