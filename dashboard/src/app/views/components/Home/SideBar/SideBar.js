import React, {useState} from 'react'

//Thư mục
import styles from './SideBar.module.scss'

//Component
import Avatar from '../../Avatar/Avatar'
import MenuSectionChildren from './MenuSection/MenuSectionChildren'
import HomeChildren from './MenuSection/HomeChildren'

function SideBar() {
  const [indexFocus, setIndexFocus] = useState()
  const icons = {
    iconEdit: <i className='far fa-edit'></i>,
    iconArrowDown: <i className='fas fa-chevron-down'></i>,
    iconHome: <i className='fas fa-home'></i>,
  }

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
        <HomeChildren icon={icons.iconHome} text='Trang chủ' />
        <MenuSectionChildren
          icon={icons.iconEdit}
          text='Quản lý danh mục'
          iconArrowDown={icons.iconArrowDown}
          dataParam={['area', 'classify', 'layer', 'document']}
          children={['Khu vực', 'Phân loại', 'Lớp', 'Tài liệu']}
          setIndexFocus={setIndexFocus}
          indexFocus={indexFocus}
          index={1}
        />
        <MenuSectionChildren
          icon={icons.iconEdit}
          text='Quản lý trang'
          iconArrowDown={icons.iconArrowDown}
          dataParam={['setting', 'interface', 'language']}
          children={['Cấu hình', 'Giao diện', 'Ngôn ngữ']}
          setIndexFocus={setIndexFocus}
          indexFocus={indexFocus}
          index={2}
        />
        <MenuSectionChildren
          icon={icons.iconEdit}
          text='Quản lý bảo mật'
          iconArrowDown={icons.iconArrowDown}
          dataParam={['account']}
          children={['Tài khoản']}
          setIndexFocus={setIndexFocus}
          indexFocus={indexFocus}
          index={3}
        />
      </div>
    </div>
  )
}

export default SideBar
