import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

const ElementsIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 * 
 * @param {String} elementID 
 */

export const App = (elementID) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos(ElementsIds.TodoList, todos)
    }
    (()=> {
        const app = document.createElement('div');
        app.innerHTML= html;
        document.querySelector(elementID).append(app);
        displayTodos();
    })();

    const newDescriptionInput = document.querySelector(ElementsIds.NewTodoInput);
    const todoListUl = document.querySelector(ElementsIds.TodoList);

    newDescriptionInput.addEventListener('keyup', (e) => {
        if(e.keyCode !== 13) return;
        if(e.target.value.trim().length === 0) return;
        todoStore.addTodo(e.target.value);
        displayTodos();
        e.target.value = '';
    })

    todoListUl.addEventListener("click", e => {
        const element = e.target.closest('[data-id');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })
}