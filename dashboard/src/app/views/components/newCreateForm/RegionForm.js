import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

//Thư mục
import styles from './form.module.scss'
import InputText from '../FormAction/InputForm/InputText'
import InputNumber from '../FormAction/InputForm/InputNumber'
import InputDeps from '../FormAction/InputForm/InputDeps'
import tableDataAPI from 'app/api/tableData'
import {ButtonElement} from './element'
import MapLeaflet from '../Map/MapLeafLet'
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

function RegionForm({text, paramName, id}) {
  const [isFirstClick, setIsFirstClick] = useState(false)
  const [isGetDataSuccessful, setIsGetDataSuccessful] = useState()
  const [isOnMap, setIsOnMap] = useState(false)

  // useEffect(() => {
  //   id && console.log(data[paramName].find((item) => item['id'] === id))
  // }, [id])

  const dataFromRedux = useSelector(
    (state) => state['displayMainContent']['data']
  )

  const keys = React.useRef({
    language: 'language',
    id: 'id',
  })
  let arrayIdLanguage = dataFromRedux[keys.current.language].map(
    (infoLanguage) => infoLanguage[keys.current.id]
  )
  let hidden = ['Có', 'Không']

  const indexFirst = React.useRef(0)
  const dataDefault = React.useRef({
    id: '',
    nameArea: '',
    lat: '',
    lng: '',
    zoom: '',
    active: 1,
    languageId: arrayIdLanguage[indexFirst.current],
  })
  const [dataFromForm, setDataFromForm] = useState(dataDefault.current)

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

  const handleTurnOnMap = () => {
    setIsOnMap(true)
  }

  const handleCheckSubmit = () => {
    if (isGetDataSuccessful) {
      return '/'
    } else {
      return ''
    }
  }

  return (
    <React.Fragment>
      {isOnMap && (
        <MapLeaflet
          setIsCheckMap={setIsOnMap}
          inputForm={dataFromForm}
          setInputForm={setDataFromForm}
        />
      )}
      <div className={styles.wrapperCreateNew}>
        <div className={styles.wrapper_main_form}>
          <h2>{text}</h2>
          <div className={styles.wrapperForm}>
            <InputText
              id='1'
              textLabel='ID khu vực'
              name='id'
              inputForm={dataFromForm}
              setInputForm={setDataFromForm}
              checkInput={isFirstClick}
            />
            <InputText
              id='2'
              textLabel='Tên khu vực'
              name='nameArea'
              inputForm={dataFromForm}
              setInputForm={setDataFromForm}
              checkInput={isFirstClick}
            />
            <InputText
              id='3'
              textLabel='Tọa độ Lat'
              name='lat'
              isNumber={true}
              inputForm={dataFromForm}
              setInputForm={setDataFromForm}
              checkInput={isFirstClick}
            />
            <InputText
              id='4'
              textLabel='Tọa độ Lng'
              name='lng'
              isNumber={true}
              inputForm={dataFromForm}
              setInputForm={setDataFromForm}
              checkInput={isFirstClick}
            />
            <ButtonElement onClick={handleTurnOnMap}>
              Chọn tọa độ trên bản đồ
            </ButtonElement>
            <InputNumber
              id='5'
              textLabel='Zoom'
              name='zoom'
              isNumber={true}
              inputForm={dataFromForm}
              setInputForm={setDataFromForm}
              checkInput={isFirstClick}
            />
            <InputDeps
              id='6'
              textLabel='ID ngôn ngữ'
              arrayDeps={arrayIdLanguage}
              name='languageId'
              inputForm={dataFromForm}
              setInputForm={setDataFromForm}
            />
            <InputDeps
              id='7'
              textLabel='Hiển thị'
              arrayDeps={hidden}
              name='active'
              isNumber={true}
              inputForm={dataFromForm}
              setInputForm={setDataFromForm}
            />
            <div className={styles.wrapper_button}>
              <button onClick={handleCreateNew}>
                <Link to={handleCheckSubmit}>Tạo mới</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default RegionForm
