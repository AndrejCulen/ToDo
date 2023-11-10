import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterData, removeData } from '../app/reducer'
import styled from 'styled-components'
import { PrimaryButton } from './buttons'

interface Item {
    id: string,
    text: string,
    completed: boolean,
    createdDate: number,
    completedDate?: number
}

export default function FilteringTodos({data}: any) {

    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState<string>('all')

    function showAllTasks(id: string) {
        setActiveTab(id)
        dispatch(
          removeData()
        )
      }
      
      function showCompletedTasks(id: string) {
        setActiveTab(id)
        dispatch(
          filterData([...data.filter((task: Item) => task.completed)])
        )
      }
  
      function showIncompletedTasks(id: string) {
        setActiveTab(id)
        dispatch(
          filterData([...data.filter((task: Item) => !task.completed)])
        )
      }

    return (
        <StyledFilters>
            <PrimaryButton
                text="Všechny"
                id="all"
                active={activeTab}
                onClick={() => showAllTasks('all')}
            />
            <PrimaryButton
                text="Nesplněné"
                id="undone"
                active={activeTab}
                onClick={() => showIncompletedTasks('undone')}
            />
            <PrimaryButton
                text="Splněné"
                id="done"
                active={activeTab}
                onClick={() => showCompletedTasks('done')}
            />
        </StyledFilters>
    )
}

const StyledFilters = styled.section`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 12px;
`