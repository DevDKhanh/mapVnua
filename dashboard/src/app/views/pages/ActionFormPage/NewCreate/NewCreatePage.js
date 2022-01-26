import React from 'react'
import {useParams} from 'react-router-dom'

// Path of folder
import styles from './NewCreatePage.module.scss'
import NewCreateForm from '../../../components/newCreateForm'

function NewCreatePage() {
  const {name} = useParams()

  return (
    <div className={styles.container}>
      <NewCreateForm nameUrl={name} />
    </div>
  )
}

export default NewCreatePage
