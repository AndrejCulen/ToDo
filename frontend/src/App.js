import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {CreateTask} from './components/api.tsx'
import List from './components/list.tsx'
import {useEffect, useState} from 'react'

const queryClient = new QueryClient()

function App() {

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
  const queryClient = useQueryClient()

  const query = useQuery({ queryKey: ['todos'], queryFn: async() => await fetch('http://localhost:8080/tasks').then((response) => response.json()) })


  
    const mutation = useMutation({
      mutationFn: (event) => {
        console.log(text)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: 'todo' })
      };
        return fetch('http://localhost:8080/tasks', requestOptions)
      }
    })
    
    function handleText(e) {
      setText(e.target.value, console.log(text))
    }

    function handleSubmit(event) {
      event.preventDefault()
      CreateTask(text)
    }

  return (
    <div>
      <div>ToDo App</div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleText}/>
        <button type="submit">submit</button>
      </form>
      <div>
        <List items={query.data} />
      </div>
    </div>
  )
}

export default App
