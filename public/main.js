const API_BASE = '/api/todos';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

async function fetchTodos() {
  const res = await fetch(API_BASE);
  const todos = await res.json();
  renderTodos(todos);
}

function renderTodos(todos) {
  list.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    if (todo.completed) {
      li.classList.add('completed');
    }

    const left = document.createElement('div');
    left.className = 'left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id, checkbox.checked));

    const titleSpan = document.createElement('span');
    titleSpan.textContent = todo.title;

    left.appendChild(checkbox);
    left.appendChild(titleSpan);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    actions.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

async function createTodo(title) {
  await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  await fetchTodos();
}

async function toggleTodo(id, completed) {
  await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  await fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  await fetchTodos();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  await createTodo(title);
  input.value = '';
});

fetchTodos();
