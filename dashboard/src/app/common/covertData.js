/*
  Lấy dữ liệu từ database về => conver sang object => gửi lên redux
*/

import tableDataAPI from 'app/api/tableData'
import dataFormTable from 'app/config/dataForm'
import {reqDisplay} from 'app/redux/action/action.componentDisplay'

const getTableList = async (paramName, item, dispatch) => {
  //variable
  let objectData = {}
  let arrData = []

  // call api and convert data => object => dispatch to redux
  try {
    if (Object.keys(dataFormTable[paramName]).length === 0) {
      return
    } // fix bug click sidebar account

    const tableList = await tableDataAPI.getList(paramName, 1, 100)
    const records = tableList[0]['records']

    records.forEach((item) => {
      Object.keys(dataFormTable[paramName]).forEach((keys) => {
        switch (typeof item[keys]) {
          case 'object': {
            const keyID = `${keys}Id`
            objectData[keys] = item[keyID]
            break
          }
          default:
            if (keys === 'active') {
              objectData[keys] = item[keys] === 1 ? 'Có' : 'Không'
            } else {
              objectData[keys] = item[keys]
            }
        }
      })
      arrData.push(objectData)
      objectData = {}
    })
    if (dispatch) {
      dispatch(
        reqDisplay({
          paramName: paramName,
          text: item,
          data: arrData,
          theadTable: paramName,
        })
      )
    }

    return arrData
  } catch (e) {
    console.error(e)
  }
}

export default getTableList
