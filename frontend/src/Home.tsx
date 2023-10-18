import { useState } from 'react'
import {
    useQuery,
    useMutation,
    useQueryClient
  } from '@tanstack/react-query'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { changeData, removeData } from './app/reducer'
import { AllTasks, CreateTask } from './components/api'
import { PrimaryButton } from './components/buttons'
import List from './components/list'
import TodoIcon from './images/todo'
import Add from './images/add'



interface Item {
  id: string,
  text: string,
  completed: boolean,
  createdDate: number,
  completedDate?: number
}

export default function Todos() {

    const queryClient = useQueryClient()

    const dispatch = useDispatch()

    const [text, setText] = useState<string>('')
    const [button, setButton] = useState<string>('all')
    
    const selectedData = useSelector((state: any) => state.selectedData)

    const { isLoading, data } = useQuery({ 
      queryKey: ['todos'],
      queryFn: AllTasks
    })
  
    const mutation = useMutation({
      mutationFn: CreateTask,
      onSuccess: data => {
        queryClient.setQueryData(['todos'],
          (prevData: Item[] | undefined) => [data, ...(prevData || [])])
        setText('')
      }
    })
  
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      mutation.mutate(text)
    }

    function allTasks(id: string) {
      setButton(id)
      dispatch(
        removeData()
      )
    }
    
    function completedTasks(id: string) {
      setButton(id)
      dispatch(
        changeData({
          selectedData: [...data.filter((task: Item) => task.completed)]
        })
      )
    }

    function incompletedTasks(id: string) {
      setButton(id)
      dispatch(
        changeData({
          selectedData: [...data.filter((task: Item) => !task.completed)]
        })
      )
    }
  
    return (
      <Main>
        <StyledHeader>
            <TodoIcon
                width={30}
                height={30}
            />
            <H1>Todo list</H1>
        </StyledHeader>
        <StyledSection>
          <SectionHeader>
            <StyledForm onSubmit={(e) => handleSubmit(e)}>
                <StyledInput
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Zadejte úkol'
                />
                <SubmitButton type="submit">
                  <Add
                    width={15}
                    height={15}
                  />
                </SubmitButton>
            </StyledForm>
            <Buttons>
              <PrimaryButton
                text="Všechny"
                id="all"
                active={button}
                onClick={() => allTasks('all')}
              />
              <PrimaryButton
                text="Nesplněné"
                id="undone"
                active={button}
                onClick={() => incompletedTasks('undone')}
              />
              <PrimaryButton
                text="Splněné"
                id="done"
                active={button}
                onClick={() => completedTasks('done')}
              />
            </Buttons>
          </SectionHeader>
        {isLoading ?
          <LoadingState>Načítání úkolů...</LoadingState>
          :
          <ListSection>
            <List
                list={selectedData?.selectedData || data}
              />
          </ListSection>
        }
        </StyledSection>
      </Main>
    )
  }

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin: 12px auto;
`

const SectionHeader = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`

const StyledForm = styled.form`
  position: relative;
`

const SubmitButton = styled.button`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
  background: transparent;
  border: 1px solid #e4e4e4;
  box-sizing: content-box;
  width: 20px;
  height: 20px;
  padding: 4px;
  &:hover {
    border: 1px solid black;
  }
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 10px;
`
const StyledHeader = styled.header`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid lightGrey;
  border-bottom: 0;
  padding: 24px 32px;
  border-radius: 10px 10px 0 0;
  background: #e7f6df;
`

const H1 = styled.h1`
  margin: 0 0 0 12px;
  font-size: 28px;
  text-transform: uppercase;
`

const StyledInput = styled.input`
  padding: 12px 20px;
  border: 1px solid #e4e4e4;
  border-radius: 15px;
  font-size: 24px;
  line-height: 24px;
  :focus {
    border: 1px solid #b6b6b6;
  }
`
const StyledSection = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 24px 32px 10px 32px;
  border: 1px solid lightGrey;
  border-top: 0;
  border-radius: 0 0 10px 10px;
  @media (max-width: 600px) {
    padding: 12px 8px 10px 8px;
  }
`
const Buttons = styled.section`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 12px;
`
const ListSection = styled.section`
  width: 100%;
`