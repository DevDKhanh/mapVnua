import React from 'react'
import {ButtonElement} from '../newCreateForm/element.js'
import {WrapperCondinates, Input, WrapperInput, LabelInput} from './element'

const FormCoordinatesDefault = ({
  coordinates,
  handleChangeLat,
  handleChangeLng,
  handleClickOke,
}) => {
  return (
    <WrapperCondinates>
      <WrapperInput>
        <LabelInput htmlFor='lat'>Tọa độ lat:</LabelInput>
        <Input
          id='lat'
          type='number'
          value={coordinates['lat']}
          onChange={handleChangeLat}
          placeholder='Tọa độ lat'
        />
      </WrapperInput>
      <WrapperInput marginTop='10px'>
        <LabelInput htmlFor='lng'>Tọa độ lng:</LabelInput>
        <Input
          id='lng'
          type='number'
          value={coordinates['lng']}
          onChange={handleChangeLng}
          placeholder='Tọa độ lng'
        />
      </WrapperInput>
      <ButtonElement onClick={handleClickOke}>oke</ButtonElement>
    </WrapperCondinates>
  )
}

export default FormCoordinatesDefault
