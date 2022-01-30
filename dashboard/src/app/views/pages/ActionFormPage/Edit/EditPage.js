import React from 'react'
import {useParams} from 'react-router-dom'

// path of folder
import styles from './EditPage.module.scss'
import EditForm from '../../../components/EditForm/EditForm'

function EditPage() {
  const {name, id} = useParams()

  return (
    <div className={styles.container}>
      <EditForm nameURL={name} idURL={id} />
    </div>
  )
}

export default EditPage
