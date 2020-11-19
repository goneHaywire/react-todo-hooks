import axios from 'axios'

const TodoService = {
    getTodos: (url) => axios.get(url),
    addTodo: (url, todo) => axios.post(url, todo),
    deleteTodo: (url, id) => axios.delete(url, id)
}

export default TodoService