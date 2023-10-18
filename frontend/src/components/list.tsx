import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import { DeleteTask, CompleteTask } from './api'
import { DeleteButton, FooterButton } from './buttons'
import TextInput from './textInput'
import Counter from './counter'
import Checkbox from './checkbox'

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

export default function List({list}: List) {

    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: DeleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
            // Api nevrací task při DELETE, tak je nutono invalidovat queries a počkat na nový fetch
        }
    })
    
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

    function deleteTask (id: string) {
        deleteMutation.mutate(id)
    }

    function deleteAllCompleted() {
        const itemsToDelete = list.filter(item => item.completed)
        itemsToDelete.map(item => {
            deleteMutation.mutate(item.id)
        })
    }

    function setAllDone() {
        const undone = list.filter(task => !task.completed)
        undone.map(task => {
          completeMutation.mutate(task.id)
        })
      }

    return (
        <ListSection>
            <StyledList>
                {list?.map((item) => (
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
                    count={list?.filter(task => task.completed).length}
                    text="Počet splněných úkolů:"
                />
            </StyledList>
            <StyledFooter>
                <FooterButton
                    text="Vše" 
                    onClick={() => setAllDone()}
                />
                <FooterButton
                    text="Odstranit vše splněné" 
                    onClick={() => deleteAllCompleted()}
                />
            </StyledFooter>
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

const InputPart = styled.div`
    display: flex;
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