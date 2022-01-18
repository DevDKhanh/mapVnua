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

// call api
const callAPI = async (data, paramName) => {
  try {
    return await tableDataAPI['create'](JSON.stringify(data), null, paramName)
  } catch (error) {
    return error.message
  }
}

function LanguageForm({text, paramName, isEdit}) {
  // catch the first time button click event
  const [checkInput, setCheckInput] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState()

  //state stores all input's data
  const [inputForm, setInputForm] = useState({})

  const {id} = useParams()

  const data = useSelector((state) => state['displayMainContent']['data'])

  useEffect(() => {
    let objectEdit

    if (isEdit) {
      objectEdit = data[paramName].find((item) => item['id'] === id)
      setInputForm(objectEdit)
    }
  }, [])

  //handle click of button to create new
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
            name='id'
            textLabel='ID ngôn ngữ'
            inputForm={inputForm}
            setInputForm={setInputForm}
            checkInput={checkInput}
          />
          <InputText
            id='2'
            name='nameLanguage'
            textLabel='Tên ngôn ngữ'
            inputForm={inputForm}
            setInputForm={setInputForm}
            checkInput={checkInput}
          />
          <InputFile
            id='3'
            name='icon'
            textLabel='Icon'
            inputForm={inputForm}
            setInputForm={setInputForm}
            checkInput={checkInput}
          />
          <div className={styles.wrapper_button}>
            {isSuccessful === 1 && (
              <PElement color='green'>
                {`${!isEdit ? 'Tạo mới' : 'Chỉnh sửa'} thành công`}
              </PElement>
            )}
            {isSuccessful === 0 && (
              <PElement color='red'>
                {`${!isEdit ? 'Tạo mới' : 'Chỉnh sửa'} thất bại`}
              </PElement>
            )}
            <button onClick={handleClickCreateNew}>
              <Link
                to={
                  Object.keys(inputForm).length === 3 && isSuccessful === 1
                    ? '/'
                    : ''
                }
              >
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
