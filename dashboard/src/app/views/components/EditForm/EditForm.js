import React from 'react'

//path of folder
import styles from './EditForm.module.scss'
import FormLanguage from '../newCreateForm/LanguageForm'
import FormRegion from '../newCreateForm/RegionForm'
import FormClassify from '../newCreateForm/ClassifyForm'
import FormConfig from '../newCreateForm/ConfigForm'
import FormInterface from '../newCreateForm/InterfaceForm'
import FormAccount from '../newCreateForm/AccountForm'
import FormClass from '../newCreateForm/ClassForm'
import {useOutletContext} from 'react-router-dom'

const formEdit = (dataProps) => {
  switch (dataProps.nameURL) {
    case 'area':
      return <FormRegion dataProps={dataProps} />
    case 'classify':
      return <FormClassify dataProps={dataProps} />
    case 'layer':
      return <FormClass dataProps={dataProps} />
    case 'setting':
      return <FormConfig dataProps={dataProps} />
    case 'interface':
      return <FormInterface dataProps={dataProps} />
    case 'language':
      return <FormLanguage dataProps={dataProps} />
    case 'account':
      return <FormAccount dataProps={dataProps} />
    default:
      return null
  }
}

function EditForm({itemEdit, nameURL, idURL}) {
  const dataProps = {
    nameURL: nameURL,
    idURL: idURL,
    text: 'Chỉnh sửa',
    isEdit: true,
    itemEdit: itemEdit,
  }

  return <div className={styles.wrapper_main_form}>{formEdit(dataProps)}</div>
}

export default EditForm
