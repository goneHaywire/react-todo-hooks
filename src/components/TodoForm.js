import { memo, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { LastTodoSetter } from '../contexts/LastTodoContext'

const TodoForm = memo(({ addTodo }) => {
    const setLastTodo = useContext(LastTodoSetter)
    const [title, setTitle] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const newTodo = {
            id: uuidv4(),
            title
        }
        addTodo(newTodo)
        setLastTodo(title)
        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input className="form-control" type="text" value={title} placeholder="Add a new todo" onChange={e => setTitle(e.target.value)} />
        </form>
    )
})

export default TodoForm