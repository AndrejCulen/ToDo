import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import { CompleteTask, IncompleteTask } from './api'

interface Checkbox {
    checked: boolean
    id: string
}

interface Item {
    id: string,
    text: string,
    completed: boolean,
    createdDate: number,
    completedDate: number
}


export default function Checkbox({checked, id}: Checkbox) {

    const queryClient = useQueryClient()

    const completeMutation = useMutation({
        mutationFn: CompleteTask,
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
        mutationFn: IncompleteTask,
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

    function checkboxAction(id: string) {
        checked ? incompleteMutation.mutate(id) : completeMutation.mutate(id)
    }

    return (
        <div onClick={() => checkboxAction(id)}>
            <label>
                <Input
                    type='checkbox'
                    checked={checked}
                    readOnly
                    onClick={() => checkboxAction(id)}
                />
            </label>
            <Checbox checked={checked}>
                <SVG checked={checked} width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6" stroke="#07eb31" strokeLinecap="round"/>
                </SVG>
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

const SVG = styled.svg<{checked?: boolean}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    display: ${props => props.checked ? 'block' : 'none'};
`

const Checbox = styled.div<{checked?: boolean}>`
    position: relative;
    border: 1px solid ${props => props.checked ? '#07eb31' : 'lightGrey'};
    border-radius: 100%;
    width: 20px;
    height: 20px;
    transition: all 350ms;
    margin-right: 24px;

    &:hover {
        cursor: pointer;
    }
`