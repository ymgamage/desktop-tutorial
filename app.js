const STORAGE_KEY = 'taskflow.tasks';
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedButton = document.getElementById('clear-completed');

let tasks = loadTasks();
let activeFilter = 'all';

function loadTasks() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(stored)
      ? stored.filter((task) => task && typeof task.id === 'number' && typeof task.label === 'string')
        .map((task) => ({ ...task, completed: Boolean(task.completed) }))
      : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Could not save tasks:', error);
  }
}

function render() {
  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === 'active') return !task.completed;
    if (activeFilter === 'completed') return task.completed;
    return true;
  });

  taskList.replaceChildren();
  if (visibleTasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'task-item';
    const message = document.createElement('span');
    message.className = 'task-text';
    message.textContent = 'No tasks here yet.';
    empty.appendChild(message);
    taskList.appendChild(empty);
  }

  visibleTasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task-item${task.completed ? ' completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark ${task.label} complete`);
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      render();
    });

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.label;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', `Delete ${task.label}`);
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((current) => current.id !== task.id);
      saveTasks();
      render();
    });

    item.append(checkbox, text, deleteButton);
    taskList.appendChild(item);
  });

  const remaining = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = `${remaining} ${remaining === 1 ? 'task' : 'tasks'} left`;
  filterButtons.forEach((button) => {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const label = input.value.trim();
  if (!label) {
    input.focus();
    return;
  }
  tasks.unshift({ id: Date.now() + Math.random(), label, completed: false });
  input.value = '';
  saveTasks();
  render();
  input.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    render();
  });
});

clearCompletedButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
});

render();
