import React from 'react'

//path of folder
import styles from './EditForm.module.scss'
import FormLanguage from '../newCreateForm/LanguageForm'
import FormRegion from '../newCreateForm/RegionForm'
import FormClassify from '../newCreateForm/ClassifyForm'
import FormConfig from '../newCreateForm/ConfigForm'
import FormInterface from '../newCreateForm/InterfaceForm'
import FormAccount from '../newCreateForm/AccountForm'
import ClassForm from '../newCreateForm/ClassForm'

function EditForm({paramName, setIsVisible, dataItem}) {
  return (
    <div
      className={styles.wrapper_main_form}
      onClick={() => setIsVisible(false)}
    >
      {/* content of main */}
      {paramName === 'language' && (
        <FormLanguage
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
        />
      )}
      {paramName === 'region' && (
        <FormRegion
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
        />
      )}
      {paramName === 'classify' && (
        <FormClassify
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
        />
      )}
      {paramName === 'config' && (
        <FormConfig
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
        />
      )}
      {paramName === 'interface' && (
        <FormInterface
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
        />
      )}
      {paramName === 'account' && (
        <FormAccount
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
        />
      )}
      {paramName === 'class' && (
        <ClassForm
          text='Chỉnh sửa'
          dataItem={dataItem}
          setIsVisible={setIsVisible}
        />
      )}
    </div>
  )
}

export default EditForm
