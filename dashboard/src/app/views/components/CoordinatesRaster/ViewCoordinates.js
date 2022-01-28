import React from 'react'
import {WrapperView, ElementUl, ElementLi, ElementButton} from './element.js'

const ViewCoordinates = ({onClose, dataFromForm}) => {
  return (
    <WrapperView>
      <ElementUl>
        <ElementLi>latNE: {dataFromForm.latNE}</ElementLi>
        <ElementLi>lngNE: {dataFromForm.lngNE}</ElementLi>
        <br />
        <ElementLi>latSW: {dataFromForm.latSW}</ElementLi>
        <ElementLi mgBottom='10px'>lngSW: {dataFromForm.lngSW}</ElementLi>
      </ElementUl>
      <ElementButton onClick={onClose}>Xác nhận</ElementButton>
    </WrapperView>
  )
}

export default ViewCoordinates
