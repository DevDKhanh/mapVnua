import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'

// Thư mục
import styles from './MenuSection.module.scss'
import getTableList from 'app/common/covertData'

//styled
const PElement = styled.p`
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

  ${(props) =>
    props.clickItem &&
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
        getTableList('area', item, dispatch)
        break
      case 'classify':
        getTableList('classify', item, dispatch)
        break
      case 'layer':
        getTableList('layer', item, dispatch)
        break
      case 'document':
        getTableList('document', item, dispatch)
        break
      case 'setting':
        getTableList('setting', item, dispatch)
        break
      case 'interface':
        getTableList('interface', item, dispatch)
        break
      case 'language':
        getTableList('language', item, dispatch)
        break
      case 'account':
        getTableList('account', item, dispatch)
        break
      default:
        return
    }
  }

  return (
    <div className={styles.wrapper_children_second}>
      {children.map((item, index) => (
        <PElement
          tabIndex='0'
          onClick={() => {
            setIndexFocus(index)
            handleComponent(item, index)
          }}
          key={index}
          clickItem={indexFocus === index && true}
        >
          {item}
        </PElement>
      ))}
    </div>
  )
}

export default MenuSectionChildrenSecond
