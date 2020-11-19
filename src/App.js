import React, { useState, useEffect } from 'react'
import { Pagination, Container, Card, Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import TodoService from './TodoService'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {

  return (
    <div className="App my-4">
      <Container>
        <Todos />
      </Container>
    </div>
  );
}

const usePaginate = (url, page, setPage) => {
  const [pagination, setPagination] = useState({ page, next: true, prev: false })

  const prevPage = () => {
    setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }
  useEffect(() => {
    pagination.page = page
    pagination.prev = page !== 1

    TodoService.getTodos(`${url}?_page=${page + 1}`).then(resp => {
      pagination.next = !resp.data.length ? false : true
    })
  }, [page])

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.Item onClick={prevPage} disabled={!pagination.prev}>&lt;</Pagination.Item>
        <Pagination.Item active>{pagination.page}</Pagination.Item>
        <Pagination.Item onClick={nextPage} disabled={!pagination.next}>&gt;</Pagination.Item>
      </Pagination>
    </div>
  )
}

// fetch todos when page changes
const useFetchTodos = (url, page) => {
  const [data, setData] = useState([])

  useEffect(() => {
    TodoService.getTodos(`${url}?_page=${page}`)
      .then(resp => setData(resp.data))
      .catch(err => console.log(err))
  }, [page])

  return [data, setData]
}

const Todos = () => {
  const [page, setPage] = useState(1)
  const pagination = usePaginate('https://jsonplaceholder.typicode.com/todos', page, setPage)
  const [todos, setTodos] = useFetchTodos('https://jsonplaceholder.typicode.com/todos', page)

  const addTodo = (newTodo) => {
    TodoService.addTodo('https://jsonplaceholder.typicode.com/todos', newTodo)
      .then(resp => {
        const newTodos = [newTodo, ...todos]
        setTodos(newTodos)
      })
  }

  const removeTodo = id => {
    TodoService.deleteTodo('https://jsonplaceholder.typicode.com/todos', id)
      .then(resp => {
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos)
      })
  }

  const toggleTodo = id => {
    const newTodos = todos.map(todo => {
      if (todo.id === id)
        todo.completed = !todo.completed
      return todo
    })
    setTodos(newTodos)
  }


  return (
    <React.Fragment>
      <TodoForm addTodo={addTodo}></TodoForm>
      {pagination}
      <div className="todo-container">
        {todos.map(todo => (<Todo key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />))}
      </div>
    </React.Fragment>
  )
}

const Todo = ({ todo, removeTodo, toggleTodo }) => {

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          <input className="mr-2" type="checkbox" name="completed" id="" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
          <span style={{ textDecoration: todo.completed && 'line-through' }}>{todo.title}</span>
          <Button variant="danger" className="ml-2" onClick={() => removeTodo(todo.id)}>X</Button>
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

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

export default App;
