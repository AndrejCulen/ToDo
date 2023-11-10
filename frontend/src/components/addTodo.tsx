import { useState } from 'react'
import {
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
                <StyledAddICon
                    width={20}
                    height={20}
                />
            </SubmitButton>
        </StyledForm>
    )
}

const StyledForm = styled.form`
  position: relative;
  max-width: 100%;
`

const StyledInput = styled.input`
  box-sizing: border-box;
  max-width: 100%;
  padding: 12px 20px;
  border: 1px solid ${props => props.theme.borderBackground};
  border-radius: 15px;
  font-size: 24px;
  line-height: 24px;
  background: ${props => props.theme.lightBackground ? props.theme.lightBackground : 'none'};
  color: ${props => props.theme.textColor};
  
  :focus {
    border: 1px solid ${props => props.theme.focusInput};
  }
`

const SubmitButton = styled.button`
  box-sizing: content-box;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
  background: transparent;
  border: 1px solid ${props => props.theme.borderBackground};
  width: 20px;
  height: 20px;
  padding: 4px;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  transition: border-color 0.25s;

  &:hover {
    transform: scale(1.03) translate(0, -50%);
    transition: transform .15s;
    border: 1px solid ${props => props.theme.textColor};
  }
`

const StyledAddICon = styled(AddIcon)`
  fill: ${props => props.theme.textColor};
`