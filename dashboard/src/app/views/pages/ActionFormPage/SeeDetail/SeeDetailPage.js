import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

//path of folder
import styles from './SeeDataiPage.module.scss'
import tableDataAPI from 'app/api/tableData'
import SeeDetail from '../../../components/DetailForm/SeeDetail'
import {keysLocal} from 'app/localStorage/keys'
import {getItem} from 'app/localStorage/localStorage'

function SeeDetailPage() {
  const [resData, setResData] = useState() // lưu trữ dữ liệu được lấy từ database

  const {name, id} = useParams()

  const convertData = (res) => {
    const {data} = res
    let dataUser = data.data //thông tin của user được trả về <object>

    const {permission} = dataUser //<object>

    let formData = {} //để lưu tạm dữ liệu sau khi xóa permission

    if (permission) {
      delete permission.id
      delete permission.createdAt
      delete permission.updatedAt
      delete permission.userId
      delete permission.permissionSeen

      formData = {...permission}
      delete dataUser.permission
      delete dataUser.role
    } else {
      dataUser.permission = 'chưa có quyền'
    }
    dataUser = {...dataUser, ...formData} // ghép dữ liệu

    for (let key in dataUser) {
      dataUser[key] = dataUser[key].toString()
    } // convert tất cả giá trị sang string để hiển thị

    setResData(dataUser)
  }

  useEffect(() => {
    const callAPI = async () => {
      if (name === 'account') {
        axios
          .get(`http://localhost:3000/auth/users/user/${id}`, {
            headers: {
              Authorization: 'Bearer ' + getItem(keysLocal['token']),
            },
          })
          .then((res) => convertData(res))
          .catch((e) => console.log('e', e))
      } else {
        const [dataServer] = await tableDataAPI.getDetail(name, id)
        const {data} = dataServer
        Object.keys(data).forEach((key) => {
          if (typeof data[key] === 'object') {
            delete data[key]
          }
        })
        setResData(data)
      }
    }
    callAPI()
  }, [id, name])

  return (
    <div className={styles.container}>
      <SeeDetail dataItem={resData ? resData : {}} />
    </div>
  )
}

export default SeeDetailPage
