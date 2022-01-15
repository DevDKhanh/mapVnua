import React, {useEffect, useState} from 'react'

// Thư mục
import styles from './MenuSection.module.scss'
import MenuSectionChildrenSecond from './MenuSectionChildrenSecond'

function MenuSectionChildren({
  icon,
  text,
  iconArrowDown,
  children,
  dataParam,
  setIndexFocus,
  indexFocus,
  index,
}) {
  return (
    <>
      <div
        onClick={() => {
          setIndexFocus(index !== indexFocus && index)
        }}
        className={styles.wrapper_menu_section_children}
      >
        {/* tab i */}
        {icon}
        <p>{text}</p>
        {children && iconArrowDown}
      </div>
      {index === indexFocus && children && (
        <MenuSectionChildrenSecond dataParam={dataParam} children={children} />
      )}
    </>
  )
}

export default MenuSectionChildren
