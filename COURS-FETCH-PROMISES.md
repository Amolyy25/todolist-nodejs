# 🎓 Cours : Les Promises et Fetch en JavaScript

## 📌 Table des matières
1. [Les Promises - Comprendre le concept](#1-les-promises)
2. [Fetch - Communiquer avec un serveur](#2-fetch)
3. [Async/Await - La syntaxe moderne](#3-asyncawait)
4. [Exemples pratiques pour ta Todo List](#4-exemples-pratiques)

---

## 1. Les Promises

### 🤔 Le problème : Le code asynchrone

Imagine que tu commandes une pizza par téléphone :

```javascript
// ❌ Ça ne marche PAS comme ça en vrai
const pizza = commanderPizza();
mangerPizza(pizza); // Erreur ! La pizza n'est pas encore arrivée !
```

**Pourquoi ?** Parce que commander une pizza prend du temps. Tu ne peux pas la manger instantanément.

En JavaScript, c'est pareil pour :
- Récupérer des données d'un serveur (fetch)
- Lire un fichier
- Attendre un délai (setTimeout)

Ces opérations sont **ASYNCHRONES** = elles prennent du temps.

---

### 💡 La solution : Les Promises (Promesses)

Une **Promise** est comme un **ticket de commande** de pizza :

```javascript
const ticketPizza = commanderPizza(); // Tu reçois une PROMESSE

// Ce ticket peut avoir 3 états :
// 1. ⏳ PENDING (en attente) : La pizza est en préparation
// 2. ✅ FULFILLED (réussie) : La pizza est arrivée !
// 3. ❌ REJECTED (échouée) : Le livreur s'est perdu 😢
```

---

### 📖 Syntaxe de base : `.then()` et `.catch()`

```javascript
commanderPizza()
    .then((pizza) => {
        // ✅ Succès ! La pizza est arrivée
        console.log("Je mange la pizza :", pizza);
    })
    .catch((erreur) => {
        // ❌ Erreur ! Problème de livraison
        console.log("Erreur :", erreur);
    });
```

**Explication :**
- `.then()` = "Quand la promesse réussit, fais ça"
- `.catch()` = "Si ça rate, gère l'erreur"

---

### 🔗 Chaîner plusieurs Promises

Tu peux enchaîner plusieurs actions :

```javascript
commanderPizza()
    .then((pizza) => {
        console.log("Pizza reçue !");
        return mangerPizza(pizza); // Retourne une autre promesse
    })
    .then(() => {
        console.log("Pizza mangée !");
        return commanderDessert(); // Encore une promesse
    })
    .then((dessert) => {
        console.log("Dessert reçu :", dessert);
    })
    .catch((erreur) => {
        console.log("Erreur quelque part :", erreur);
    });
```

**Important :** Le `.catch()` à la fin attrape TOUTES les erreurs de la chaîne.

---

### ✍️ Créer ta propre Promise (bonus)

```javascript
function attendreDelai(secondes) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("C'est bon !"); // ✅ Succès
        }, secondes * 1000);
    });
}

attendreDelai(2)
    .then((message) => {
        console.log(message); // Affiche après 2 secondes
    });
```

**Vocabulaire :**
- `resolve()` = Dire que la promesse a réussi
- `reject()` = Dire que la promesse a échoué

---

## 2. Fetch

### 🌐 Qu'est-ce que Fetch ?

`fetch()` est une fonction JavaScript pour **communiquer avec un serveur**.

C'est comme envoyer une lettre par la poste :
- 📬 Tu envoies une requête au serveur
- ⏳ Tu attends la réponse
- 📩 Tu reçois la réponse

**Fetch retourne TOUJOURS une Promise !**

---

### 📖 Syntaxe de base : GET (récupérer des données)

```javascript
fetch('http://localhost:3000/api/todos')
    .then((response) => {
        // response = l'enveloppe de la réponse
        console.log("Réponse reçue :", response);
        
        // Il faut OUVRIR l'enveloppe pour lire le contenu !
        return response.json(); // Retourne une AUTRE promesse
    })
    .then((data) => {
        // data = le contenu JSON décodé
        console.log("Données :", data);
    })
    .catch((erreur) => {
        console.error("Erreur :", erreur);
    });
```

**⚠️ ATTENTION : Piège classique !**

```javascript
// ❌ ERREUR FRÉQUENTE
fetch('http://localhost:3000/api/todos')
    .then((response) => {
        console.log(response); // Ça affiche un objet Response, pas tes données !
    });

// ✅ CORRECT
fetch('http://localhost:3000/api/todos')
    .then((response) => response.json()) // Convertir en JSON
    .then((data) => {
        console.log(data); // Maintenant tu as tes données !
    });
```

**Pourquoi 2 étapes ?**
- 1ère promesse = Attendre la réponse du serveur
- 2ème promesse = Décoder le JSON reçu

---

### 📤 Syntaxe : POST (envoyer des données)

```javascript
fetch('http://localhost:3000/api/todos', {
    method: 'POST',                    // Type de requête
    headers: {
        'Content-Type': 'application/json' // Dire qu'on envoie du JSON
    },
    body: JSON.stringify({             // Convertir objet JS en texte JSON
        text: 'Mon nouveau todo'
    })
})
    .then((response) => response.json())
    .then((data) => {
        console.log("Todo créé :", data);
    })
    .catch((erreur) => {
        console.error("Erreur :", erreur);
    });
```

**Explication des paramètres :**
- `method`: 'GET', 'POST', 'DELETE', 'PUT', etc.
- `headers`: Informations supplémentaires (comme dire "c'est du JSON")
- `body`: Les données à envoyer (obligatoirement en texte JSON)

---

### 🗑️ Syntaxe : DELETE (supprimer)

```javascript
fetch('http://localhost:3000/api/todos/5', {
    method: 'DELETE'
})
    .then((response) => response.json())
    .then((data) => {
        console.log("Todo supprimé !");
    })
    .catch((erreur) => {
        console.error("Erreur :", erreur);
    });
```

---

## 3. Async/Await

### 🚀 La syntaxe MODERNE (plus simple !)

`async/await` est du **sucre syntaxique** sur les Promises. Ça rend le code plus lisible.

**Comparaison :**

```javascript
// ❌ Avec .then() (ancien style, compliqué)
function getTodos() {
    fetch('http://localhost:3000/api/todos')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((erreur) => {
            console.error(erreur);
        });
}

// ✅ Avec async/await (moderne, plus clair)
async function getTodos() {
    try {
        const response = await fetch('http://localhost:3000/api/todos');
        const data = await response.json();
        console.log(data);
    } catch (erreur) {
        console.error(erreur);
    }
}
```

**Règles :**
1. Pour utiliser `await`, la fonction DOIT être `async`
2. `await` = "Attends que la promesse se termine"
3. `try/catch` = Gérer les erreurs (remplace `.catch()`)

---

### 📖 Exemples async/await

#### GET - Récupérer des données
```javascript
async function fetchTodos() {
    try {
        const response = await fetch('http://localhost:3000/api/todos');
        const todos = await response.json();
        console.log("Todos récupérés :", todos);
        return todos;
    } catch (erreur) {
        console.error("Erreur GET :", erreur);
    }
}
```

#### POST - Ajouter des données
```javascript
async function addTodo(texte) {
    try {
        const response = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: texte })
        });
        const newTodo = await response.json();
        console.log("Todo ajouté :", newTodo);
        return newTodo;
    } catch (erreur) {
        console.error("Erreur POST :", erreur);
    }
}
```

#### DELETE - Supprimer
```javascript
async function deleteTodo(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log("Todo supprimé :", result);
        return result;
    } catch (erreur) {
        console.error("Erreur DELETE :", erreur);
    }
}
```

---

## 4. Exemples pratiques pour ta Todo List

### 🎯 Structure complète d'un script.js

Voici comment organiser ton code :

```javascript
// ========================================
// 1. FONCTIONS FETCH (Communication API)
// ========================================

// Récupérer tous les todos
async function fetchTodos() {
    try {
        const response = await fetch('http://localhost:3000/api/todos');
        const todos = await response.json();
        return todos;
    } catch (erreur) {
        console.error("Erreur lors de la récupération :", erreur);
        return [];
    }
}

// Ajouter un todo
async function addTodo(texte) {
    try {
        const response = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: texte })
        });
        const newTodo = await response.json();
        return newTodo;
    } catch (erreur) {
        console.error("Erreur lors de l'ajout :", erreur);
    }
}

// Supprimer un todo
async function deleteTodo(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        return result;
    } catch (erreur) {
        console.error("Erreur lors de la suppression :", erreur);
    }
}

// ========================================
// 2. FONCTIONS DOM (Affichage)
// ========================================

// Afficher les todos dans la page
function displayTodos(todos) {
    const todoList = document.getElementById('todoList');
    const emptyState = document.getElementById('emptyState');
    
    // Vider la liste actuelle
    todoList.innerHTML = '';
    
    // Si pas de todos, afficher le message "liste vide"
    if (todos.length === 0) {
        emptyState.classList.add('show');
        return;
    }
    
    emptyState.classList.remove('show');
    
    // Créer un élément <li> pour chaque todo
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${todo.text}</span>
            <button class="btn-delete" data-id="${todo.id}">Supprimer</button>
        `;
        
        todoList.appendChild(li);
    });
}

// Charger et afficher les todos
async function loadAndDisplayTodos() {
    const todos = await fetchTodos(); // Attend que les todos soient récupérés
    displayTodos(todos);              // Puis les affiche
}

// ========================================
// 3. GESTION DES ÉVÉNEMENTS
// ========================================

// Ajouter un todo quand on clique sur le bouton
document.getElementById('addBtn').addEventListener('click', async () => {
    const input = document.getElementById('todoInput');
    const texte = input.value.trim();
    
    if (texte === '') {
        alert('Entre un texte !');
        return;
    }
    
    await addTodo(texte);        // Ajouter dans le backend
    input.value = '';            // Vider l'input
    await loadAndDisplayTodos(); // Recharger la liste
});

// Supprimer un todo quand on clique sur "Supprimer"
document.getElementById('todoList').addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const id = e.target.dataset.id;
        await deleteTodo(id);        // Supprimer dans le backend
        await loadAndDisplayTodos(); // Recharger la liste
    }
});

// ========================================
// 4. INITIALISATION
// ========================================

// Charger les todos au démarrage de la page
loadAndDisplayTodos();
```

---

## 📊 Schéma récapitulatif

```
┌──────────────────────────────────────────────────────────────┐
│                     FLUX DE DONNÉES                           │
└──────────────────────────────────────────────────────────────┘

1. UTILISATEUR clique sur "Ajouter"
         ↓
2. JavaScript appelle addTodo()
         ↓
3. fetch() envoie une requête POST au serveur
         ↓ (PROMISE - on attend...)
4. Serveur traite la requête
         ↓
5. Serveur renvoie la réponse
         ↓
6. fetch() résout la Promise avec la réponse
         ↓
7. response.json() décode le JSON
         ↓ (PROMISE - on attend...)
8. On a enfin les données !
         ↓
9. On recharge la liste des todos
         ↓
10. L'interface se met à jour
```

---

## 🎯 Points clés à retenir

### Sur les Promises
✅ Une Promise = Une opération qui prendra du temps  
✅ 3 états : pending, fulfilled, rejected  
✅ `.then()` pour le succès, `.catch()` pour l'erreur  
✅ `async/await` = syntaxe moderne plus lisible  

### Sur Fetch
✅ `fetch()` retourne TOUJOURS une Promise  
✅ Il faut DEUX étapes : `fetch()` puis `.json()`  
✅ Avec `async/await`, on utilise `await` deux fois  
✅ Penser à gérer les erreurs avec `try/catch`  

### Erreurs fréquentes à éviter
❌ Oublier `response.json()` → Tu auras l'objet Response, pas tes données  
❌ Oublier `await` → Le code continue sans attendre la réponse  
❌ Oublier `Content-Type` dans POST → Le serveur ne comprend pas  
❌ Oublier `JSON.stringify()` → Tu envoies un objet au lieu de texte  

---

## 🧪 Exercices pour pratiquer

### Exercice 1 : Console
Ouvre la console du navigateur (F12) et tape :

```javascript
// Test simple
fetch('http://localhost:3000/api/todos')
    .then(r => r.json())
    .then(data => console.log(data));
```

### Exercice 2 : Ajouter un console.log partout
Dans ton code, mets des `console.log()` pour voir le flux :

```javascript
async function fetchTodos() {
    console.log("1. Début de fetchTodos");
    
    const response = await fetch('http://localhost:3000/api/todos');
    console.log("2. Réponse reçue :", response);
    
    const todos = await response.json();
    console.log("3. Données décodées :", todos);
    
    return todos;
}
```

### Exercice 3 : Comprendre l'asynchrone
Compare ces deux codes :

```javascript
// Code SYNCHRONE (bloquant)
console.log("1");
console.log("2");
console.log("3");
// Affiche : 1, 2, 3

// Code ASYNCHRONE (non-bloquant)
console.log("1");
fetch('http://localhost:3000/api/todos')
    .then(() => console.log("2"));
console.log("3");
// Affiche : 1, 3, 2  (surprenant !)
```

**Pourquoi ?** Le fetch ne bloque pas l'exécution. Le code continue pendant que le fetch attend la réponse.

---

## 📚 Pour aller plus loin

Si tu veux creuser :
- [MDN - Promises](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN - Fetch API](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)
- [MDN - async/await](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function)

---

## 🎓 Conclusion

Les Promises et Fetch peuvent sembler compliqués au début, mais :
1. **Promise** = "Je te promets de te donner un résultat plus tard"
2. **Fetch** = "Va chercher des données sur le serveur"
3. **Async/Await** = "Attends que la promesse se termine avant de continuer"

Une fois que tu as compris le principe, tu les utiliseras partout !

**Bon courage ! Tu vas y arriver ! 💪**

