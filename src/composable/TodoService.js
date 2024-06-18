import axios from "axios";

class TodoManager{
    async addTodo (text, category_id) {
        const response = await axios.post(`todo/add/todo/`, {task: text,detail: '',category: category_id})
        if (response.status === 201){return response.data}
    }

    async todoUpdate(todo) {
        await axios.put(`todo/${todo.id}`, todo)
    }

    async todoDelete(todo) {
        await axios.delete(`todo/${todo.id}`)
    }

    /*
    async addCategory(name){
        const response = await axios.post(`todo/add/todo/`, {task: text,detail: '',category: category_id})
    }
    */
}


export default new TodoManager();
