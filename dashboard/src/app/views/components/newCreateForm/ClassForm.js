import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

//Thư mục
import styles from './form.module.scss'
import InputText from '../FormAction/InputForm/InputText'
import InputDeps from '../FormAction/InputForm/InputDeps'
import InputFile from '../FormAction/InputForm/InputFile'
import InputRaster from '../FormAction/InputForm/InputRaster'
import InputVector from '../FormAction/InputForm/InputVector'
import tableDataAPI from 'app/api/tableData'
import {useSelector} from 'react-redux'
import {PElement} from './element'
import InputColorPicker from '../FormAction/InputForm/InputColorPicker'
import InputNumber from '../FormAction/InputForm/InputNumber'

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
  const area = data['area'].map((item) => item)
  const language = data['language'].map((item) => item)
  const classify = data['classify'].map((item) => item)

  let arrayDeps1 = area.map((item) => item['nameArea'])
  let arrayDeps2 = language.map((item) => item['nameLanguage'])
  let arrayDeps3 = classify.map((item) => item['nameClassify'])
  let arrayDeps4 = ['Vector', 'Raster']
  let arrayDeps5 = ['Có', 'Không']

  //state stores all input's data
  const [inputForm, setInputForm] = useState({
    active: 1,
    style: arrayDeps4[0],
    areaId: arrayDeps1[0],
    languageId: arrayDeps2[0],
    classifyId: arrayDeps3[0],
    borderColor: '#333',
    backgroundColor: '#333',
  })

  // console.log(inputForm)

  if (inputForm['style'] === 'Raster') {
    inputForm['borderColor'] = '#333'
    inputForm['widthBorder'] = ''
    inputForm['opacityBorder'] = ''
    inputForm['backgroundColor'] = '#333'
    inputForm['opacityBackground'] = ''
  } else {
    inputForm['latSW'] = ''
    inputForm['lngSW'] = ''
    inputForm['latNE'] = ''
    inputForm['lngNE'] = ''
  }

  const handleClickCreateNew = async () => {
    setCheckInput(true)
    console.log(inputForm)
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
            textLabel='ID lớp'
            name='id'
            inputForm={inputForm}
            setInputForm={setInputForm}
            checkInput={checkInput}
          />
          <InputDeps
            id='2'
            textLabel='Tên khu vực'
            name='areaId'
            arrayDeps={arrayDeps1}
            inputForm={inputForm}
            setInputForm={setInputForm}
          />
          <InputDeps
            id='3'
            textLabel='Tên ngôn ngữ'
            name='languageId'
            arrayDeps={arrayDeps2}
            inputForm={inputForm}
            setInputForm={setInputForm}
          />
          <InputDeps
            id='4'
            textLabel='Tên phân loại'
            name='classifyId'
            arrayDeps={arrayDeps3}
            inputForm={inputForm}
            setInputForm={setInputForm}
          />
          <InputText
            id='5'
            textLabel='Tên lớp'
            name='nameLayer'
            inputForm={inputForm}
            setInputForm={setInputForm}
            checkInput={checkInput}
          />
          <InputFile
            id='6'
            textLabel='Đường dẫn'
            name='path'
            inputForm={inputForm}
            setInputForm={setInputForm}
            checkInput={checkInput}
          />
          <InputFile
            id='7'
            textLabel='Icon'
            name='icon'
            inputForm={inputForm}
            setInputForm={setInputForm}
            checkInput={checkInput}
          />
          <InputNumber
            id='19'
            textLabel='Xếp chồng lớp'
            name='zIndex'
            inputForm={inputForm}
            setInputForm={setInputForm}
            checkInput={checkInput}
            isNumber={true}
          />
          <InputDeps
            id='8'
            textLabel='Kiểu'
            name='style'
            arrayDeps={arrayDeps4}
            inputForm={inputForm}
            setInputForm={setInputForm}
          />
          {inputForm['style'] === 'Raster' ? (
            <React.Fragment>
              <InputText
                id={10}
                textLabel='Tọa độ latSW'
                name='latSW'
                inputForm={inputForm}
                setInputForm={setInputForm}
                checkInput={checkInput}
                isNumber={true}
              />
              <InputText
                id={11}
                textLabel='Tọa độ lngSW'
                name='lngSW'
                inputForm={inputForm}
                setInputForm={setInputForm}
                checkInput={checkInput}
                isNumber={true}
              />
              <InputText
                id={12}
                textLabel='Tọa độ latNE'
                name='latNE'
                inputForm={inputForm}
                setInputForm={setInputForm}
                checkInput={checkInput}
                isNumber={true}
              />
              <InputText
                id={13}
                textLabel='Tọa độ lngNE'
                name='lngNE'
                inputForm={inputForm}
                setInputForm={setInputForm}
                checkInput={checkInput}
                isNumber={true}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <InputColorPicker
                id={14}
                textLabel='Màu viền'
                inputForm={inputForm}
                name='borderColor'
                setInputForm={setInputForm}
                checkInput={checkInput}
              />
              <InputText
                id={15}
                textLabel='Độ rộng viền'
                name='widthBorder'
                inputForm={inputForm}
                isNumber={true}
                setInputForm={setInputForm}
                checkInput={checkInput}
              />
              <InputText
                id={16}
                textLabel='Viền trong suốt'
                name='opacityBorder'
                inputForm={inputForm}
                isNumber={true}
                setInputForm={setInputForm}
                checkInput={checkInput}
              />
              <InputColorPicker
                id={17}
                textLabel='Màu nền'
                name='backgroundColor'
                inputForm={inputForm}
                setInputForm={setInputForm}
                checkInput={checkInput}
              />
              <InputText
                id={18}
                textLabel='Nền trong suốt'
                name='opacityBackground'
                inputForm={inputForm}
                setInputForm={setInputForm}
                checkInput={checkInput}
              />
            </React.Fragment>
          )}
          <InputDeps
            id='9'
            textLabel='Hiển thị'
            name='active'
            arrayDeps={arrayDeps5}
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
                  Object.keys(inputForm).length === 14 && isSuccessful === 1
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
