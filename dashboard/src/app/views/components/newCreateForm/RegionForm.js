import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

//Thư mục
import styles from './form.module.scss'
import InputText from '../FormAction/InputForm/InputText'
import InputNumber from '../FormAction/InputForm/InputNumber'
import InputDeps from '../FormAction/InputForm/InputDeps'
import tableDataAPI from 'app/api/tableData'
import {ButtonElement, PElement} from './element'
import MapLeaflet from '../Map/MapLeafLet'
import {toast} from 'react-toastify'

// call api
const callAPI = async (data, paramName) => {
  try {
    return await tableDataAPI['create'](data, null, paramName)
  } catch (error) {
    return error
  }
}

function RegionForm({text, paramName, id}) {
  // catch the first time button click event
  const [checkInput, setCheckInput] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState()

  // state check map on/off
  const [isCheckMap, setIsCheckMap] = useState(false)

  // useEffect(() => {
  //   id && console.log(data[paramName].find((item) => item['id'] === id))
  // }, [id])

  // get data redux
  const data = useSelector((state) => state['displayMainContent']['data'])
  let arrayDeps = data['language'].map((item) => item['id'])
  let arrayDeps1 = ['Có', 'Không']

  //state stores all input's data
  const [inputForm, setInputForm] = useState({
    id: '',
    nameArea: '',
    lat: '',
    lng: '',
    zoom: '',
    active: 1,
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
            <InputText
              id='1'
              textLabel='ID khu vực'
              name='id'
              inputForm={inputForm}
              setInputForm={setInputForm}
              checkInput={checkInput}
            />
            <InputText
              id='2'
              textLabel='Tên khu vực'
              name='nameArea'
              inputForm={inputForm}
              setInputForm={setInputForm}
              checkInput={checkInput}
            />
            <InputText
              id='3'
              textLabel='Tọa độ Lat'
              name='lat'
              isNumber={true}
              inputForm={inputForm}
              setInputForm={setInputForm}
              checkInput={checkInput}
            />
            <InputText
              id='4'
              textLabel='Tọa độ Lng'
              name='lng'
              isNumber={true}
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
              isNumber={true}
              inputForm={inputForm}
              setInputForm={setInputForm}
              checkInput={checkInput}
            />
            <InputDeps
              id='6'
              textLabel='ID ngôn ngữ'
              arrayDeps={arrayDeps}
              name='languageId'
              inputForm={inputForm}
              setInputForm={setInputForm}
            />
            <InputDeps
              id='7'
              textLabel='Hiển thị'
              arrayDeps={arrayDeps1}
              name='active'
              isNumber={true}
              inputForm={inputForm}
              setInputForm={setInputForm}
            />
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

export default RegionForm
