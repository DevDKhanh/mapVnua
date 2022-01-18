import React, {useState} from 'react'

// path of folder
import styles from './EditPage.module.scss'
import EditForm from '../../../components/EditForm/EditForm'

function EditPage() {
  // state visible of logout bar
  const [isVisible, setIsVisible] = useState(false)

  // Đang fix cứng dữ liệu của item
  const dataItem = {
    STT: 1,
    TuKhoa: 'New_key',
    TenNgonNgu: 'language',
    Dich: 'No',
  }

  return (
    <div className={styles.container}>
      <EditForm setIsVisible={setIsVisible} data={dataItem} />
    </div>
  )
}

export default EditPage
