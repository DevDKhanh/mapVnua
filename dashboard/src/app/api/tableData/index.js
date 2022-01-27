import {keysLocal} from 'app/localStorage/keys'
import {getItem} from 'app/localStorage/localStorage'
import axiosClient from '../'

const tableDataAPI = {
  create: (nameParam, data, tokenAxios) => {
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
  delete: (nameParam, id, tokenAxios) => {
    const url = `${nameParam}/${id}`
    return axiosClient.delete(url, {
      cancelToken: tokenAxios,
      headers: {
        Authorization: 'Bearer ' + getItem(keysLocal['token']),
      },
    })
  },
  update: (nameParam, data, id, tokenAxios) => {
    const url = `${nameParam}/${id}`
    return axiosClient.put(url, data, {
      cancelToken: tokenAxios,
      headers: {
        Authorization: 'Bearer ' + getItem(keysLocal['token']),
      },
    })
  },
  upload: (data, type = 'image', tokenAxios) => {
    const url = `upload/${type}`
    return axiosClient.post(url, data, {
      cancelToken: tokenAxios,
      headers: {
        Authorization: 'Bearer ' + getItem(keysLocal['token']),
      },
    })
  },
}

export default tableDataAPI
