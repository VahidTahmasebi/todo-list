const todoInput = document.querySelector(".todo-list__form-input");
const newTodoBtn = document.querySelector(".todo-list__new-todo-btn");
const todoList = document.querySelector(".todo-list__task-todos");
const todoListFilter = document.querySelector(".todo-list__filter");

newTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);

// add todo in DOM
function addTodo(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-list__new-todo");
  const todoValue = `
  <li>${todoInput.value}</li>
  <span><i class="fa-regular fa-square-check"></i></span>
  <span><i class="fa-regular fa-trash-can"></i></span>
  `;
  todoDiv.innerHTML = todoValue;
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function checkRemove(e) {
  const resolveClassList = [...e.target.classList];
  const itemTarget = e.target;

  if (resolveClassList[1] === "fa-square-check") {
    const todo = itemTarget.parentElement.parentElement;
    todo.classList.toggle("todo-completed");
  } else if (resolveClassList[1] === "fa-trash-can") {
    const todo = itemTarget.parentElement.parentElement;
    todo.remove(todo);
  }
}
