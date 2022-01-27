import React from 'react'
import {useParams} from 'react-router-dom'

// path of folder
import styles from './EditPage.module.scss'
import EditForm from '../../../components/EditForm/EditForm'
import {useSelector} from 'react-redux'

const convertActivetoNumber = (itemFound, convertedItem) => {
  switch (itemFound.active) {
    case 'Không':
      return (convertedItem.active = 0)
    case 'Có':
      return (convertedItem.active = 1)
    default:
      return null
  }
}

const findItemConvert = (itemFound, convertedItem) => {
  if (itemFound.active && itemFound.lng && itemFound.lat) {
    convertActivetoNumber(itemFound, convertedItem)
    convertedItem.lng = Number(itemFound.lng)
    convertedItem.lat = Number(itemFound.lat)
  } else if (itemFound.lng && itemFound.lat) {
    convertedItem.lng = Number(itemFound.lng)
    convertedItem.lat = Number(itemFound.lat)
  } else if (itemFound.active) {
    convertActivetoNumber(itemFound, convertedItem)
  }
}

const isLanguage = (nameURL) => {
  return nameURL === 'language'
}

function EditPage() {
  const {name, id} = useParams()
  const [itemEdit, setItemEdit] = React.useState()

  const dataTableInRedux = useSelector((state) => state.displayMainContent.data)

  React.useEffect(() => {
    const idURL = id
    const idItem = 'id'

    // search item by id
    const itemFound = dataTableInRedux[name].find(
      (row) => row[idItem].toString() === idURL
    )

    // Delete id to accurate data
    // !isLanguage(name) ----- because the edit language needs id
    !isLanguage(name) && delete itemFound.id

    // storing keys must be converted to number
    const convertedItem = {}

    findItemConvert(itemFound, convertedItem)

    setItemEdit({
      ...itemFound,
      ...convertedItem,
    })
  }, [id, name, dataTableInRedux])

  return (
    <div className={styles.container}>
      <EditForm itemEdit={itemEdit} nameURL={name} idURL={id} />
    </div>
  )
}

export default EditPage
