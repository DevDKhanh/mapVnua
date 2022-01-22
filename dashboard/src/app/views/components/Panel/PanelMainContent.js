import React, {useState} from 'react'

import 'react-toastify/dist/ReactToastify.css'

// Thư mục
import styles from './PanelMainContent.module.scss'
import PanelHeadTable from './PanelHeadTable'
import dataHead from 'app/config/dataHead'
import DialogDelete from '../Dialog/DialogDelete'
import {Link} from 'react-router-dom'

function PanelMainContent({nameHead, dataTable}) {
  // state on/off dialog
  const [isActive, setIsActive] = useState(false)
  // ID & name delete
  const [infoItem, setInfoItem] = useState()
  //handle display dialog
  const handleDialog = (name, id) => {
    setInfoItem({name, id})
    setIsActive(true)
  }

  // console.log(dataTable[nameHead]) //dữ liệu
  return (
    <div className={styles.wrapper_panel_content}>
      <button>
        <Link to={`/home/new_create/${nameHead}`}>Tạo mới</Link>
      </button>
      <div className={styles.wrapper_panel}>
        <table>
          {nameHead !== 'home' && (
            <PanelHeadTable dataHead={dataHead[nameHead]} />
          )}
          <tbody>
            {dataTable[nameHead].map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                {Object.values(item).map((itemValue, index) => (
                  <React.Fragment key={index}>
                    <td>{itemValue}</td>
                  </React.Fragment>
                ))}
                <td>
                  <Link to={`/home/see_detail/${nameHead}/${item['id']}`}>
                    <i className='far fa-eye'></i>
                  </Link>
                  <Link to={`/home/edit/${nameHead}/${item['id']}`}>
                    <i className='far fa-edit'></i>
                  </Link>
                  <Link
                    to={''}
                    onClick={() => handleDialog(nameHead, item['id'])}
                  >
                    <i className='far fa-trash-alt'></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isActive && (
        <DialogDelete
          isActive={isActive}
          infoItem={infoItem}
          setIsActive={setIsActive}
        />
      )}
    </div>
  )
}

export default PanelMainContent
