const btnAdd = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

async function getTodo() {
  try {
    const reponse = await fetch("http://localhost:3000/api/todos");
    const todos = await reponse.json();
    return todos;
  } catch (error) {
    console.error(error);
  }
}

async function loadData() {
  const todos = await getTodo();
  const empty = document.getElementById("emptyState");

  if (todos.length === 0) {
    empty.classList.add("show");
    todoList.innerHTML = "";
  } else {
    empty.classList.remove("show");
    showTodo(todos);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

const showTodo = (todos) => {
  todoList.innerHTML = "";
  console.log(todos);
  for (let elements of todos) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${
          elements.completed ? "checked" : ""
        }>
            <span class="todo-text">${elements.text}</span>
            <button class="btn-delete" data-id="${
              elements.id
            }">Supprimer</button>
        
        `;
    todoList.appendChild(li);
  }
};

async function deleteTodo(id) {
  try {
    const reponse = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
    });
    const result = await reponse.json();
    return result;
  } catch (erreur) {
    console.log(erreur);
  }
}

todoList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = e.target.dataset.id;
    console.log("btnDelete appuyé, id : " + id);
    await deleteTodo(id);
    await loadData();
  }
});

async function postTodo(value) {
  const input = document.getElementById("todoInput");

  input.value = "";
  try {
    const reponse = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value }),
    });
    const result = await reponse.json();
    return result;
  } catch (erreur) {
    console.log(erreur);
  }
}

btnAdd.addEventListener("click", async () => {
  const input = document.getElementById("todoInput");
  console.log(input.value);
  if (input.value === "") {
    alert("Entre un texte !");
    return;
  } else {
    await postTodo(input.value);
    await loadData();
  }
});

// async function checcompletTodo(id) {

// }

// todoList.addEventListener("click", async (e) => {
//   if (e.target.classList.contains("todo-checkbox")) {

//   }
// })
