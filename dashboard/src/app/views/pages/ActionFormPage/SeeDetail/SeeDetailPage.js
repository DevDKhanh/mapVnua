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
  const [data, setData] = useState() // data get from server
  const {name, id} = useParams()
  let objectTemp = {}

  useEffect(() => {
    const callAPI = async () => {
      const dataServer = await tableDataAPI['getDetail'](name, id)
      covertAPI(dataServer[0]['data'], name, objectTemp, setData)
    }
    callAPI()
  }, [])

  return (
    <div className={styles.container}>
      {/* Dữ liệu đang fix cứng */}
      <SeeDetail objectDataItem={data ? data : {name: 'name'}} />
    </div>
  )
}

export default SeeDetailPage
