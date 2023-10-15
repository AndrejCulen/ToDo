import TextInput from './textInput'
import { useState } from 'react'
import styled from 'styled-components'
import Counter from './counter'
import { DeleteTask, CompleteTask, IncompleteTask } from './api'
import { useMutation } from '@tanstack/react-query'

interface List {
    items: [
        item: {
            id: string,
            text: string,
            completed: boolean
        }
    ]
}

export default function List(list: List) {
    console.log(list)
    const [checked, setChecked] = useState([])

    const deleteNutation = useMutation({
        mutationFn: DeleteTask
    })

    const completeMutation = useMutation({
        mutationFn: CompleteTask
    })

    const incompleteMutation = useMutation({
        mutationFn: IncompleteTask
    })

    function deleteTask(id: string) {
        deleteNutation.mutate(id)
    }
    
    function checkboxAction(id: string) {
        if (checked) {
            incompleteMutation.mutate(id)

        } else {
            completeMutation.mutate(id)
        }

    }

    return (
        <div>
            <input type="checkbox" />
            <ul>
                {list.items?.map((item) => (
                    <ListItem key={item.id}>
                        <CheckBoxInput 
                            type="checkbox"
                            onClick={() => checkboxAction(item.id)}
                            checked={item.completed}
                        />
                        <TextInput text={item.text} id={item.id} />
                        <button onClick={() => deleteTask(item.id)}>delete</button>
                    </ListItem>
                ))}
            </ul>
            <Counter
                count={2}
                text="ukolu k dokonceni"
            />
        </div>

    )
} 
const CheckBoxInput = styled.input`

`
const ListItem = styled.li`
    display: flex;
    align-items: flex-end;
    list-style-type: none;
`