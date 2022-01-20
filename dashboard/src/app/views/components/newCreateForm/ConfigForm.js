import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

//Thư mục
import styles from './form.module.scss'
import InputText from '../FormAction/InputForm/InputText'
import InputDeps from '../FormAction/InputForm/InputDeps'
import InputFile from '../FormAction/InputForm/InputFile'
import InputNumber from '../FormAction/InputForm/InputNumber'
import {ButtonElement} from './element'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import MapLeaflet from '../Map/MapLeafLet'
import tableDataAPI from 'app/api/tableData'

// call api
const callAPI = async (data, paramName) => {
  try {
    return await tableDataAPI['create'](data, null, paramName)
  } catch (error) {
    return error
  }
}

function ConfigForm({text, paramName, dataItem}) {
  // catch the first time button click event
  const [checkInput, setCheckInput] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState()

  // state check map on/off
  const [isCheckMap, setIsCheckMap] = useState(false)

  // get data redux
  const data = useSelector((state) => state['displayMainContent']['data'])
  let arrayDeps = data['language'].map((item) => item['id'])

  //state stores all input's data
  const [inputForm, setInputForm] = useState({
    title: '',
    lat: '',
    lng: '',
    zoom: '',
    languageId: arrayDeps[0],
  })

  const handleClickCreateNew = async () => {
    setCheckInput(true)
    const checkInputForm = Object.values(inputForm).every((item) => item !== '')
    if (checkInputForm) {
      const resAPI = await callAPI(inputForm, paramName)
      if (resAPI['code'] === 400) {
        toast.error(`${resAPI['message']}`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setIsSuccessful(false)
      } else if (resAPI[0]['code'] === 200) {
        toast.success('Tạo mới thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setIsSuccessful(true)
      } else if (resAPI[0]['code'] === 400) {
        toast.error('Tạo mới thất bại', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setIsSuccessful(false)
      }

      console.log(resAPI)
    } else {
      toast.error('Tạo mới thất bại', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setIsSuccessful(false)
    }
  }

  const handleTurnOnMap = () => {
    setIsCheckMap(true)
  }

  const handleCheckSubmit = () => {
    if (isSuccessful) {
      return '/'
    } else {
      return ''
    }
  }

  return (
    <React.Fragment>
      {isCheckMap && (
        <MapLeaflet
          setIsCheckMap={setIsCheckMap}
          inputForm={inputForm}
          setInputForm={setInputForm}
        />
      )}
      <div className={styles.wrapperCreateNew}>
        <div className={styles.wrapper_main_form}>
          <h2>{text}</h2>
          <div className={styles.wrapperForm}>
            <InputDeps
              id='1'
              textLabel='ID ngôn ngữ'
              name='languageId'
              arrayDeps={arrayDeps}
              inputForm={inputForm}
              setInputForm={setInputForm}
            />
            <InputText
              id='2'
              textLabel='Tiêu đề'
              name='title'
              inputForm={inputForm}
              setInputForm={setInputForm}
              checkInput={checkInput}
            />
            <InputText
              id='3'
              textLabel='Tọa độ lat'
              name='lat'
              inputForm={inputForm}
              setInputForm={setInputForm}
              checkInput={checkInput}
            />
            <InputText
              id='4'
              textLabel='Tọa độ lng'
              name='lng'
              inputForm={inputForm}
              setInputForm={setInputForm}
              checkInput={checkInput}
            />
            <ButtonElement onClick={handleTurnOnMap}>
              Chọn tọa độ trên bản đồ
            </ButtonElement>
            <InputNumber
              id='5'
              textLabel='Zoom'
              name='zoom'
              inputForm={inputForm}
              setInputForm={setInputForm}
              checkInput={checkInput}
            />
            {/* <InputFile
              id='6'
              textLabel='Icon'
              inputForm={inputForm}
              setInputForm={setInputForm}
              checkInput={checkInput}
            /> */}

            <div className={styles.wrapper_button}>
              <button onClick={handleClickCreateNew}>
                <Link to={handleCheckSubmit}>Tạo mới</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ConfigForm
