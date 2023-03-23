import { useEffect, useState } from 'react'
import { Todo } from '../../@types/todo.type'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList/TaskList'

// interface HandleNewTodos {
//   (todos: Todo[]): Todo[]
// }

type HandleNewTodos = (todos: Todo[]) => Todo[]

const asyncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const complete = todos.filter((todo) => todo.done)
  const unComplete = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const handleAddTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
    asyncReactToLocal((todosObj: Todo[]) => [...todosObj, todo])
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  const handleClickEdit = (id: string) => {
    const findId = todos.find((todo) => todo.id === id)
    if (findId) {
      setCurrentTodo(findId)
    }
  }

  const handleEditTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const handleCompleleEdit = () => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
    asyncReactToLocal(handler)
  }

  const handleDeleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    const handler = (todoObj: Todo[]) => {
      const findIdIndex = todoObj.findIndex((todo) => todo.id === id)
      if (findIdIndex > -1) {
        const result = [...todoObj]
        result.splice(findIdIndex, 1)
        return result
      }
      return todoObj
    }
    setTodos(handler)
    asyncReactToLocal(handler)
  }

  return (
    <div className='todo'>
      <div className='todo__container'>
        <TaskInput
          handleAddTodo={handleAddTodo}
          currentTodo={currentTodo}
          handleEditTodo={handleEditTodo}
          handleCompleteEdit={handleCompleleEdit}
        />
        <TaskList
          todos={unComplete}
          handleDoneTodo={handleDoneTodo}
          handleClickEdit={handleClickEdit}
          handleDeleteTodo={handleDeleteTodo}
        />
        <TaskList
          doneTaskList
          todos={complete}
          handleDoneTodo={handleDoneTodo}
          handleClickEdit={handleClickEdit}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  )
}
