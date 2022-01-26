import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

//path of folder
import styles from './SeeDataiPage.module.scss'

import img from '../../../../images/admin.png'
import tableDataAPI from 'app/api/tableData'
import dataFormTable from 'app/config/dataForm'
import SeeDetail from '../../../components/DetailForm/SeeDetail'

const covertAPI = (object, paramName, objectTemp, setData) => {
  Object.keys(dataFormTable[paramName]).forEach((keys) => {
    switch (typeof object[keys]) {
      case 'object': {
        objectTemp[keys] =
          object[keys]['name' + keys[0].toUpperCase() + keys.slice(1)]
        break
      }
      default:
        if (keys === 'active') {
          objectTemp[keys] = object[keys] === 1 ? 'Có' : 'Không'
        } else {
          objectTemp[keys] = object[keys]
        }
    }
  })
  setData(objectTemp)
}

function SeeDetailPage() {
  const [resData, setresData] = useState() // data get from server
  const {name, id} = useParams()

  useEffect(() => {
    const callAPI = async () => {
      const [dataServer] = await tableDataAPI.getDetail(name, id)
      const {data} = dataServer
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'object') {
          delete data[key]
        }
      })
      setresData(data)
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
