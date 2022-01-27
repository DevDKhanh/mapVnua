import React, {useState} from 'react'
import {Link, useOutletContext, useParams} from 'react-router-dom'
import DialogDelete from '../Dialog/DialogDelete.js'

// path of folder
import styles from './SeeDetail.module.scss'

function SeeDetail({dataItem}) {
  // state on/off dialog
  const [isActive, setIsActive] = useState(false)
  // ID & name delete
  const [infoItem, setInfoItem] = useState()

  const {name, id} = useParams()

  // check state of button
  const [onClick, setOnClick] = useState(false)

  const checkIsPathImage = (valueOfKey) => {
    const baseURL = 'http://localhost:3000/upload'

    if (valueOfKey.toString().includes('/image/')) {
      return (
        <td>
          <img src={`${baseURL}${valueOfKey}`} alt='' />
        </td>
      )
    } else {
      return <td>{valueOfKey}</td>
    }
  }

  const RenderValue = ({dataItem, keyItem}) => {
    const valueOfKey = dataItem[keyItem]

    const htmlValue = checkIsPathImage(valueOfKey)
    return htmlValue
  }

  const handleDialog = () => {
    setInfoItem({name, id})
    setIsActive(true)
  }

  return (
    <div className={styles.container_see_detail}>
      <h2>Xem chi tiết</h2>
      <div onClick={() => setOnClick(false)} className={styles.wrapper_table}>
        <table>
          <tbody>
            {Object.keys(dataItem).map((keyItem, index) => (
              <tr key={index}>
                <td>{keyItem}</td>
                <RenderValue dataItem={dataItem} keyItem={keyItem} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.wrapper_button}>
        {onClick && (
          <div className={styles.wrapper_button_children}>
            <Link to={`/home/${name}/edit/${id}`}>
              <i className='far fa-edit'></i>
            </Link>
            <Link to='' onClick={() => handleDialog()}>
              <i className='far fa-trash-alt'></i>
            </Link>
          </div>
        )}
        <Link to='' onClick={() => setOnClick(!onClick)}>
          <i className='fas fa-plus'></i>
        </Link>
      </div>
      {isActive && (
        <DialogDelete
          isActive={isActive}
          infoItem={infoItem}
          setIsActive={setIsActive}
          isDetail
        />
      )}
    </div>
  )
}

export default SeeDetail
