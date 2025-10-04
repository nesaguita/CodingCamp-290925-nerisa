let todos = [];

// Add Todo
function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");

  if (todoInput.value === "" || todoDate.value === "") {
    alert("Please fill in all fields");
    return;
  }

  let todo = { task: todoInput.value, date: todoDate.value, done: false };
  todos.push(todo);

  todoInput.value = "";
  todoDate.value = "";

  renderTodo();
}

// Render Todo
function renderTodo(list = todos) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  if (list.length === 0) {
    todoList.innerHTML = `<tr>
      <td colspan="4" class="text-center text-gray-400 py-4">No task found</td>
    </tr>`;
    return;
  }

  list.forEach((todo, index) => {
    let statusClass = todo.done ? "text-green-400 font-semibold" : "text-yellow-400 font-semibold";
    let statusText = todo.done ? "Done" : "Pending";

    todoList.innerHTML += `
    <tr class="border-b border-pink-200">
      <td class="px-4 py-2">${todo.task}</td>
      <td class="px-4 py-2">${todo.date}</td>
      <td class="px-4 py-2 ${statusClass}">${statusText}</td>
      <td class="px-4 py-2 space-x-2">
        <button onclick="toggleStatus(${index})" 
          class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
          ${todo.done ? "Undo" : "Done"}
        </button>
        <button onclick="deleteTodo(${index})" 
          class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
          Delete
        </button>
      </td>
    </tr>`;
  });
}

// Toggle status
function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodo();
}

// Delete single
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodo();
}

// Delete all
function deleteAllTodo() {
  todos = [];
  renderTodo();
}

// Filter dropdown
function toggleFilterMenu() {
  const menu = document.getElementById("filter-menu");
  menu.classList.toggle("hidden");
}

// Apply filter
function applyFilter(type) {
  document.getElementById("filter-date").classList.add("hidden");

  if (type === "all") {
    renderTodo();
  } else if (type === "done") {
    renderTodo(todos.filter(t => t.done));
  } else if (type === "pending") {
    renderTodo(todos.filter(t => !t.done));
  }

  document.getElementById("filter-menu").classList.add("hidden");
}

// By date filter
function openDateFilter() {
  const dateInput = document.getElementById("filter-date");
  dateInput.classList.remove("hidden");
  document.getElementById("filter-menu").classList.add("hidden");
}

function filterTodo() {
  const filterDate = document.getElementById("filter-date").value;

  if (filterDate === "") {
    renderTodo();
    return;
  }

  const filtered = todos.filter(todo => todo.date === filterDate);
  renderTodo(filtered);
}

// Close dropdown if clicked outside
document.addEventListener("click", function (event) {
  const menu = document.getElementById("filter-menu");
  const button = event.target.closest("button");

  if (!event.target.closest("#filter-menu") && !(button && button.innerText === "Filter")) {
    menu.classList.add("hidden");
  }
});
