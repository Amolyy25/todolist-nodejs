# 📋 Plan de développement - Todo List App

## ✅ Étape 1 : Configuration de base (TERMINÉ)
- [x] Installer Express
- [x] Créer server.js
- [x] Configurer les middlewares (JSON + static)
- [x] Créer la base de données en mémoire (tableau `todos`)

---

## 🔧 Étape 2 : Routes API Backend

### 2.1 Route GET (TERMINÉ ✅)
- [x] Créer `GET /api/todos` pour récupérer tous les todos
- [x] Tester avec curl : `curl -X GET http://localhost:3000/api/todos`

### 2.2 Route POST (TERMINÉ ✅)
- [x] Créer `POST /api/todos` pour ajouter un todo
- [ ] Tester avec curl :
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Mon nouveau todo"}'
```

### 2.3 Route DELETE (À FAIRE 🔨)
- [ ] Créer `DELETE /api/todos/:id` pour supprimer un todo
- [ ] Utiliser `req.params.id` pour récupérer l'ID
- [ ] Filtrer le tableau `todos` pour retirer l'élément
- [ ] Tester avec curl : `curl -X DELETE http://localhost:3000/api/todos/1`

### 2.4 Route PATCH (BONUS - optionnel)
- [ ] Créer `PATCH /api/todos/:id` pour modifier le statut completed
- [ ] Tester avec curl

---

## 🎨 Étape 3 : Frontend HTML

### 3.1 Structure HTML (index.html)
- [ ] Créer le squelette HTML5
- [ ] Ajouter un titre `<h1>Ma Todo List</h1>`
- [ ] Créer un formulaire pour ajouter des todos
  - [ ] Input text avec id="todoInput"
  - [ ] Bouton "Ajouter"
- [ ] Créer une `<ul id="todoList">` pour afficher les todos
- [ ] Lier script.js et style.css

---

## 🎯 Étape 4 : Frontend JavaScript (script.js)

### 4.1 Fonction pour récupérer les todos
- [ ] Créer `async function fetchTodos()`
- [ ] Utiliser `fetch('http://localhost:3000/api/todos')`
- [ ] Convertir la réponse en JSON
- [ ] Appeler `displayTodos(todos)`

### 4.2 Fonction pour afficher les todos
- [ ] Créer `function displayTodos(todos)`
- [ ] Vider la liste `<ul>` existante
- [ ] Boucler sur les todos avec `forEach()`
- [ ] Créer un `<li>` pour chaque todo avec :
  - [ ] Le texte du todo
  - [ ] Un bouton "Supprimer"
  - [ ] (Bonus) Une checkbox pour completed

### 4.3 Fonction pour ajouter un todo
- [ ] Créer `async function addTodo()`
- [ ] Récupérer la valeur de l'input
- [ ] Faire un `fetch()` POST vers `/api/todos`
- [ ] Envoyer les données en JSON
- [ ] Recharger la liste avec `fetchTodos()`

### 4.4 Fonction pour supprimer un todo
- [ ] Créer `async function deleteTodo(id)`
- [ ] Faire un `fetch()` DELETE vers `/api/todos/${id}`
- [ ] Recharger la liste

### 4.5 Event Listeners
- [ ] Écouter le clic sur le bouton "Ajouter"
- [ ] Écouter la touche "Enter" dans l'input
- [ ] Charger les todos au démarrage : `fetchTodos()` à la fin du fichier

---

## 💅 Étape 5 : Style CSS (style.css)

- [ ] Centrer le contenu
- [ ] Styliser le titre
- [ ] Styliser le formulaire et l'input
- [ ] Styliser les boutons (Ajouter, Supprimer)
- [ ] Styliser la liste des todos
- [ ] (Bonus) Ajouter une animation au survol

---

## 🚀 Étape 6 : Tests finaux

- [ ] Tester l'ajout d'un todo
- [ ] Tester la suppression d'un todo
- [ ] Tester le rechargement de la page (les todos persistent ?)
- [ ] Tester avec plusieurs todos
- [ ] Vérifier la console pour les erreurs

---

## 🎁 BONUS (Si tu veux aller plus loin)

- [ ] Marquer un todo comme "complété" (barrer le texte)
- [ ] Sauvegarder dans un fichier JSON au lieu de la mémoire
- [ ] Ajouter une base de données (SQLite, MongoDB)
- [ ] Filtrer les todos (Tous / Actifs / Complétés)
- [ ] Modifier un todo existant

---

## 📌 Notes importantes

**Ordre recommandé :**
1. Finir toutes les routes backend AVANT le frontend
2. Tester chaque route avec curl
3. Une fois le backend OK, faire le HTML
4. Puis le JavaScript
5. Enfin le CSS

**Commandes utiles :**
- Démarrer le serveur : `node server.js`
- Tester dans le navigateur : `http://localhost:3000`

---

## 🆘 Si tu bloques

1. Relis la documentation Express
2. Utilise `console.log()` partout
3. Vérifie la console du navigateur (F12)
4. Demande de l'aide à ton mentor ! 😊