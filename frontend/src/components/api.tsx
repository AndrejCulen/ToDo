export async function AllTasks() {
  const response = await fetch('http://localhost:8080/tasks')

  if (!response.ok) {
    throw new Error('Chyba na backednu')
  }

  return response.json()
}

export async function CreateTask(text: string) {
  const response = await fetch('http://localhost:8080/tasks', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text: text })
  })

  if (!response.ok) {
    throw new Error('Chyba backendu')
  }

  return response.json()
}

interface Update {
  id: string
  text: string
}

export async function UpdateTask({id, text}: Update) {
  const response = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text: text })
  })

  if (!response.ok) {
    throw new Error('Chyba backendu')
  }

  return response.json()
}

export async function DeleteTask(id: string) {
  const response = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  console.log(response.json())
  if (!response.ok) {
    throw new Error('Chyba backendu')
  }

  return response.json()
}

export async function CompleteTask(id: string) {
  const response = await fetch(`http://localhost:8080/tasks/${id}/complete`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })

  if (!response.ok) {
    throw new Error('Chyba backendu')
  }

  return response.json()
}

export async function IncompleteTask(id: string) {
  const response = await fetch(`http://localhost:8080/tasks/${id}/incomplete`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })

  if (!response.ok) {
    throw new Error('Chyba backendu')
  }

  return response.json()
}