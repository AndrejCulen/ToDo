import styled from 'styled-components'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask, completeTask } from '../api'
import { FooterButton } from './buttons'

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

export default function Footer({list}: List) {
    
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onMutate: async (id: string) => {

            await queryClient.cancelQueries({ queryKey: ['todos'] })

            const previousTodos = queryClient.getQueryData(['todos'])

            queryClient.setQueryData(['todos'], (old: any) => old.filter((todo: Item) => todo.id !== id))

            return { previousTodos }
        },
        onError: (err, context: any) => {
            queryClient.setQueryData(['todos'],  (old: any) => old.filter((todo: Item) => todo.id !== context?.previousTodos.id))
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
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

    function setAllDone() {
        const undone = list.filter(task => !task.completed)
        undone.map(task => {
          completeMutation.mutate(task.id)
        })
      }

    function deleteAllCompleted() {
        const itemsToDelete = list.filter(item => item.completed)
        itemsToDelete.map(item => {
            deleteMutation.mutate(item.id)
        })
    }
    
    return (
        <StyledFooter>
            <StyledFooterInner>
                <FooterButton
                    text="Vše splněno" 
                    onClick={() => setAllDone()}
                />
                <FooterButton
                    text="Odstranit vše splněné" 
                    onClick={() => deleteAllCompleted()}
                />
            </StyledFooterInner>
        </StyledFooter>
    )
}
const StyledFooter = styled.footer`
    display: flex;
    flex-flow: column;
    align-items: center;
`
const StyledFooterInner = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: space-between;
`