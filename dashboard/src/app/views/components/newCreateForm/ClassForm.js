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
import dataFormTable from '../../../config/dataForm.js'
import {ButtonElement} from './element.js'
import MapLeaflet from '../Map/MapLeafLet.js'

const checkResData = (parameters) => {
  const statusNotifications = {
    success: 'success',
    error: 'error',
  }
  const textnotifications = {
    success: parameters.method ? 'Chỉnh sửa thành công' : 'Tạo mới thành công',
    error: parameters.method ? 'Chỉnh sửa thất bại' : 'Tạo mới thất bại',
  }

  if (
    typeof parameters.resData === 'object' &&
    parameters.resData.code === 400
  ) {
    textnotifications.error = parameters.resData.message
    notifications(statusNotifications.error, textnotifications.error)
  }
  if (Array.isArray(parameters.resData) && parameters.resData[0].code === 200) {
    notifications(statusNotifications.success, textnotifications.success)

    // !method = null not exits method
    if (!parameters.method) {
      parameters.setDataFromForm({
        ...parameters.dataFromForm,
        id: '',
        nameLayer: '',
        classifyId: parameters.arrayIdClassify[0],
        areaId: parameters.arrayIdArea[0],
        style: parameters.optionStyle[0],
        borderColor: '#333',
        backgroundColor: '#333',
        widthBorder: 1,
        opacityBorder: 1,
        opacityBackground: 1,
        latSW: 1,
        lngSW: 1,
        latNE: 1,
        lngNE: 1,
        active: 1,
        zIndex: 1,
        languageId: parameters.arrayIdLanguage[0],
      })
      parameters.setIsFirstClick(false)
    }
  }
  if (Array.isArray(parameters.resData) && parameters.resData[0].code === 400) {
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

// ===========
function ClassifyForm({dataProps}) {
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
    classify: 'classify',
    area: 'area',
  })

  const arrayIdLanguage = dataFromRedux[keys.current.language].map(
    (infoLanguage) => infoLanguage[keys.current.id]
  )

  const arrayIdClassify = dataFromRedux[keys.current.classify].map(
    (infoClassify) => infoClassify[keys.current.id]
  )

  const arrayIdArea = dataFromRedux[keys.current.area].map(
    (infoArea) => infoArea[keys.current.id]
  )

  const optionStyle = ['Vector', 'Raster']

  const hidden = ['Có', 'Không']

  const dataDefault = React.useRef({
    id: '',
    nameLayer: '',
    classifyId: arrayIdClassify[0],
    areaId: arrayIdArea[0],
    style: optionStyle[0],
    path: '',
    icon: '',
    borderColor: '#333',
    backgroundColor: '#333',
    widthBorder: 1,
    opacityBorder: 1,
    opacityBackground: 1,
    latSW: 1,
    lngSW: 1,
    latNE: 1,
    lngNE: 1,
    active: 1,
    zIndex: 1,
    languageId: arrayIdLanguage[0],
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

    if (dataFromForm.path) {
      const formData = new FormData()

      const statusNotifications = {
        error: 'error',
      }

      if (dataFromForm.style === 'Vector') {
        formData.append('file', dataFromForm.path)

        try {
          const [resFileUrl] = await tableDataAPI.upload(formData, 'file', null)

          formSubmit.path = resFileUrl.filename
        } catch (error) {
          formSubmit.path = ''

          const textnotifications = {
            error: error.message,
          }

          notifications(statusNotifications.error, textnotifications.error)
        }
      }

      if (dataFromForm.style === 'Raster') {
        formData.append('file', dataFromForm.path)

        try {
          const [resImageUrl] = await tableDataAPI.upload(
            formData,
            'image',
            null
          )

          formSubmit.path = resImageUrl.filename
        } catch (error) {
          formSubmit.path = '' //to catch error

          const textnotifications = {
            error: error.message,
          }

          notifications(statusNotifications.error, textnotifications.error)
        }
      }
    }

    const isFullData = isCheckDataEmptyFromForm(formSubmit)
    if (isFullData) {
      const dataForm = formSubmit
      const nameURL = dataProps.nameURL
      const method = 'create'

      const resData = await handleDataToAPI(dataForm, nameURL, method)

      const parameters = {
        method: null,
        resData: resData,
        setDataFromForm: setDataFromForm,
        dataFromForm: dataFromForm,
        arrayIdClassify: arrayIdClassify,
        arrayIdArea: arrayIdArea,
        optionStyle: optionStyle,
        arrayIdLanguage: arrayIdLanguage,
        setIsFirstClick: setIsFirstClick,
      }

      checkResData(parameters)
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

  const handleTurnOnMap = () => {
    setIsOnMap(true)
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

    if (dataFromForm.path) {
      const formData = new FormData()

      const statusNotifications = {
        error: 'error',
      }

      if (dataFromForm.style === 'Vector') {
        formData.append('file', dataFromForm.path)

        try {
          const [resFileUrl] = await tableDataAPI.upload(formData, 'file', null)

          formSubmit.path = resFileUrl.filename
        } catch (error) {
          formSubmit.path = ''

          const textnotifications = {
            error: error.message,
          }

          notifications(statusNotifications.error, textnotifications.error)
        }
      }

      if (dataFromForm.style === 'Raster') {
        formData.append('file', dataFromForm.path)

        try {
          const [resImageUrl] = await tableDataAPI.upload(
            formData,
            'image',
            null
          )

          formSubmit.path = resImageUrl.filename
        } catch (error) {
          formSubmit.path = '' //to catch error

          const textnotifications = {
            error: error.message,
          }

          notifications(statusNotifications.error, textnotifications.error)
        }
      }
    }

    const isFullData = isCheckDataEmptyFromForm(formSubmit)

    if (isFullData) {
      const dataForm = formSubmit
      const nameURL = dataProps.nameURL
      const idURL = dataProps.idURL
      const method = 'update'

      const resData = await handleDataToAPI(dataForm, nameURL, method, idURL)

      const parameters = {
        resData: resData,
        method: method,
      }

      checkResData(parameters)
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
    <React.Fragment>
      {isOnMap && (
        <MapLeaflet
          setIsCheckMap={setIsOnMap}
          inputForm={dataFromForm}
          setInputForm={setDataFromForm}
          isLayer={true}
        />
      )}
      <div className={styles.wrapperCreateNew}>
        <div className={styles.wrapper_main_form}>
          <h2>{dataProps.text}</h2>
          <div className={styles.wrapperForm}>
            <InputText
              id='1'
              textLabel='ID lớp'
              name='id'
              inputForm={dataFromForm}
              setInputForm={setDataFromForm}
              checkInput={isFirstClick}
              disable={dataProps.isEdit && true}
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
                <InputNumber
                  id={10}
                  textLabel='Tọa độ latSW'
                  name='latSW'
                  step={0.01}
                  inputForm={dataFromForm}
                  setInputForm={setDataFromForm}
                  checkInput={isFirstClick}
                  isNumber={true}
                />
                <InputNumber
                  id={11}
                  textLabel='Tọa độ lngSW'
                  name='lngSW'
                  step={0.01}
                  inputForm={dataFromForm}
                  setInputForm={setDataFromForm}
                  checkInput={isFirstClick}
                  isNumber={true}
                />
                <InputNumber
                  id={12}
                  textLabel='Tọa độ latNE'
                  name='latNE'
                  step={0.01}
                  inputForm={dataFromForm}
                  setInputForm={setDataFromForm}
                  checkInput={isFirstClick}
                  isNumber={true}
                />
                <InputNumber
                  id={13}
                  textLabel='Tọa độ lngNE'
                  name='lngNE'
                  step={0.01}
                  inputForm={dataFromForm}
                  setInputForm={setDataFromForm}
                  checkInput={isFirstClick}
                  isNumber={true}
                />
                <ButtonElement onClick={handleTurnOnMap}>
                  Chọn tọa độ trên bản đồ
                </ButtonElement>
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
                <InputNumber
                  id={15}
                  textLabel='Độ rộng viền'
                  name='widthBorder'
                  inputForm={dataFromForm}
                  isNumber={true}
                  setInputForm={setDataFromForm}
                  checkInput={isFirstClick}
                />
                <InputNumber
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
                <InputNumber
                  id={18}
                  textLabel='Nền trong suốt'
                  name='opacityBackground'
                  isNumber={true}
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

export default ClassifyForm
