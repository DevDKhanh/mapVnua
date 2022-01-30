import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import axios from 'axios'

// Thư mục
import styles from './MenuSection.module.scss'
import getTableList from 'app/common/covertData'
import {keysLocal} from 'app/localStorage/keys'
import {getItem} from 'app/localStorage/localStorage'
import {reqDisplay} from 'app/redux/action/action.componentDisplay'

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

  ${({clickitem}) =>
    clickitem === 'true' &&
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

  return (
    <div className={styles.wrapper_children_second}>
      {children.map((item, index) => (
        <LinkElement
          to={`${dataParam[index]}`}
          key={index}
          clickitem={indexFocus === index ? 'true' : ''}
        >
          {item}
        </LinkElement>
      ))}
    </div>
  )
}

export default MenuSectionChildrenSecond
