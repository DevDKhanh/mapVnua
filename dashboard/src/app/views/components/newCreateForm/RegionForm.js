import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

//Thư mục
import styles from './form.module.scss'
import InputText from '../FormAction/InputForm/InputText'
import InputNumber from '../FormAction/InputForm/InputNumber'
import InputDeps from '../FormAction/InputForm/InputDeps'
import tableDataAPI from 'app/api/tableData'
import {PElement} from './element'

// call api
const callAPI = async (data, paramName) => {
  try {
    return await tableDataAPI['create'](JSON.stringify(data), null, paramName)
  } catch (error) {
    return error.message
  }
}

function RegionForm({text, paramName, id}) {
  // catch the first time button click event
  const [checkInput, setCheckInput] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState()

  // useEffect(() => {
  //   id && console.log(data[paramName].find((item) => item['id'] === id))
  // }, [id])

  // lấy dữ liệu redux
  const data = useSelector((state) => state['displayMainContent']['data'])
  let arrayDeps = data['language'].map((item) => item['id'])
  let arrayDeps1 = ['Có', 'Không']

  //state stores all input's data
  const [inputForm, setInputForm] = useState({
    active: 1,
    languageId: arrayDeps[0],
  })

  const handleClickCreateNew = async () => {
    setCheckInput(true)
    const resAPI = await callAPI(inputForm, paramName)
    if (typeof resAPI === 'string') {
      setIsSuccessful(0)
    } else {
      setIsSuccessful(1)
    }
  }
  return (
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
            {isSuccessful === 1 && (
              <PElement color='green'>Tạo mới thành công</PElement>
            )}
            {isSuccessful === 0 && (
              <PElement color='red'>Tạo mới thất bại</PElement>
            )}
            <button onClick={handleClickCreateNew}>
              <Link
                to={
                  Object.keys(inputForm).length === 7 && isSuccessful === 1
                    ? '/'
                    : ''
                }
              >
                Tạo mới
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegionForm
