import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

// Thư mục
import styles from './PanelMainContent.module.scss'
import PanelHeadTable from './PanelHeadTable'
import dataHead from 'app/config/dataHead'
import DialogDelete from '../Dialog/DialogDelete'
import {Link, useParams} from 'react-router-dom'
import covertData from 'app/common/covertData'
import {ElementButton} from '../element.js'
import {keysLocal} from 'app/localStorage/keys'
import {getItem} from 'app/localStorage/localStorage'

function PanelMainContent() {
  // state on/off dialog
  const [isActive, setIsActive] = useState(false)

  // ID & name delete
  const [infoItem, setInfoItem] = useState()

  const [resData, setResData] = useState([])

  const {name} = useParams()

  useEffect(() => {
    const getData = async () => {
      if (name === 'account') {
        // resDataAccount dùng để nhận dữ liệu của account từ server <Object>
        const resDataAccount = await axios.get(
          'http://localhost:3000/auth/users?page=1&pageSize=10',
          {
            headers: {
              Authorization: 'Bearer ' + getItem(keysLocal['token']),
            },
          }
        )

        // converData lấy ra những dữ liệu cần thiết để hiển thị ra bảng
        const dataAccount = resDataAccount.data.records
        const converData = dataAccount.map((accountInfo) => {
          const {id, userName, fullName, createdAt} = accountInfo
          return {id, userName, fullName, createdAt}
        })

        setResData(converData)
      } else {
        setResData(await covertData(name))
      }
    }

    getData()
  }, [name])

  const handleDialog = (name, id) => {
    setInfoItem({name, id})
    setIsActive(true)
  }

  const checkIsPathImage = (itemValue) => {
    const baseURL = 'http://localhost:3000/upload'
    console.log(itemValue)

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
      <ElementButton mgBottom={'20px'}>
        <Link to='new_create'>Tạo mới</Link>
      </ElementButton>

      <div className={styles.wrapper_panel}>
        <table>
          <PanelHeadTable dataHead={dataHead[name]} />
          <tbody>
            {resData &&
              resData.map((item, index) => (
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
                      onClick={() => handleDialog(name, item['id'])}
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
