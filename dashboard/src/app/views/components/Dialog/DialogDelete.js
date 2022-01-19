import React, {useState} from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import tableDataAPI from 'app/api/tableData'

const DialogDelete = ({isActive, infoItem, setIsActive, setFalseDelete}) => {
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
        console.log('Xóa dữ liệu thất bại')
        setFalseDelete(false)
      }
      if (res[0]['code'] === 200) {
        console.log('Xóa dữ liệu thành công')
        setFalseDelete(true)
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
