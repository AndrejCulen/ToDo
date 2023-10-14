import {useState} from 'react'
import styled from 'styled-components'

interface Input {
    text: string
}

export default function TextInput({text}: Input) {

    const [value, setValue] = useState(text)

    return (
        <div>
            <form>
                <TexField type="text" onChange={(e) => setValue(e.target?.value)} value={value} />
            </form>
        </div>
    )
}


const TexField = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    borderRadius: 0;
    outline: 0;
    :focus, :focus-visible, *:focus  {
        outline: none;
        border: none;
    }
`