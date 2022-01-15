import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'

// Thư mục
import styles from './MenuSection.module.scss'
import tableDataAPI from 'app/api/tableData'
import dataFormTable from 'app/config/dataForm'
import {reqDisplay} from 'app/redux/action/action.componentDisplay'
import {Link} from 'react-router-dom'

//styled
const LinkElement = styled(Link)`
  display: block;
  padding: 10px 20px;
  font-size: 0.9rem;
  color: #ddd;
  position: relative;
  cursor: pointer;
  transition: color 0.4s, font-weight 0.4s !important;

  &:hover {
    color: #fff;
    font-weight: 600;
  }
  ${({isForcus}) =>
    isForcus &&
    `color: #fff;
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.342);
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;`}

  &::before {
    background: #425668;
    bottom: 40%;
    content: '';
    height: 8px;
    left: -2%;
    margin-top: 15px;
    position: absolute;
    right: auto;
    width: 8px;
    z-index: 1;
    border-radius: 50%;
  }

  &::after {
    border-left: 1px solid #425668;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
  }
`

function MenuSectionChildrenSecond({children, dataParam}) {
  const dispatch = useDispatch()
  const [indexFocus, setIndexFocus] = useState()

  const handleComponent = (item, index) => {
    switch (dataParam[index]) {
      case 'area':
        getTableList('area', item)
        break
      case 'classify':
        getTableList('classify', item)
        break
      case 'layer':
        getTableList('layer', item)
        break
      case 'document':
        getTableList('document', item)
        break
      case 'setting':
        getTableList('setting', item)
        break
      case 'interface':
        getTableList('interface', item)
        break
      case 'language':
        getTableList('language', item)
        break
      case 'account':
        getTableList('account', item)
        break
    }
  }

  const getTableList = async (paramName, item) => {
    let objectData = {}
    let arrData = []
    try {
      const tableList = await tableDataAPI.getList(paramName, 1, 100)
      const records = tableList[0]['records']
      records.map((item) => {
        Object.keys(dataFormTable[paramName]).map((keys) => {
          objectData[keys] =
            typeof item[keys] === 'object'
              ? item[keys]['name' + keys[0].toUpperCase() + keys.slice(1)]
              : item[keys]
        })
        arrData.push(objectData)
        objectData = {}
      })
      // console.log(records);

      dispatch(
        reqDisplay({
          text: item,
          data: arrData,
          theadTable: paramName,
        })
      )
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={styles.wrapper_children_second}>
      {children.map((item, index) => (
        <LinkElement
          to='/home'
          tabIndex='0'
          onClick={() => {
            setIndexFocus(index)
            handleComponent(item, index)
          }}
          key={index}
          isForcus={indexFocus === index && true}
        >
          {item}
        </LinkElement>
      ))}
    </div>
  )
}

export default MenuSectionChildrenSecond
