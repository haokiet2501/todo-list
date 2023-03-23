import { Todo } from '../../@types/todo.type'
import PropTypes from 'prop-types'
import { TodoTypes } from '../../PropTypes/todo.proptypes'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  handleClickEdit: (id: string) => void
  handleDeleteTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const {
    doneTaskList,
    todos,
    handleDoneTodo,
    handleClickEdit,
    handleDeleteTodo
  } = props
  console.log(todos)

  const handleChecked =
    (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleDoneTodo(idTodo, event.target.checked)
    }

  return (
    <div className='taskList'>
      <h2 className='taskList__title'>
        {doneTaskList ? 'Hoàn Thành' : 'Chưa Hoàn Thành'}
      </h2>
      {todos.map((todo) => (
        <div className='taskList__wrap' key={todo.id}>
          <input
            type='checkbox'
            className='taskList__check'
            checked={todo.done}
            onChange={handleChecked(todo.id)}
          />
          <span
            className={`taskList__text ${todo.done ? 'taskList__done' : ''}`}
          >
            {todo.name}
          </span>
          <div className='taskList__btn'>
            <button
              className='taskList__button'
              onClick={() => handleClickEdit(todo.id)}
            >
              ✒️
            </button>
            <button
              className='taskList__button'
              onClick={() => handleDeleteTodo(todo.id)}
            >
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(TodoTypes).isRequired,
  handleDoneTodo: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired
}
