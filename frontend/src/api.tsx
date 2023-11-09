export async function allTasks() {
  const response = await fetch('http://localhost:8080/tasks')

  if (!response.ok) {
    throw new Error('Chyba při načítání úkolů')
  }

  return response.json()
}

export async function createTask(text: string) {
  const response = await fetch('http://localhost:8080/tasks', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text: text })
  })

  if (!response.ok) {
    throw new Error('Nastala chyba při vytváření úkolu')
  }

  return response.json()
}

interface Update {
  id: string
  text: string
}

export async function updateTask({id, text}: Update) {
  const response = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text: text })
  })

  if (!response.ok) {
    throw new Error('Chyba při změně úkolu')
  }

  return response.json()
}

export async function deleteTask(id: string) {
  const response = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })

  if (!response.ok) {
    throw new Error('Chyba při odstranění úkolu')
  }

  // Api nevrací task při DELETE, response v sobě nic nemá, není co vracet
}

export async function completeTask(id: string) {
  const response = await fetch(`http://localhost:8080/tasks/${id}/complete`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })

  if (!response.ok) {
    throw new Error('Chyba při dokončení úkolu')
  }

  return response.json()
}

export async function incompleteTask(id: string) {
  const response = await fetch(`http://localhost:8080/tasks/${id}/incomplete`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })

  if (!response.ok) {
    throw new Error('Chyba při obnově úkolu')
  }

  return response.json()
}