import {useState, useRef, useEffect} from 'react'
import styled from 'styled-components'
import {useMutation} from '@tanstack/react-query'
import {UpdateTask} from './api'

interface Input {
    text: string
    id: string
}

export default function TextInput({text, id}: Input) {
    const inputRef = useRef<HTMLInputElement>(null)

    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(text)

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
                    <span>{value}</span>
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
    outline: 0;
    :focus, :focus-visible, *:focus  {
        outline: none;
        border: none;
    }
`