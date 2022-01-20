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
import {toast} from 'react-toastify'

// call api
const callAPI = async (data, paramName) => {
  try {
    return await tableDataAPI['create'](data, null, paramName)
  } catch (error) {
    return error
  }
}

function LanguageForm({text, paramName, isEdit}) {
  // catch the first time button click event
  const [checkInput, setCheckInput] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState()

  //state stores all input's data
  const [inputForm, setInputForm] = useState({
    id: '',
    nameLanguage: '',
    icon: '',
  })

  //edit
  // const {id} = useParams()
  // const data = useSelector((state) => state['displayMainContent']['data'])

  // useEffect(() => {
  //   let objectEdit

  //   if (isEdit) {
  //     objectEdit = data[paramName].find((item) => item['id'] === id)
  //     setInputForm(objectEdit)
  //   }
  // }, [])

  //handle click of button to create new
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

  const handleCheckSubmit = () => {
    if (isSuccessful) {
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
            <button onClick={handleClickCreateNew}>
              <Link to={handleCheckSubmit}>
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
