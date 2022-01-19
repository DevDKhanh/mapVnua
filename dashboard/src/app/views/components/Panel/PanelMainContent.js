import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

// Thư mục
import styles from './PanelMainContent.module.scss'
import PanelHeadTable from './PanelHeadTable'
import dataHead from 'app/config/dataHead'
import DialogDelete from '../Dialog/DialogDelete'

function PanelMainContent({nameHead, dataTable}) {
  // state on/off dialog
  const [isActive, setIsActive] = useState(false)
  // state note
  const [falseDelete, setFalseDelete] = useState()
  // ID & name delete
  const [infoItem, setInfoItem] = useState()
  //handle display dialog
  const handleDialog = (name, id) => {
    setInfoItem({name, id})
    // setIsActive(true)
    setFalseDelete(false)
  }

  toast.configure()
  const click = () => {
    toast.success('Success Notification !', {
      position: toast.POSITION.TOP_CENTER,
    })
  }

  // console.log(dataTable[nameHead]) //dữ liệu
  return (
    <div className={styles.wrapper_panel_content}>
      <button onClick={click}>click</button>

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
          setFalseDelete={setFalseDelete}
        />
      )}
    </div>
  )
}

export default PanelMainContent
