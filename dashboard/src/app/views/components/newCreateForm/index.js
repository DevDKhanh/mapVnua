import React from 'react'
import {useOutletContext} from 'react-router-dom'

// path of folder
import styles from './form.module.scss'
import FormLanguage from './LanguageForm'
import FormRegion from './RegionForm'
import FormClassify from './ClassifyForm'
import FormConfig from './ConfigForm'
import FormAccount from './AccountForm'
import FormClass from './ClassForm'

const formUpdate = (dataProps) => {
  switch (dataProps.nameURL) {
    case 'area':
      return <FormRegion dataProps={dataProps} />
    case 'classify':
      return <FormClassify dataProps={dataProps} />
    case 'layer':
      return <FormClass dataProps={dataProps} />
    case 'setting':
      return <FormConfig dataProps={dataProps} />
    case 'language':
      return <FormLanguage dataProps={dataProps} />
    case 'account':
      return <FormAccount dataProps={dataProps} />
    default:
      return null
  }
}

function NewCreateForm({nameUrl}) {
  const dataProps = {
    text: 'Tạo mới',
    nameURL: nameUrl,
  }

  return <div className={styles.wrapper_main_form}>{formUpdate(dataProps)}</div>
}

export default NewCreateForm
