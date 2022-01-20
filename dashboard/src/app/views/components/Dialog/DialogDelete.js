import React, {useState} from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import tableDataAPI from 'app/api/tableData'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'

import convertData from 'app/common/covertData'

const DialogDelete = ({isActive, infoItem, setIsActive}) => {
  const dispatch = useDispatch()

  const dialogCancel = () => {
    setIsActive(false)
  }

  const dialogAgree = () => {
    const {name, id} = infoItem
    handleApiDelete(name, id)
  }

  const handleApiDelete = (name, id) => {
    tableDataAPI.delete(name, id).then((res) => {
      console.log(res)
      if (res[0]['status'] === 400) {
        toast.error(
          'Xóa thất bại, vui lòng kiểm tra các thành phần phụ thuộc',
          {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
        setIsActive(false)
      }
      if (res[0]['code'] === 200) {
        console.log('Xóa dữ liệu thành công')
        toast.success('Xóa thành công', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        // re-load table
        convertData(infoItem['name'], null, dispatch)
        // off dialog
        setIsActive(false)
      }
    })
  }

  return (
    <div>
      <Dialog
        open={isActive}
        onClose={dialogCancel}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle id='draggable-dialog-title'>Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn xóa?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={dialogCancel}>
            Cancel
          </Button>
          <Button onClick={dialogAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogDelete
