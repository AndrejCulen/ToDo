import styled from 'styled-components'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask, completeTask } from '../api'
import { DeleteButton } from './buttons'
import TextInput from './textInput'
import Counter from './counter'
import Checkbox from './checkbox'
import SingleTodo from './singleTodo'

interface Item {
    id: string,
    text: string,
    completed: boolean
    createdDate: number,
    completedDate?: number
}

interface List {
    list: Item[]
}

export default function TodoList({list}: List) {
    console.log(list)
    return (
        <ListSection>
            <StyledList>
                {list?.map((item) => (
                    <SingleTodo
                        todo={item}
                        key={item.id}
                    />
                ))}
                <Counter
                    count={list?.filter(task => task.completed).length}
                    text="Počet splněných úkolů:"
                />
            </StyledList>
        </ListSection>

    )
}

const ListSection = styled.section`
    display: flex;
    flex-flow: column;
    align-items: center;
`
const StyledList = styled.ul`
    box-sizing: border-box;
    background: #e6e6e6;
    max-width: 400px;
    width: 100%;
    padding: 24px;
    border-radius: 10px;
`