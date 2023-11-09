import {useState, useRef, useEffect} from 'react'
import styled from 'styled-components'

interface Input {
    text: string
    id: string
    checked: boolean
    editing: boolean
    onSubmit: (event: React.FocusEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>, id: string, value: string) => void
}

export default function TextInput({text, id, checked, onSubmit, editing}: Input) {
    const inputRef = useRef<HTMLInputElement>(null)

    const [value, setValue] = useState<string>(text)

    useEffect(() => {
        inputRef.current?.focus()
    }, [editing])

    return (
        <form onSubmit={(e) => onSubmit(e, id, value)}>
            {editing ?
                <TexField 
                    ref={inputRef}
                    type="text"
                    value={value} 
                    onChange={(e) => setValue(e.target?.value)}
                    onBlur={(e) => onSubmit(e, id, value)}
                /> :
                <TextPlaceholder checked={checked}>{value}</TextPlaceholder>
            }
        </form>
    )
}

const TexField = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-radius: 0;
    font-size: 20px;
    line-height: 24px;
    padding: 0;
    outline: 0;
    color: black;
    :focus, :focus-visible, *:focus  {
        outline: none;
        border: none;
    }
`

const TextPlaceholder = styled.span<{checked?: boolean}>`
    display: inline-block;  
    font-size: 20px;
    line-height: 24px;
    color: ${props => props.checked ? props.theme.borderBackground : 'black'};
    text-decoration: ${props => props.checked ? 'underline' : 'none'};
    text-underline-offset: -40%;
    text-decoration-skip-ink: none;
`