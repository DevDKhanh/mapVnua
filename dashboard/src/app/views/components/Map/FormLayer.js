import React from 'react'
import {ButtonElement} from '../newCreateForm/element.js'
import {WrapperCondinates, Input, WrapperInput, LabelInput} from './element'

const FormLayerCoordinates = ({
  coordinatesTop,
  handleChangelatSW,
  handleChangeLngSW,
  coordinatesBottom,
  handleChangeLatNE,
  handleChangeLngNE,
  handleClickOke,
}) => {
  console.log(coordinatesTop)
  return (
    <WrapperCondinates>
      <WrapperInput>
        <LabelInput htmlFor='latSW'>Tọa độ latSW:</LabelInput>
        <Input
          id='latSW'
          type='number'
          value={coordinatesTop['latSW'] || ''}
          onChange={handleChangelatSW}
          placeholder='Tọa độ latSW'
        />
      </WrapperInput>
      <WrapperInput marginTop='10px'>
        <LabelInput htmlFor='lngSW'>Tọa độ lngSW:</LabelInput>
        <Input
          id='lngSW'
          type='number'
          value={coordinatesTop['lngSW'] || ''}
          onChange={handleChangeLngSW}
          placeholder='Tọa độ lngSW'
        />
      </WrapperInput>
      <WrapperInput marginTop='10px'>
        <LabelInput htmlFor='latNE'>Tọa độ latNE:</LabelInput>
        <Input
          id='latNE'
          type='number'
          value={coordinatesBottom['latNE'] || ''}
          onChange={handleChangeLatNE}
          placeholder='Tọa độ latNE'
        />
      </WrapperInput>
      <WrapperInput marginTop='10px'>
        <LabelInput htmlFor='lngNE'>Tọa độ lngNE:</LabelInput>
        <Input
          id='lngNE'
          type='number'
          value={coordinatesBottom['lngNE'] || ''}
          onChange={handleChangeLngNE}
          placeholder='Tọa độ lngNE'
        />
      </WrapperInput>
      <ButtonElement onClick={handleClickOke}>oke</ButtonElement>
    </WrapperCondinates>
  )
}

export default FormLayerCoordinates
