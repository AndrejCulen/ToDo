import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { allTasks } from './api'
import TodoList from './components/todoList'
import Header from './components/header'
import AddTodo from './components/addTodo'
import Footer from './components/footer'
import FilteringTodos from './components/filteringTodos'
import type { RootState } from './app/store'

export default function Home() {
    
    const selectedData = useSelector((state: RootState) => state.selectedData)

    const { isLoading, data } = useQuery({ 
      queryKey: ['todos'],
      queryFn: allTasks
    })

    return (
      <Main>
        <Header />
        <StyledSection>
          <SectionHeader>
            <AddTodo />
            <FilteringTodos data={data} />
          </SectionHeader>
        {isLoading ?
          <LoadingState>Načítání úkolů...</LoadingState>
          :
          <ListSection>
            <TodoList
                list={selectedData?.selectedData || data}
              />
          </ListSection>
        }
        {!isLoading && <Footer list={selectedData?.selectedData || data} />}
        </StyledSection>
      </Main>
    )
  }

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 10px;
`

const StyledSection = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 24px 32px 10px 32px;
  border: 1px solid ${prosps => prosps.theme.borderBackground};
  border-top: 0;
  border-radius: 0 0 10px 10px;
  @media (max-width: 600px) {
    padding: 12px 8px 10px 8px;
  }
`

const SectionHeader = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin: 12px auto;
`

const ListSection = styled.section`
  width: 100%;
`