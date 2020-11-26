import React, { useState } from 'react'
import useFetchTodos from '../use/useFetchTodos'
import usePaginate from '../use/usePaginate'
import TodoService from '../services/TodoService'
import Todo from './Todo'
import TodoForm from './TodoForm'

const Todos = () => {
    const [page, setPage] = useState(1)
    const pagination = usePaginate(page, setPage)
    const [state, dispatch] = useFetchTodos(page)

    const addTodo = (newTodo) => {
        TodoService.addTodo(newTodo)
            .then(resp => dispatch({ type: 'ADD_TODO', payload: newTodo }))
            .catch(err => dispatch({ type: 'ERROR', payload: err }))
    }

    const removeTodo = id => {
        TodoService.deleteTodo(id)
            .then(resp => dispatch({ type: 'DELETE_TODO', payload: id }))
            .catch(err => dispatch({ type: 'ERROR', payload: id }))
    }

    const toggleTodo = id => {
        dispatch({ type: 'TOGGLE_TODO', payload: id })
    }

    return (
        <React.Fragment>
            <TodoForm addTodo={addTodo}></TodoForm>
            {pagination}
            {state.loading ?
                <div>Fetching Todos</div> :
                <div className="todo-container">
                    {state.todos.map(todo => (<Todo key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />))}
                </div>
            }
            {state.error && <div>Error while performing operation.</div>}
        </React.Fragment>
    )
}

export default Todos