import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { changeData, removeData } from '../app/reducer'
import { PrimaryButton } from './buttons'
import { useState } from 'react'

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
          changeData([...data.filter((task: Item) => task.completed)])
        )
      }
  
      function showIncompletedTasks(id: string) {
        setActiveTab(id)
        dispatch(
          changeData([...data.filter((task: Item) => !task.completed)])
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