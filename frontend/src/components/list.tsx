import TextInput from './textInput'
import { useState } from 'react'
import styled from 'styled-components'
import Counter from './counter'
import { DeleteTask, CompleteTask, IncompleteTask } from './api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Checkbox from './checkbox'
import { DeleteButton, FooterButton } from './buttons'

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
    const [checked, setChecked] = useState()

    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: DeleteTask,
        onSuccess: data => {
            queryClient.setQueryData(['todos'],
                (prevData: List[] | undefined) => {
                    console.log(data)
                    return prevData?.filter(task => task.id !== data.id)
                }
            )
        }
    })
    
    const completeMutation = useMutation({
        mutationFn: CompleteTask,
        onSuccess: data => {
          queryClient.setQueryData(['todos'],
            (prevData) => {
              const i = prevData.findIndex(x => x.id === data.id )
              prevData[i] = data
              return prevData
            }
          )
        }
    })

    function deleteTask(id: string) {
        deleteMutation.mutate(id)
    }

    function deleteAllCompleted() {
        const itemsToDelete = list.items.filter(item => item.completed)
        itemsToDelete.map(item => {
            deleteMutation.mutate(item.id)
        })
    }

    function setAllDone() {
        const undone = list.items.filter(task => !task.completed)
        undone.map(task => {
          completeMutation.mutate(task.id)
        })
      }

    return (
        <ListSection>
            <StyledList>
                {list.items?.map((item) => (
                    <ListItem key={item.id}>
                        <InputPart>
                            <Checkbox
                                id={item.id}
                                checked={item.completed}
                            />
                            <TextInput text={item.text} id={item.id} checked={item.completed} />
                        </InputPart>
                        <DeleteButton
                            onClick={() => deleteTask(item.id)}
                        />
                    </ListItem>
                ))}
                <Counter
                    count={list.items?.filter(task => task.completed).length}
                    text="Počet hotových úkolů:"
                />
            </StyledList>
            <StyledFooter>
                <FooterButton
                    text="Vše hotovo" 
                    onClick={() => setAllDone()}
                />
                <FooterButton
                    text="Odstranit vše hotové" 
                    onClick={() => deleteAllCompleted()}
                />
            </StyledFooter>
        </ListSection>

    )
}

const InputPart = styled.div`
    display: flex;
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

const ListSection = styled.section`
    display: flex;
    flex-flow: column;
    align-items: center;
`
const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    margin-bottom: 24px;
    background: white;
    list-style-type: none;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    
    &:last-child {
        margin-bottom: 0;
    }
    @media (max-width: 600px) {
        padding: 12px 12px;
    }
`

const StyledFooter = styled.footer`
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: space-between;
`