import styled from 'styled-components'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask, completeTask, incompleteTask, updateTask } from '../api'
import { DeleteButton } from './buttons'
import Checkbox from './checkbox'
import TextInput from './textInput'
import { useDispatch, useSelector } from 'react-redux'
import { startEditing, endEditing } from '../app/editing'
import type { RootState } from '../app/store'
import { useState } from 'react'


interface Item {
    id: string,
    text: string,
    completed: boolean
    createdDate: number,
    completedDate?: number
}

interface Todo {
    todo: Item
}

export default function SingleTodo({todo}: Todo) {
    
    const queryClient = useQueryClient()
    
    const [editing, setEditing] = useState<boolean>(false)

    const mutation = useMutation({
        mutationFn: updateTask
    })

    const completeMutation = useMutation({
        mutationFn: completeTask,
        onSuccess: data => {
            queryClient.setQueryData(['todos'],
                (prevData: Item[] | undefined) => {
                    return prevData?.map((item) => {
                        if (item.id !== data.id) {
                            return item
                        }

                        return {
                            ...item,
                            completed: data.completed,
                            completedDate: data.completedDate
                        }
                    })
                }
            )
          }
    })

    const incompleteMutation = useMutation({
        mutationFn: incompleteTask,
        onSuccess: data => {
            queryClient.setQueryData(['todos'],
                (prevData: Item[] | undefined) => {
                    return prevData?.map((item) => {
                        if (item.id !== data.id) {
                            return item
                        }

                        return {
                            ...item,
                            completed: data.completed,
                            completedDate: data.completedDate
                        }
                    })
                }
          )
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onMutate: async (id: string) => {

            await queryClient.cancelQueries({ queryKey: ['todos'] })

            const previousTodos = queryClient.getQueryData(['todos'])

            queryClient.setQueryData(['todos'], (old: any) => old.filter((todo: Item) => todo.id !== id))

            return { previousTodos }
        },
        onError: (context: any) => {
            queryClient.setQueryData(['todos'],  (old: any) => old.filter((todo: Item) => todo.id !== context?.previousTodos.id))
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    function checkboxAction(id: string, checked: boolean) {
        checked ? incompleteMutation.mutate(id) : completeMutation.mutate(id)
    }

    function changeName(event: React.FocusEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>, id: string, value: string) {
        event.preventDefault()
        mutation.mutate({id: id, text: value})
        setEditing(false)
      }

    function deleteTodoTask (id: string) {
        deleteMutation.mutate(id)
    }

    return (
        <ListItem>
            <InputPart>
                <Checkbox
                    id={todo.id}
                    checked={todo.completed}
                    onClick={checkboxAction}
                />
                <div onDoubleClick={() => setEditing(true)}>
                    <TextInput
                        text={todo.text}
                        id={todo.id}
                        checked={todo.completed}
                        editing={editing}
                        onSubmit={changeName}
                    />
                </div>
            </InputPart>
            <DeleteButton
                onClick={() => deleteTodoTask(todo.id)}
            />
        </ListItem>
    )
}

const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    margin-bottom: 24px;
    background: white;
    list-style-type: none;
    border: 1px solid ${props => props.theme.borderBackground};
    border-radius: 10px;
    
    &:last-child {
        margin-bottom: 0;
    }
    @media (max-width: 600px) {
        padding: 12px 12px;
    }
`

const InputPart = styled.div`
    display: flex;
    align-items: center;
`
