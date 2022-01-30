import styled from 'styled-components'

export const WrapperCondinates = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`

export const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.marginTop};
`

export const LabelInput = styled.label`
  flex: 50%;
  display: ${(props) => props.display};
`

export const Input = styled.input`
  outline: none;
  flex: 50%;
`

export const WrapperSetting = styled.div`
  position: absolute;
  z-index: 1000;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`

export const ContainerChange = styled.div`
  margin-top: 1rem;
`

export const WrapperChange = styled.div`
  display: flex;
  padding: 0 2rem;
  justify-content: space-between;
  margin-top: 1rem;
  align-items: center;
`
