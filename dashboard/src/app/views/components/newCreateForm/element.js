import styled from 'styled-components'

// ======= styled

// p element
export const PElement = styled.p`
  color: ${(props) => props.color};
`

export const ButtonElement = styled.button`
  background-color: #2a3f54;
  text-transform: uppercase;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  border: none;
  padding: 20px;
  border-radius: 45px;

  &:focus {
    outline: none;
  }
`
