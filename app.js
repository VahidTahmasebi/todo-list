const todoInput = document.querySelector(".todo-list__form-input");
const newTodoBtn = document.querySelector(".todo-list__new-todo-btn");
const todoList = document.querySelector(".todo-list__task-todos");
const filter = document.querySelector(".todo-list__filter");

document.addEventListener("DOMContentLoaded", getLocalTodos);
newTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filter.addEventListener("change", filterTodo);

// creating and adding todo in DOM
function addTodo(e) {
  e.preventDefault();
  // create div and its class
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-list__new-todo");
  // create todo item
  const todoValue = `
  <li>${todoInput.value}</li>
  <span><i class="fa-regular fa-square-check"></i></span>
  <span><i class="fa-regular fa-trash-can"></i></span>
  `;
  todoDiv.innerHTML = todoValue;
  // append to todo list
  todoList.appendChild(todoDiv);
  // save todo in local
  saveLocalTodos(todoInput.value);
  // clear input
  todoInput.value = "";
}
// add check and remove button in
function checkRemove(e) {
  // get the class of todo by target
  const resolveClassList = [...e.target.classList];
  // get the target of todo
  const itemTarget = e.target;
  // Find the grandfather and pass the desired class
  if (resolveClassList[1] === "fa-square-check") {
    const todo = itemTarget.parentElement.parentElement;
    todo.classList.toggle("todo-completed");
  } else if (resolveClassList[1] === "fa-trash-can") {
    const todo = itemTarget.parentElement.parentElement;
    todo.remove(todo);
    removeLocalTodos(todo);
  }
}
// filter todos
function filterTodo(e) {
  // get the desired filter value
  const value = e.target.value;
  // the children of the to do list
  const todos = todoList.childNodes;
  // we assign the style according to the value of the filter
  todos.forEach((todo) => {
    switch (value) {
      case "all":
        todo.style.display = "flex";

        break;
      case "completed":
        if (todo.classList.contains("todo-completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;
      case "uncompleted":
        if (!todo.classList.contains("todo-completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        return;
    }
  });
}
// get input values ​​for locale
function saveLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}
// get todo list structure in local
function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

  savedTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-list__new-todo");

    const newTodo = `
      <li class="todo-item">${todo}</li>
      <span><i class="fa-regular fa-square-check"></i></span>
      <span><i class="fa-regular fa-trash-can"></i></span>
  `;
    todoDiv.innerHTML = newTodo;

    todoList.appendChild(todoDiv);
  });
}
// get deleted todo in local
function removeLocalTodos(removedTodo) {
  let savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
  const filteredTodos = savedTodos.filter((todo) => todo !== removedTodo.children[0].innerText);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
}
