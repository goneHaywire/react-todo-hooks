import axios from 'axios'

const http = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/todos',
    timeout: 1000,
});

const TodoService = {
    getTodos: (page) => http.get('', {
        params: {
            _page: page
        }
    }),
    addTodo: (todo) => http.post('', todo),
    deleteTodo: (id) => http.delete(`${id}`)
}

export default TodoService