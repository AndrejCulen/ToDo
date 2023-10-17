import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Todos from './home'

const queryClient = new QueryClient()

export default function App() {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
          <Todos />
      </QueryClientProvider>
    </div>
  )
}