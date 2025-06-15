import api from '../apiConfig';

export const TodoService = {
    // Get all todos
    getAllTodos: async () => {
        try {
            const response = await api.get('/api/todos/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create a new todo
    createTodo: async (todoData) => {
        try {
            const response = await api.post('/api/todos/', todoData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Toggle todo status
    toggleTodo: async (uid) => {
        try {
            const response = await api.put(`/api/todos/${uid}/toggle/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default TodoService;