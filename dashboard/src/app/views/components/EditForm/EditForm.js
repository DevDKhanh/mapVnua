import React from 'react'
import {useParams} from 'react-router-dom'

//path of folder
import styles from './EditForm.module.scss'
import FormLanguage from '../newCreateForm/LanguageForm'
import FormRegion from '../newCreateForm/RegionForm'
import FormClassify from '../newCreateForm/ClassifyForm'
import FormConfig from '../newCreateForm/ConfigForm'
import FormInterface from '../newCreateForm/InterfaceForm'
import FormAccount from '../newCreateForm/AccountForm'
import ClassForm from '../newCreateForm/ClassForm'

function EditForm({setIsVisible, dataItem}) {
  const {name, id} = useParams()

  return (
    <div
      className={styles.wrapper_main_form}
      onClick={() => setIsVisible(false)}
    >
      {/* content of main */}
      {name === 'language' && (
        <FormLanguage
          id={id}
          paramName={name}
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
          isEdit={true}
        />
      )}
      {name === 'area' && (
        <FormRegion
          id={id}
          paramName={name}
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
          isEdit={true}
        />
      )}
      {name === 'classify' && (
        <FormClassify
          id={id}
          paramName={name}
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
          isEdit={true}
        />
      )}
      {name === 'setting' && (
        <FormConfig
          id={id}
          paramName={name}
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
          isEdit={true}
        />
      )}
      {name === 'interface' && (
        <FormInterface
          id={id}
          paramName={name}
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
          isEdit={true}
        />
      )}
      {name === 'account' && (
        <FormAccount
          id={id}
          paramName={name}
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
          isEdit={true}
        />
      )}
      {name === 'layer' && (
        <ClassForm
          id={id}
          paramName={name}
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
          isEdit={true}
        />
      )}
    </div>
  )
}

export default EditForm
