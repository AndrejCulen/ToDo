import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {AllTasks, CreateTask} from './components/api.tsx'
import List from './components/list.tsx'
import { useState } from 'react'
import Button from './components/buttons'
import styled from 'styled-components'
import Checkbox from './components/checkbox'

const queryClient = new QueryClient()

export default function App() {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <header className="App-header">
          <Todos />
        </header>
      </QueryClientProvider>
    </div>
  )
}

function Todos() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])

  const query = useQuery({ 
    queryKey: ['todos'],
    queryFn: AllTasks
  })

  const mutation = useMutation({
    mutationFn: CreateTask
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    mutation.mutate(text)
  }

  return (
    <div>
      <div>ToDo App</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      <Checkbox />
      <Buttons>
        <Button text="vse" />
        <Button text='hatove' />
        <Button text='jineho' />
      </Buttons>
      <div>
        <List items={query.data} />
      </div>
    </div>
  )
}

const Buttons = styled.section`
  display: flex;
`