import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'

//Thư mục
import styles from './form.module.scss'
import InputText from '../FormAction/InputForm/InputText'
import InputFile from '../FormAction/InputForm/InputFile'
import tableDataAPI from 'app/api/tableData'
import {PElement} from './element'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'

const checkResData = (
  resData,
  method,
  setDataFromForm,
  dataFromForm,
  setIsFirstClick
) => {
  const statusNotifications = {
    success: 'success',
    error: 'error',
  }
  const textnotifications = {
    success: method ? 'Chỉnh sửa thành công' : 'Tạo mới thành công',
    error: method ? 'Chỉnh sửa thất bại' : 'Tạo mới thất bại',
  }

  if (typeof resData === 'object' && resData.code === 400) {
    textnotifications.error = resData.message
    notifications(statusNotifications.error, textnotifications.error)
  }
  if (Array.isArray(resData) && resData[0].code === 200) {
    notifications(statusNotifications.success, textnotifications.success)

    // !method = null not exits method
    if (!method) {
      setDataFromForm({
        ...dataFromForm,
        id: '',
        nameLanguage: '',
      })
      setIsFirstClick(false)
    }
  }
  if (Array.isArray(resData) && resData[0].code === 400) {
    notifications(statusNotifications.error, textnotifications.error)
  }
}

const checkNotificationStatus = (status) => {
  if (status === 'success') {
    return 'success'
  } else {
    return 'error'
  }
}

const notifications = (status, textStatus) => {
  const filterStatus = checkNotificationStatus(status)
  toast[filterStatus](textStatus, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

const isEmptyValue = (valueInput) => {
  const dataEmpty = ''
  return valueInput !== dataEmpty
}

const isCheckDataEmptyFromForm = (dataFromForm) => {
  return Object.values(dataFromForm).every((valueInput) =>
    isEmptyValue(valueInput)
  )
}

const handleDataToAPI = async (dataForm, nameURL, method, idURL) => {
  const tokenAxios = null
  const nameParam = nameURL
  const data = dataForm
  const id = idURL
  switch (method) {
    case 'create':
      try {
        return await tableDataAPI[method](nameParam, data, tokenAxios)
      } catch (error) {
        return error
      }
    case 'update':
      try {
        return await tableDataAPI[method](nameParam, data, id, tokenAxios)
      } catch (error) {
        return error
      }
    case 'getDetail':
      try {
        return await tableDataAPI[method](nameParam, id, tokenAxios)
      } catch (error) {
        return error
      }
    default:
      return null
  }
}

const converByKeys = (dataFromForm, resLayerData) => {
  const converData = {}

  Object.keys(dataFromForm).map(
    (key) => (converData[key] = resLayerData.data[key])
  )
  return converData
}

function LanguageForm({dataProps}) {
  const [isFirstClick, setIsFirstClick] = useState(false)

  React.useEffect(() => {
    ;(async () => {
      const {idURL, isEdit, nameURL} = dataProps
      if (isEdit) {
        const [resLayerData] = await handleDataToAPI(
          null,
          nameURL,
          'getDetail',
          idURL
        )

        const convertedData = converByKeys(dataFromForm, resLayerData)
        setDataFromForm(convertedData)
      }
    })()
  }, [dataProps])

  const dataDefault = React.useRef({
    id: '',
    nameLanguage: '',
    icon: '',
  })
  const [dataFromForm, setDataFromForm] = useState(dataDefault.current)

  const handleCreateNew = async () => {
    setIsFirstClick(true)
    const formSubmit = {...dataFromForm}

    if (dataFromForm.icon) {
      const formData = new FormData()
      formData.append('file', dataFromForm.icon)
      const [resImageUrl] = await tableDataAPI.upload(formData, 'image', null)
      formSubmit.icon = resImageUrl.filename
    }

    const isFullData = isCheckDataEmptyFromForm(formSubmit)

    if (isFullData) {
      const dataForm = formSubmit
      const nameURL = dataProps.nameURL
      const method = 'create'

      const resData = await handleDataToAPI(dataForm, nameURL, method)
      checkResData(
        resData,
        null,
        setDataFromForm,
        dataFromForm,
        setIsFirstClick
      )
    } else {
      const statusNotifications = {
        error: 'error',
      }
      const textnotifications = {
        error: 'Tạo mới thất bại',
      }
      notifications(statusNotifications.error, textnotifications.error)
    }
  }

  const handleEdit = async () => {
    setIsFirstClick(true)
    const formSubmit = {...dataFromForm}
    if (dataFromForm.icon) {
      const formData = new FormData()
      formData.append('file', dataFromForm.icon)
      const [resImageUrl] = await tableDataAPI.upload(formData, 'image')
      formSubmit.icon = resImageUrl.filename
    }

    const isFullData = isCheckDataEmptyFromForm(formSubmit)

    if (isFullData) {
      const dataForm = formSubmit
      const nameURL = dataProps.nameURL
      const idURL = dataProps.idURL
      const method = 'update'

      const resData = await handleDataToAPI(dataForm, nameURL, method, idURL)
      checkResData(resData, method)
    } else {
      const statusNotifications = {
        error: 'error',
      }
      const textnotifications = {
        error: 'Chỉnh sửa thất bại',
      }
      notifications(statusNotifications.error, textnotifications.error)
    }
  }

  return (
    <div className={styles.wrapperCreateNew}>
      <div className={styles.wrapper_main_form}>
        <h2>{dataProps.text}</h2>
        <div className={styles.wrapperForm}>
          <InputText
            id='1'
            name='id'
            textLabel='ID ngôn ngữ'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
            disable={dataProps.isEdit && true}
          />
          <InputText
            id='2'
            name='nameLanguage'
            textLabel='Tên ngôn ngữ'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
          />
          <InputFile
            id='3'
            name='icon'
            textLabel='Icon'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
          />
          <div className={styles.wrapper_button}>
            <button onClick={dataProps.isEdit ? handleEdit : handleCreateNew}>
              <span>{dataProps.text}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageForm
