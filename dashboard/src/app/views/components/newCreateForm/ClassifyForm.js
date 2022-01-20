import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

//Thư mục
import styles from './form.module.scss'
import InputText from '../FormAction/InputForm/InputText'
import InputDeps from '../FormAction/InputForm/InputDeps'
import tableDataAPI from 'app/api/tableData'
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
    id: '',
    nameClassify: '',
    active: 1,
    languageId: arrayDeps[0],
    no: 0,
  })

  // useEffect(() => {
  //   Object.keys(inputForm).forEach((item) => {
  //     console.log(inputForm[item] === '')
  //     inputForm[item] === '' && delete inputForm[item]
  //   })
  //   console.log(inputForm)
  // }, [inputForm])

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
      console.log('vao day')
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
            <button onClick={handleClickCreateNew}>
              <Link to={handleCheckSubmit}>Tạo mới</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassifyForm
