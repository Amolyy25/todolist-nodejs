const express = require("express");
const app = express();
const PORT = 3000;

let todos = [
  { id: 0, text: "Apprendre Node.js", completed: false },
  { id: 1, text: "Faire un projet Express", completed: false },
];
let nextId;
app.use(express.json());

app.use(express.static("public"));

app.get("/api/todos", (req, res) => {
  console.log("GET /api/todos");
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  let nextId = Math.max(...todos.map(obj => obj.id)) + 1;
  const newTodo = {
    id: nextId++,
    text: req.body.text,
    completed: false,
  };
  console.log(newTodo.id)
  todos.push(newTodo);
  console.log(`POST API/TODOS`);
  res.status(201).json(newTodo);
});
app.delete("/api/todos/:id", (req, res) => {
  id = parseInt(req.params.id)
  const index = todos.findIndex(todo => todo.id === id);
  
  if (index === -1) {
    console.log("Erreur : Todo non trouvé")
    return res.status(404).json({ error: "Todo non trouvé" });
  }
  
  todos = todos.filter(todo => todo.id !== id)
  res.status(200).json(todos);
});

app.patch("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let todo = todos.find((item) => item.id === id);
  if (todo) {
    todo.completed = true;
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
