import todoStore, { filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

const ElementsIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro'
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
    const buttonClearCompleted = document.querySelector(ElementsIds.ClearCompleted);
    const filtersUL = document.querySelectorAll(ElementsIds.TodoFilters);


    newDescriptionInput.addEventListener('keyup', (e) => {
        if(e.keyCode !== 13) return;
        if(e.target.value.trim().length === 0) return;
        todoStore.addTodo(e.target.value);
        displayTodos();
        e.target.value = '';
    });

    todoListUl.addEventListener("click", e => {
        const element = e.target.closest('[data-id');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUl.addEventListener("click", e => {
        console.log(e.target);
        console.log(e.target.className);

        const isDestroy = e.target.className === 'destroy';
        const element = e.target.closest('[data-id');

        if(!element || !isDestroy) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    buttonClearCompleted.addEventListener("click", e => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersUL.forEach(element => {
        element.addEventListener("click", element => {
            filtersUL.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(filters.Completed);
                    break;
            }

            displayTodos();

        });
    });
}