import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'

import MainContent from 'app/views/components/Home/MainContent/MainContent'
import dataFormTable from 'app/config/dataForm'

//styled
const H2Element = styled.h2`
  color: #89aadd;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1rem;
`

const HomePage = () => {
  const [renderTable, setRenderTable] = useState()
  const {name} = useParams()
  useEffect(() => {
    // name in dataFormTable to check exist
    // nameURL can not exist if not check
    name in dataFormTable ? setRenderTable(true) : setRenderTable(false)
  }, [name])

  return (
    <React.Fragment>
      {renderTable ? <MainContent /> : <H2Element>Not found!</H2Element>}
    </React.Fragment>
  )
}

export default HomePage
