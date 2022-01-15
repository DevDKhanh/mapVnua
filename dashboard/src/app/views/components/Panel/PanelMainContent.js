import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import PanelHeadTable from './PanelHeadTable'

// Thư mục
import styles from './PanelMainContent.module.scss'
import dataHead from 'app/constants/dataHead'

function PanelMainContent({nameHead, dataTable}) {
  console.log(dataTable) //dữ liệu

  return (
    <div className={styles.wrapper_panel_content}>
      <button>
        <Link to={`/home/new_create/${nameHead}`}>Tạo mới</Link>
      </button>
      <div className={styles.wrapper_panel}>
        <table>
          <PanelHeadTable dataHead={dataHead[nameHead]} />
          <tbody>
            {dataTable.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                {Object.values(item).map((itemValue, index) => (
                  <React.Fragment key={index}>
                    (<td>{itemValue}</td>
                  </React.Fragment>
                ))}
                <td>
                  <Link to={`/home/see_detail/${nameHead}`}>
                    <i className='far fa-eye'></i>
                  </Link>
                  <Link to={`/home/edit/${nameHead}`}>
                    <i className='far fa-edit'></i>
                  </Link>
                  <Link to='/'>
                    <i className='far fa-trash-alt'></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PanelMainContent
