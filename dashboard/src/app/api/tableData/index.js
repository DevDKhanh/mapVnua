import {keysLocal} from 'app/localStorage/keys'
import {getItem} from 'app/localStorage/localStorage'
import axiosClient from '../'

const tableDataAPI = {
  create: (data, tokenAxios, nameParam) => {
    const url = nameParam
    return axiosClient.post(url, data, {
      cancelToken: tokenAxios,
      headers: {
        Authorization: 'Bearer ' + getItem(keysLocal['token']),
      },
    })
  },
  getList: (nameParam, pageNumber, pageSize, tokenAxios) => {
    const url = `${nameParam}?page=${pageNumber}&pageSize=${pageSize}`
    return axiosClient.get(url, {
      cancelToken: tokenAxios,
    })
  },
  getDetail: (nameParam, id, tokenAxios) => {
    const url = `${nameParam}/${id}`
    return axiosClient.get(url, {
      cancelToken: tokenAxios,
    })
  },
}

export default tableDataAPI
