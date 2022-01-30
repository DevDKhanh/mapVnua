import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Checkbox, Divider} from 'antd'

//Thư mục
import './account.css'
import {ElementButton} from '../element.js'

const CheckboxGroup = Checkbox.Group
const plainOptions = ['Cho phép thêm', 'Cho phép sửa', 'Cho phép xóa']
const defaultCheckedList = null

function AccountForm({dataProps}) {
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList)
  const [indeterminate, setIndeterminate] = React.useState(true)
  const [checkAll, setCheckAll] = React.useState(false)

  console.log({checkedList, indeterminate, checkAll})

  const onChange = (list) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  // BEM
  return (
    <div className='account'>
      <h2 className='account__title'>Tạo mới</h2>

      <div className='account__container'>
        <div className='account_wrapperInput'>
          <label htmlFor='1' className='account__label'>
            Tài khoản:
          </label>
          <input
            id='1'
            className='account__input'
            placeholder='Nhập tài khoản '
          />
        </div>

        <div className='account_wrapperInput'>
          <label htmlFor='1' className='account__label'>
            Mật khẩu:
          </label>
          <input
            id='1'
            className='account__input '
            placeholder='Nhập mật khẩu'
          />
        </div>

        <div className='account_wrapperInput'>
          <label htmlFor='1' className='account__label'>
            Tên người dùng:
          </label>
          <input
            id='1'
            className='account__input'
            placeholder='Nhập tên người dùng '
          />
        </div>

        <div className='account__wrapperCheckBox'>
          <label htmlFor='1' className='account__label'>
            Phân quyền:
          </label>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
            className='account__checkbox'
          >
            Chọn tất cả
          </Checkbox>

          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
            className='account__checkboxGroup'
          />
        </div>
        <ElementButton mgTop='30px' className='account__button'>
          Tạo mới
        </ElementButton>
      </div>
    </div>
  )
}

export default AccountForm
