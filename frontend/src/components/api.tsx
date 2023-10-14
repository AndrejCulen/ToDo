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

export async function UpdateTask(id: number, text: string) {
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