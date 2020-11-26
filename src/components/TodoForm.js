import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const TodoForm = ({ addTodo }) => {
    const [title, setTitle] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const newTodo = {
            id: uuidv4(),
            title
        }
        addTodo(newTodo)
        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input className="form-control" type="text" value={title} placeholder="Add a new todo" onChange={e => setTitle(e.target.value)} />
        </form>
    )
}

export default TodoForm