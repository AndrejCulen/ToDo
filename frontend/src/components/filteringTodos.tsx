import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { activeTabAll, activeTabDone, activeTabUndone } from '../app/activeTab'
import { filterData, removeData } from '../app/selectedData'
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

    const { activeTab } = useSelector((state: RootState) => state.activeTab)

    function showAllTasks() {
        dispatch(activeTabAll())
        dispatch(removeData())
      }
      
      function showCompletedTasks() {
        dispatch(activeTabDone())
        dispatch(
          filterData([...data.filter((task: Item) => task.completed)])
        )
      }
  
      function showIncompletedTasks() {
        dispatch(activeTabUndone())
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
                onClick={() => showAllTasks()}
            />
            <PrimaryButton
                text="Nesplněné"
                id="undone"
                active={activeTab}
                onClick={() => showIncompletedTasks()}
            />
            <PrimaryButton
                text="Splněné"
                id="done"
                active={activeTab}
                onClick={() => showCompletedTasks()}
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