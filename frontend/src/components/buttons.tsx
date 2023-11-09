import styled from 'styled-components'
import DeleteIcon from '../images/delete.svg?react'

interface Button {
    text: string,
    active: string,
    id: string,
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export function PrimaryButton({text, id, active, onClick}: Button) {
    return (
        <SimpleButton
            onClick={onClick}
            $active={active}
            $id={id}
        >
            {text}
        </SimpleButton>
    )
}

const SimpleButton = styled.div<{$active?: string, $id?: string}>`
    border-bottom: 3px solid ${props => props.$id === props.$active ? '#03bda6' :  'transparent'};
    
    &:hover {
        border-bottom: 3px solid #03bda6;
        cursor: pointer;
    }
`

interface IconButton {
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export function DeleteButton({onClick}:  IconButton) {
    return (
        <IconContainer onClick={onClick}>
            <DeleteIcon
                width={20}
                height={20}
            />
        </IconContainer>
    )
}

const IconContainer = styled.div`
    display: flex;
    align-items: center;

    :hover {
        fill: red;
        cursor: pointer;
    }
`

interface FooterButton {
    text: string
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export function FooterButton({text, onClick}: FooterButton) {

    return (
        <StyledFooterButton onClick={onClick}>
            {text}
        </StyledFooterButton>
    )
}

const StyledFooterButton = styled.div`
    padding: 8px 12px;
    border: 1px solid #e6e6e6;
    border-radius: 10px;

    &:hover {
        color: black;
        border: 1px solid black;
        cursor: pointer;
    }
`