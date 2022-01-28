import styled from 'styled-components'

export const WrapperView = styled.div`
  position: absolute;
  z-index: 1000;
  right: 0;
  padding: 40px;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const ElementUl = styled.ul`
  padding-left: 20px;
`
export const ElementLi = styled.li`
  margin-bottom: ${(props) => props.mgBottom};
`
export const ElementButton = styled.button`
  outline: none;
  border: none;
  padding: 0.5rem 1rem;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  z-index: 1000;
  margin-left: ${(props) => props.marginLeft};
  transform: translateY(${(props) => props.transformY});
`
