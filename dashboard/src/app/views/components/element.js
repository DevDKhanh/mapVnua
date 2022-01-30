import styled from 'styled-components'

export const ElementButton = styled.button`
  border: none;
  padding: 10px 30px;
  border-radius: 30px;
  background-color: #2a3f54;
  color: #fff;
  margin-top: ${(props) => props.mgTop};
  margin-bottom: ${(props) => props.mgBottom};
`
