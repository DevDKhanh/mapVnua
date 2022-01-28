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

const checkResData = (
  resData,
  method,
  setDataFromForm,
  arrayIdLanguage,
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
        id: '',
        nameArea: '',
        lat: '',
        lng: '',
        zoom: '',
        active: 1,
        languageId: arrayIdLanguage[0],
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

function RegionForm({dataProps}) {
  const [isFirstClick, setIsFirstClick] = useState(false)
  const [isOnMap, setIsOnMap] = useState(false)

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

  const dataDefault = React.useRef({
    id: '',
    nameArea: '',
    lat: '',
    lng: '',
    zoom: '',
    active: 1,
    languageId: arrayIdLanguage[0],
  })
  const [dataFromForm, setDataFromForm] = useState(dataDefault.current)

  const handleCreateNew = async () => {
    setIsFirstClick(true)
    const formSubmit = {...dataFromForm}

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
        arrayIdLanguage,
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

  const handleTurnOnMap = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setIsOnMap(true)
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
          <h2>{dataProps.text}</h2>
          <div className={styles.wrapperForm}>
            <InputText
              id='1'
              textLabel='ID khu vực'
              name='id'
              inputForm={dataFromForm}
              setInputForm={setDataFromForm}
              checkInput={isFirstClick}
              disable={dataProps.isEdit && true}
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
              <button onClick={dataProps.isEdit ? handleEdit : handleCreateNew}>
                <span>{dataProps.text}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default RegionForm
