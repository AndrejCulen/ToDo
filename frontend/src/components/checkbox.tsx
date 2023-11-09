import styled from 'styled-components'
import DoneIcon from '../images/done.svg?react'

interface Checkbox {
    checked: boolean
    id: string
    onClick: (id: string, checked: boolean) => void
}

interface Item {
    id: string,
    text: string,
    completed: boolean,
    createdDate: number,
    completedDate: number
}


export default function Checkbox({checked, id, onClick}: Checkbox) {
    return (
        <div onClick={() => onClick(id, checked)}>
            <label>
                <Input
                    type='checkbox'
                    checked={checked}
                    readOnly
                />
            </label>
            <Checbox checked={checked}>
                <StyledDoneIcon checked={checked}>
                    <DoneIcon
                        width={20}
                        height={20}
                    />
                </StyledDoneIcon>
            </Checbox>
        </div>
    )
}

const Input = styled.input`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const StyledDoneIcon = styled.div<{checked?: boolean}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    display: ${props => props.checked ? 'flex' : 'none'};
`

const Checbox = styled.div<{checked?: boolean}>`
    position: relative;
    border: 1px solid ${props => props.checked ? props.theme.completed : props.theme.borderBackground};
    border-radius: 100%;
    width: 20px;
    height: 20px;
    transition: all 350ms;
    margin-right: 24px;

    &:hover {
        cursor: pointer;
    }
`