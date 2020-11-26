import React, { useEffect, useReducer } from 'react'
import TodoService from '../services/TodoService'

const TodosReducer = (state, action) => {
    let newTodos;
    switch (action.type) {
        case 'FETCH_TODOS':
            return { ...state, loading: true, todos: [] }
        case 'SET_TODOS':
            return { ...state, loading: false, todos: action.payload }
        case 'ADD_TODO':
            return { ...state, todos: [action.payload, ...state.todos] }
        case 'TOGGLE_TODO':
            newTodos = state.todos.map(todo => {
                if (todo.id === action.payload)
                    return { ...todo, completed: !todo.completed }
                return todo
            })
            return { ...state, todos: newTodos }
        case 'DELETE_TODO':
            newTodos = state.todos.filter(todo => todo.id !== action.payload)
            return { ...state, todos: newTodos }
        case 'ERROR':
            return { ...state, todos: [], error: action.payload }
        default:
            return state
    }
}

const useFetchTodos = (page) => {
    const [state, dispatch] = useReducer(TodosReducer, { loading: true, error: false, todos: [] });

    useEffect(() => {
        dispatch({ type: 'FETCH_TODOS' })
        TodoService.getTodos(page)
            .then(resp => dispatch({ type: 'SET_TODOS', payload: resp.data }))
            .catch(err => dispatch({ type: 'ERROR', payload: err }))
    }, [page])

    return [state, dispatch]
}

export default useFetchTodos