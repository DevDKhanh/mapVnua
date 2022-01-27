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

  button {
    margin: 0;
    border-radius: 100%;
    margin-top: 1rem;
  }
`

export const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.marginTop};
`

export const LabelInput = styled.label`
  flex: 50%;
`

export const Input = styled.input`
  outline: none;
  flex: 50%;
`
