import {useState, useRef, useEffect} from 'react'
import styled from 'styled-components'
import {useMutation} from '@tanstack/react-query'
import {UpdateTask} from './api'

interface Input {
    text: string
    id: string
    checked: boolean
}

export default function TextInput({text, id, checked}: Input) {
    const inputRef = useRef<HTMLInputElement>(null)

    const [editing, setEditing] = useState<boolean>(false)
    const [value, setValue] = useState<string>(text)

    useEffect(() => {
        inputRef.current?.focus()
    }, [editing])

    const mutation = useMutation({
        mutationFn: UpdateTask
    })

    function handleBlur(id: string) {
        mutation.mutate({id: id, text: value})
        setEditing(false)
    }

    return (
        <div onDoubleClick={() => setEditing(true)}>
            <form>
                {editing ?
                    <TexField 
                        ref={inputRef}
                        type="text"
                        value={value} 
                        onChange={(e) => setValue(e.target?.value)}
                        onBlur={() => handleBlur(id)}
                    /> :
                    <TextPlaceholder checked={checked}>{value}</TextPlaceholder>
                }
            </form>
        </div>
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
    color: #213547;
    :focus, :focus-visible, *:focus  {
        outline: none;
        border: none;
    }
`

const TextPlaceholder = styled.span<{checked?: boolean}>`
    display: inline-block;  
    font-size: 20px;
    line-height: 24px;
    color: ${props => props.checked ? '#e4e4e4' : '#213547'};
    text-decoration: ${props => props.checked ? 'underline' : 'none'};
    text-underline-offset: -40%;
    text-decoration-skip-ink: none;
`