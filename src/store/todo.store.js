import { Todo } from "../todos/models/todo.models";

const filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del alba'),
    ],
    filter: filters.All
}


const initStore = () => {
    console.log(state);
    console.log("Init store🐅");
}

const loadStore = () => {

}

const addTodo = ( description ) => {

}

const toggleTodo = (todoId) => {

}

const deleteTodo = (todoId) => {
    
}

const deleteCompleted = () => {
    
}


const setFilter = ( newFilter = filters.All ) => {

}

const getCurrentFilter = () => {
    
}

export default {
    initStore,
}