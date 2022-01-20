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

const checkResData = (resData, setIsGetDataSuccessful) => {
  const statusNotifications = {
    success: 'success',
    error: 'error',
  }
  const textnotifications = {
    success: 'Tạo mới thành công',
    error: 'Tạo mới thất bại',
  }
  const indexFirst = 0
  const keys = {
    code: 'code',
  }
  console.log(resData)
  if (isResDataError(resData[keys.code])) {
    textnotifications.error = resData.message
    notifications(statusNotifications.error, textnotifications.error)
    setIsGetDataSuccessful(false)
  } else if (isResDataSuccess(resData[indexFirst][keys.code])) {
    notifications(statusNotifications.success, textnotifications.success)
    setIsGetDataSuccessful(true)
  } else if (isResDataError(resData[indexFirst][keys.code])) {
    notifications(statusNotifications.error, textnotifications.error)
    setIsGetDataSuccessful(false)
  }
}

const isResDataError = (codeFromData) => {
  const indexError = 400
  return codeFromData === indexError ? true : false
}

const isResDataSuccess = (codeFromData) => {
  const indexSuccess = 200
  return codeFromData === indexSuccess ? true : false
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

const getDataFromAPI = async (data, paramName) => {
  const method = 'create'
  const tokenAxios = null
  try {
    return await tableDataAPI[method](data, tokenAxios, paramName)
  } catch (error) {
    return error
  }
}

function LanguageForm({text, paramName, isEdit}) {
  const [isFirstClick, setIsFirstClick] = useState(false)
  const [isGetDataSuccessful, setIsGetDataSuccessful] = useState()

  const dataDefault = React.useRef({
    id: '',
    nameLanguage: '',
    icon: '',
  })
  const [dataFromForm, setDataFromForm] = useState(dataDefault.current)

  //edit
  // const {id} = useParams()
  // const data = useSelector((state) => state['displayMainContent']['data'])

  // useEffect(() => {
  //   let objectEdit

  //   if (isEdit) {
  //     objectEdit = data[paramName].find((item) => item['id'] === id)
  //     setInputForm(objectEdit)
  //   }
  // }, [])

  const handleCreateNew = async () => {
    setIsFirstClick(true)

    const isFullData = isCheckDataEmptyFromForm(dataFromForm)

    if (isFullData) {
      const resData = await getDataFromAPI(dataFromForm, paramName)
      checkResData(resData, setIsGetDataSuccessful)
    } else {
      const statusNotifications = {
        success: 'success',
        error: 'error',
      }
      const textnotifications = {
        success: 'Tạo mới thành công',
        error: 'Tạo mới thất bại',
      }
      notifications(statusNotifications.error, textnotifications.error)
      setIsGetDataSuccessful(false)
    }
  }

  const handleCheckSubmit = () => {
    if (isGetDataSuccessful) {
      return '/'
    } else {
      return ''
    }
  }

  return (
    <div className={styles.wrapperCreateNew}>
      <div className={styles.wrapper_main_form}>
        <h2>{text}</h2>

        <div className={styles.wrapperForm}>
          <InputText
            id='1'
            name='id'
            textLabel='ID ngôn ngữ'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
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
            <button onClick={handleCreateNew}>
              <Link to={handleCheckSubmit}>
                {!isEdit ? 'Tạo mới' : 'Chỉnh sửa'}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageForm
