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

  const handleDialog = (name, id) => {
    setInfoItem({name, id})
    setIsActive(true)
  }

  const checkIsPathImage = (itemValue) => {
    const baseURL = 'http://localhost:3000/upload'

    if (itemValue.toString().includes('/image/')) {
      return (
        <td>
          <img
            src={`${baseURL}${itemValue}`}
            alt=''
            style={{width: '25px', height: '25px', margin: 'auto'}}
          />
        </td>
      )
    } else {
      return <td>{itemValue}</td>
    }
  }

  const RenderValue = ({itemValue}) => {
    const htmlValue = checkIsPathImage(itemValue)
    return htmlValue
  }

  return (
    <div className={styles.wrapper_panel_content}>
      <button>
        <Link to='new_create'>Tạo mới</Link>
      </button>
      <div className={styles.wrapper_panel}>
        <table>
          <PanelHeadTable dataHead={dataHead[nameHead]} />
          <tbody>
            {dataTable[nameHead].map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                {Object.values(item).map((itemValue, index) => (
                  <React.Fragment key={index}>
                    <RenderValue itemValue={itemValue} />
                  </React.Fragment>
                ))}
                <td>
                  <Link to={`see_detail/${item['id']}`}>
                    <i className='far fa-eye'></i>
                  </Link>
                  <Link to={`edit/${item['id']}`}>
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
