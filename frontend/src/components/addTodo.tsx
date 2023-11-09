import { useState } from 'react'
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { createTask } from '../api'
import styled from 'styled-components'
import AddIcon from '../images/add.svg?react'

interface Item {
    id: string,
    text: string,
    completed: boolean,
    createdDate: number,
    completedDate?: number
}

export default function AddTodo() {

    const queryClient = useQueryClient()

    const [text, setText] = useState<string>('')

    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: data => {
          queryClient.setQueryData(['todos'],
            (prevData: Item[] | undefined) => [data, ...(prevData || [])])
          setText('')
        }
      })

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        mutation.mutate(text)
    }

    return (
        <StyledForm onSubmit={(e) => handleSubmit(e)}>
            <StyledInput
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Zadejte úkol'
            />
            <SubmitButton type="submit">
                <AddIcon
                    width={15}
                    height={15}
                />
            </SubmitButton>
        </StyledForm>
    )
}

const StyledForm = styled.form`
  position: relative;
`

const StyledInput = styled.input`
  padding: 12px 20px;
  border: 1px solid ${props => props.theme.borderBackground};
  border-radius: 15px;
  font-size: 24px;
  line-height: 24px;
  
  :focus {
    border: 1px solid ${props => props.theme.focusInput};
  }
`

const SubmitButton = styled.button`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
  background: transparent;
  border: 1px solid ${props => props.theme.borderBackground};
  box-sizing: content-box;
  width: 20px;
  height: 20px;
  padding: 4px;
  cursor: pointer;
  &:hover {
    border: 1px solid black;
  }
`