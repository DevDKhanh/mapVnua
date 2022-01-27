import React from 'react'
import {useSelector} from 'react-redux'

import PanelMainContent from '../../Panel/PanelMainContent.js'

const MainContenTable = () => {
  const dataDisplayComponent = useSelector((state) => state.displayMainContent) //value return redux to display component

  return (
    <PanelMainContent
      nameHead={dataDisplayComponent.theadTable}
      dataTable={dataDisplayComponent.data}
    />
  )
}

export default MainContenTable
