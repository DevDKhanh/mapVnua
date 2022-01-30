import React, {useState, useEffect, useCallback} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

//Thư mục
import styles from './form.module.scss'
import InputText from '../FormAction/InputForm/InputText'
import InputDeps from '../FormAction/InputForm/InputDeps'
import tableDataAPI from 'app/api/tableData'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import InputNumber from '../FormAction/InputForm/InputNumber.js'
import {ElementButton} from '../element.js'

const checkResData = (resData, method, navigate) => {
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
    notifications(
      statusNotifications.success,
      textnotifications.success,
      navigate
    )
  }
  if (Array.isArray(resData) && resData[0].code === 400) {
    notifications(statusNotifications.error, textnotifications.error)
  }
}

const checkNotificationStatus = (status, navigate) => {
  if (status === 'success') {
    navigate('/home/classify')
    return 'success'
  } else {
    return 'error'
  }
}

const notifications = (status, textStatus, navigate) => {
  const filterStatus = checkNotificationStatus(status, navigate)
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

function ClassifyForm({dataProps}) {
  const [isFirstClick, setIsFirstClick] = useState(false)
  const navigate = useNavigate()
  const [languageData, setLanguageData] = useState()

  const [dataFromForm, setDataFromForm] = useState({
    id: '',
    nameClassify: '',
    active: 1,
    no: '',
    nameLanguage: '',
  })

  useEffect(() => {
    const {isEdit} = dataProps

    if (!isEdit && languageData) {
      setDataFromForm({...dataFromForm, nameLanguage: languageData[0].id})
    }
  }, [languageData])

  useEffect(() => {
    const getLanguage = async () => {
      axios
        .get('http://localhost:3000/language?page=1&pageSize=100')
        .then((res) => {
          setLanguageData(res.data.records)
        })
        .catch((e) => console.log(e))
    }

    getLanguage()
  }, [])

  useEffect(() => {
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
        convertedData.nameLanguage = resLayerData.data.language.nameLanguage

        console.log(convertedData)
        setDataFromForm(convertedData)
      }
    })()
  }, [dataProps])

  const convertToName = useCallback(
    (languageData) => {
      if (languageData) {
        return languageData.map((infoLanguege) => infoLanguege.nameLanguage)
      }
    },
    [languageData]
  )

  const convertToId = (languageData, nameLanguage) => {
    if (languageData) {
      const idCurrent = languageData.find(
        (infoLanguege) => infoLanguege.nameLanguage === nameLanguage
      )

      if (idCurrent) {
        return idCurrent.id
      } else {
        return nameLanguage // vì lúc này nameLanguage chính là id do truyền từ useEffect đầu
      }
    }
  }

  const nameLanguage = convertToName(languageData)

  let hidden = ['Có', 'Không']

  const handleCreateNew = async () => {
    setIsFirstClick(true)

    if (dataFromForm.nameLanguage) {
      // thêm languageId
      dataFromForm.languageId = dataFromForm.nameLanguage

      // xóa key nameLanguage
      delete dataFromForm.nameLanguage

      // lấy ra id căn cứ theo name
      dataFromForm.languageId = convertToId(
        languageData,
        dataFromForm.languageId
      )
    }

    const formSubmit = {...dataFromForm}

    const isFullData = isCheckDataEmptyFromForm(formSubmit)

    if (isFullData) {
      const dataForm = formSubmit
      const nameURL = dataProps.nameURL
      const method = 'create'

      const resData = await handleDataToAPI(dataForm, nameURL, method)
      checkResData(resData, null, navigate)
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
      checkResData(resData, method, navigate)
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
            textLabel='ID phân loại'
            name='id'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
            disable={dataProps.isEdit && true}
          />
          <InputNumber
            id='2'
            textLabel='Số thứ tự'
            name='no'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
          />
          {console.log(dataFromForm)}
          <InputText
            id='3'
            textLabel='Tên phân loại'
            name='nameClassify'
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
            checkInput={isFirstClick}
          />
          <InputDeps
            id='4'
            textLabel='Tên ngôn ngữ'
            name='nameLanguage'
            arrayDeps={nameLanguage || []}
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
          />
          <InputDeps
            id='5'
            textLabel='Hiển thị'
            name='active'
            arrayDeps={hidden}
            inputForm={dataFromForm}
            setInputForm={setDataFromForm}
          />
          <div className={styles.wrapper_button}>
            <ElementButton
              mgTop={'10px'}
              onClick={dataProps.isEdit ? handleEdit : handleCreateNew}
            >
              <span>{dataProps.text}</span>
            </ElementButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassifyForm
