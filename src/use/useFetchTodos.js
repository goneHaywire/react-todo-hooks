import { useEffect, useReducer } from 'react'
import TodoService from '../services/TodoService'

const TodosReducer = (state, action) => {
    let newTodos;
    switch (action.type) {
        case 'FETCHING_TODOS':
            return { ...state, loading: true }
        case 'SET_TODOS':
            return { ...state, page: state.page + 1, loading: false, todos: action.payload }
        case 'APPEND_TODOS':
            return { ...state, page: state.page + 1, loading: false, todos: [...state.todos, ...action.payload] }
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
            return { ...state, error: action.payload }
        default:
            return state
    }
}

const useFetchTodos = (prefetch) => {
    const [state, dispatch] = useReducer(TodosReducer, { loading: false, error: false, todos: [], page: 0 });

    useEffect(() => {
        if (prefetch) {
            dispatch({ type: 'FETCHING_TODOS' })
            TodoService.getTodos(state.page + 1)
                .then(resp => dispatch({ type: 'APPEND_TODOS', payload: resp.data }))
                .catch(err => dispatch({ type: 'ERROR', payload: err }))
        }
    }, [])

    return [state, dispatch]
}

export default useFetchTodos