import { memo } from 'react'
import { Card, Button } from 'react-bootstrap'

const Todo = memo(({ todo, removeTodo, toggleTodo }) => (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <input className="mr-2" type="checkbox" name="completed" id="" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                    <span onClick={() => toggleTodo(todo.id)} style={{ textDecoration: todo.completed && 'line-through', cursor: 'pointer' }}>{todo.title}</span>
                    <Button variant="danger" className="ml-2" onClick={() => removeTodo(todo.id)}>X</Button>
                </Card.Title>
            </Card.Body>
        </Card>
    )
)

export default Todo
