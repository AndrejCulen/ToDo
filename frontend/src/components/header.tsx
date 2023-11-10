import styled from 'styled-components'
import TodoIcon from '../images/todo.svg?react'

export default function Header() {
    return (
        <StyledHeader>
            <TodoIcon
                width={30}
                height={30}
            />
            <H1>Todo list</H1>
        </StyledHeader>
    )
}

const StyledHeader = styled.header`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid ${props => props.theme.borderBackground};
  border-bottom: 0;
  padding: 24px 32px;
  border-radius: 10px 10px 0 0;
  color: black;
  background: ${props => props.theme.headerBackground};
`

const H1 = styled.h1`
  margin: 0 0 0 12px;
  font-size: 28px;
  text-transform: uppercase;
`