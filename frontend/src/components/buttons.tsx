import styled from 'styled-components'

interface Button {
    text: string
    active: boolean
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export function PrimaryButton({text, active, onClick}: Button) {
    return (
        <SimpleButton
            onClick={onClick}
            active={active}
        >
            {text}
        </SimpleButton>
    )
}

const SimpleButton = styled.div<{active?: boolean}>`
    border-bottom: 3px solid ${props => props.active ? '#03bda6' :  'transparent'};
    
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
            <DeleteIcon width="800px" height="800px" viewBox="0 0 1024 1024" fill="#000000" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill="" />
                <path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill="" />
            </DeleteIcon>
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

const DeleteIcon = styled.svg`
    width: 20px;
    height: 100%;
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