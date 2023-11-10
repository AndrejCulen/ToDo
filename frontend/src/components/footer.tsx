import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { RootState } from '../app/store'
import { activeTabAll } from '../app/activeTab'
import { removeData } from '../app/selectedData'
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

    const dispatch = useDispatch()

    const { activeTab }  = useSelector((state: RootState) => state.activeTab)

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
        if (activeTab !== 'all') {
            dispatch(activeTabAll())
            dispatch(removeData())
        }
        const undone = list.filter(task => !task.completed)
        undone.map(task => {
          completeMutation.mutate(task.id)
        })
      }

    function deleteAllCompleted() {
        if (activeTab !== 'all') {
            dispatch(activeTabAll())
            dispatch(removeData())
        }
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
    margin-bottom: 16px;
`
const StyledFooterInner = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media(max-width: 340px) {
        justify-content: center;
    }
`