import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

//Thư mục
import styles from './form.module.scss'
import InputText from '../FormAction/InputForm/InputText'
import InputDeps from '../FormAction/InputForm/InputDeps'
import InputFile from '../FormAction/InputForm/InputFile'
import tableDataAPI from 'app/api/tableData'
import {useSelector} from 'react-redux'
import InputColorPicker from '../FormAction/InputForm/InputColorPicker'
import InputNumber from '../FormAction/InputForm/InputNumber'

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

function ClassifyForm({text, paramName, dataItem}) {
  const [isFirstClick, setIsFirstClick] = useState(false)
  const [isGetDataSuccessful, setIsGetDataSuccessful] = useState()
  // const [isOnMap, setIsOnMap] = useState(false)

  const dataFromRedux = useSelector(
    (state) => state['displayMainContent']['data']
  )

  const keys = React.useRef({
    language: 'language',
    id: 'id',
    classify: 'classify',
    area: 'area',
  })
  let arrayIdLanguage = dataFromRedux[keys.current.language].map(
    (infoLanguage) => infoLanguage[keys.current.id]
  )
  let arrayIdClassify = dataFromRedux[keys.current.classify].map(
    (infoClassify) => infoClassify[keys.current.id]
  )
  let arrayIdArea = dataFromRedux[keys.current.area].map(
    (infoArea) => infoArea[keys.current.id]
  )
  let optionStyle = ['Vector', 'Raster']
  let hidden = ['Có', 'Không']

  const indexFirst = React.useRef(0)
  const dataDefault = React.useRef({
    id: '',
    nameLayer: '',
    classifyId: arrayIdClassify[indexFirst.current],
    areaId: arrayIdArea[indexFirst.current],
    style: optionStyle[indexFirst.current],
    path: '',
    icon: '',
    borderColor: '#333',
    backgroundColor: '#333',
    widthBorder: '',
    opacityBorder: '',
    opacityBackground: '',
    latSW: '',
    lngSW: '',
    latNE: '',
    lngNE: '',
    active: 1,
    zIndex: '',
    languageId: arrayIdLanguage[indexFirst.current],
  })
  const [dataFromForm, setDataFromForm] = useState(dataDefault.current)

  if (dataFromForm['style'] === 'Raster') {
    dataFromForm['borderColor'] = '#333'
    dataFromForm['widthBorder'] = ''
    dataFromForm['opacityBorder'] = ''
    dataFromForm['backgroundColor'] = '#333'
    dataFromForm['opacityBackground'] = ''
  } else {
    dataFromForm['latSW'] = ''
    dataFromForm['lngSW'] = ''
    dataFromForm['latNE'] = ''
    dataFromForm['lngNE'] = ''
  }

  const handleCreateNew = async () => {
    console.log(dataFromForm)
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
            textLabel='ID lớp'
            name='id'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
          />
          <InputDeps
            id='2'
            textLabel='Tên khu vực'
            name='areaId'
            arrayDeps={arrayIdArea}
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
          />
          <InputDeps
            id='3'
            textLabel='Tên ngôn ngữ'
            name='languageId'
            arrayDeps={arrayIdLanguage}
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
          />
          <InputDeps
            id='4'
            textLabel='Tên phân loại'
            name='classifyId'
            arrayDeps={arrayIdClassify}
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
          />
          <InputText
            id='5'
            textLabel='Tên lớp'
            name='nameLayer'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
          />
          <InputFile
            id='6'
            textLabel='Đường dẫn'
            name='path'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
          />
          <InputFile
            id='7'
            textLabel='Icon'
            name='icon'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
          />
          <InputNumber
            id='19'
            textLabel='Xếp chồng lớp'
            name='zIndex'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
            isNumber={true}
          />
          <InputDeps
            id='8'
            textLabel='Kiểu'
            name='style'
            arrayDeps={optionStyle}
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
          />
          {dataFromForm['style'] === 'Raster' ? (
            <React.Fragment>
              <InputText
                id={10}
                textLabel='Tọa độ latSW'
                name='latSW'
                inputForm={dataFromForm}
                setInputForm={setDataFromForm}
                checkInput={isFirstClick}
                isNumber={true}
              />
              <InputText
                id={11}
                textLabel='Tọa độ lngSW'
                name='lngSW'
                inputForm={dataFromForm}
                setInputForm={setDataFromForm}
                checkInput={isFirstClick}
                isNumber={true}
              />
              <InputText
                id={12}
                textLabel='Tọa độ latNE'
                name='latNE'
                inputForm={dataFromForm}
                setInputForm={setDataFromForm}
                checkInput={isFirstClick}
                isNumber={true}
              />
              <InputText
                id={13}
                textLabel='Tọa độ lngNE'
                name='lngNE'
                inputForm={dataFromForm}
                setInputForm={setDataFromForm}
                checkInput={isFirstClick}
                isNumber={true}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <InputColorPicker
                id={14}
                textLabel='Màu viền'
                inputForm={dataFromForm}
                name='borderColor'
                setInputForm={setDataFromForm}
                checkInput={isFirstClick}
              />
              <InputText
                id={15}
                textLabel='Độ rộng viền'
                name='widthBorder'
                inputForm={dataFromForm}
                isNumber={true}
                setInputForm={setDataFromForm}
                checkInput={isFirstClick}
              />
              <InputText
                id={16}
                textLabel='Viền trong suốt'
                name='opacityBorder'
                inputForm={dataFromForm}
                isNumber={true}
                setInputForm={setDataFromForm}
                checkInput={isFirstClick}
              />
              <InputColorPicker
                id={17}
                textLabel='Màu nền'
                name='backgroundColor'
                inputForm={dataFromForm}
                setInputForm={setDataFromForm}
                checkInput={isFirstClick}
              />
              <InputText
                id={18}
                textLabel='Nền trong suốt'
                name='opacityBackground'
                inputForm={dataFromForm}
                setInputForm={setDataFromForm}
                checkInput={isFirstClick}
              />
            </React.Fragment>
          )}
          <InputDeps
            id='9'
            textLabel='Hiển thị'
            name='active'
            arrayDeps={hidden}
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
  )
}

export default ClassifyForm
