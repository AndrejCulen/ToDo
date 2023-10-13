import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

export function AllTodos() {

}

export async function CreateTask(text: string) {
    // const mutation = useMutation({
    //     mutationFn: (text) => {
    //       console.log(text)
    //       const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ text: text })
    //     }
    //       return fetch('http://localhost:8080/tasks', requestOptions)
    //     }
    //   })

    //   return (
    //     mutation.mutate
    //   ) 
    const response = await fetch('http://localhost:8080/tasks', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text })
    })

    const result = await response.json()
    return result
}

export async function UpdateTask(id: number, text: string) {

}