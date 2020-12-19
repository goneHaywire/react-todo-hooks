import { useRef, useEffect, useCallback } from 'react'
import useFetchTodos from '../use/useFetchTodos'
import usePaginate from '../use/usePaginate'
import useInfiniteScroll from '../use/useInfiniteScroll'
import TodoService from '../services/TodoService'
import Todo from './Todo'
import TodoForm from './TodoForm'

const Todos = () => {
    const containerRef = useRef(null);
    const [ifBottom] = useInfiniteScroll(containerRef)
    const [state, dispatch] = useFetchTodos(true)
    // const pagination = usePaginate(page, setPage)

    // fetch todos when bottom reached
    useEffect(() => {
        if (ifBottom) {
            dispatch({ type: 'FETCHING_TODOS' })
            TodoService.getTodos(state.page + 1)
                .then(resp => dispatch({ type: 'APPEND_TODOS', payload: resp.data }))
                .catch(err => dispatch({ type: 'ERROR', payload: err }))
        }

    }, [ifBottom])

    const addTodo = useCallback((newTodo) => {
        TodoService.addTodo(newTodo)
            .then(resp => dispatch({ type: 'ADD_TODO', payload: newTodo }))
            .catch(err => dispatch({ type: 'ERROR', payload: err }))
    }, [])

    const removeTodo = useCallback(id => {
        TodoService.deleteTodo(id)
            .then(resp => dispatch({ type: 'DELETE_TODO', payload: id }))
            .catch(err => dispatch({ type: 'ERROR', payload: id }))
    }, [])

    const toggleTodo = useCallback(id => {
        dispatch({ type: 'TOGGLE_TODO', payload: id })
    }, [])

    return (
        <>
            <TodoForm addTodo={addTodo}></TodoForm>
            {/* {pagination} */}
            <div className="todo-container" ref={containerRef}>
                <> {state.todos.map(todo => (<Todo key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />))}</>
            </div>
            {state.loading && <div>Fetching Todos</div>}
            { state.error && <div>Error while performing operation.</div>}
        </>
    )
}

export default Todos