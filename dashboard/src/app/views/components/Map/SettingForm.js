import React from 'react'
import {PElement} from '../newCreateForm/element.js'
import {
  LabelInput,
  Input,
  ContainerChange,
  WrapperSetting,
  WrapperChange,
  ButtonChange,
} from './element.js'

const SettingForm = () => {
  let [valueChangeWidth, setValueChangeWidth] = React.useState(1)
  let [valueChangeHeight, setValueChangeHeight] = React.useState(1)

  return (
    <WrapperSetting>
      <LabelInput display='block' htmlFor='step'>
        Step
      </LabelInput>
      <Input value={1} id='step' />

      <ContainerChange>
        <PElement>Tăng giảm chiều rộng ảnh</PElement>
        <WrapperChange>
          <ButtonChange onClick={() => setValueChangeWidth(++valueChangeWidth)}>
            +
          </ButtonChange>
          <PElement>{valueChangeWidth}</PElement>
          <ButtonChange onClick={() => setValueChangeWidth(--valueChangeWidth)}>
            -
          </ButtonChange>
        </WrapperChange>
      </ContainerChange>
      <ContainerChange>
        <PElement>Tăng giảm chiều cao ảnh</PElement>
        <WrapperChange>
          <ButtonChange
            onClick={() => setValueChangeHeight(++valueChangeHeight)}
          >
            +
          </ButtonChange>
          <PElement>{valueChangeHeight}</PElement>
          <ButtonChange
            onClick={() => setValueChangeHeight(--valueChangeHeight)}
          >
            -
          </ButtonChange>
        </WrapperChange>
      </ContainerChange>
    </WrapperSetting>
  )
}

export default SettingForm
