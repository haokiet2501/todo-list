import { useState } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptypes'

interface TaskInputProps {
  handleAddTodo: (name: string) => void
  currentTodo: Todo | null
  handleEditTodo: (name: string) => void
  handleCompleteEdit: () => void
}

export default function TaskInput(props: TaskInputProps) {
  const { handleAddTodo, currentTodo, handleEditTodo, handleCompleteEdit } =
    props
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentTodo) {
      handleCompleteEdit()
      if (name) setName('')
    } else {
      handleAddTodo(name)
      setName('')
    }
  }

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTodo) {
      handleEditTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <div className='task'>
      <h1 className='task__title'>Todo</h1>
      <form className='task__container' onSubmit={handleSubmit}>
        <input
          className='task__input'
          type='text'
          placeholder='Nhập văn bản ở đây...'
          value={currentTodo ? currentTodo.name : name}
          onChange={handleChangeText}
        />
        <button className='task__btn'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleCompleteEdit: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])])
}
