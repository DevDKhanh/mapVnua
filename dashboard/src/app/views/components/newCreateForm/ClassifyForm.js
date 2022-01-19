import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

//Thư mục
import styles from './form.module.scss'
import InputText from '../FormAction/InputForm/InputText'
import InputDeps from '../FormAction/InputForm/InputDeps'
import tableDataAPI from 'app/api/tableData'
import {useSelector} from 'react-redux'
import {PElement} from './element'

// call api
const callAPI = async (data, paramName) => {
  try {
    return await tableDataAPI['create'](JSON.stringify(data), null, paramName)
  } catch (error) {
    return error.message
  }
}

function ClassifyForm({text, paramName, dataItem}) {
  // catch the first time button click event
  const [checkInput, setCheckInput] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState()

  // lấy dữ liệu redux
  const data = useSelector((state) => state['displayMainContent']['data'])
  let arrayDeps = data['language'].map((item) => item['id'])
  let arrayDeps1 = ['Có', 'Không']

  //state stores all input's data
  const [inputForm, setInputForm] = useState({
    active: 1,
    languageId: arrayDeps[0],
    no: 0,
  })

  useEffect(() => {
    Object.keys(inputForm).forEach((item) => {
      console.log(inputForm[item] === '')
      inputForm[item] === '' && delete inputForm[item]
    })
    console.log(inputForm)
  }, [inputForm])

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
            textLabel='ID phân loại'
            name='id'
            inputForm={inputForm}
            setInputForm={setInputForm}
            checkInput={checkInput}
          />
          <InputText
            id='2'
            textLabel='Tên phân loại'
            name='nameClassify'
            inputForm={inputForm}
            setInputForm={setInputForm}
            checkInput={checkInput}
          />
          <InputDeps
            id='3'
            textLabel='Tên ngôn ngữ'
            name='languageId'
            arrayDeps={arrayDeps}
            inputForm={inputForm}
            setInputForm={setInputForm}
          />
          <InputDeps
            id='4'
            textLabel='Hiển thị'
            name='active'
            arrayDeps={arrayDeps1}
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

export default ClassifyForm
