'use strict';

const STORAGE_KEY = 'task-semplice-v1';
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const notice = document.querySelector('#notice');
let storageAvailable = true;
let tasks = loadTasks();

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];
    const stored = JSON.parse(raw);
    const ids = new Set();
    if (!Array.isArray(stored) || !stored.every(task => {
      if (!task || typeof task.id !== 'string' || ids.has(task.id) ||
          typeof task.text !== 'string' || !task.text.trim() ||
          typeof task.done !== 'boolean') return false;
      ids.add(task.id);
      return true;
    })) throw new Error('Invalid saved tasks');
    return stored;
  } catch {
    storageAvailable = false;
    notice.textContent = 'Non riesco a leggere il salvataggio. Le nuove task restano solo in questa pagina; i dati esistenti non verranno sovrascritti.';
    return [];
  }
}

function saveTasks(message) {
  if (storageAvailable) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      notice.textContent = message;
      return;
    } catch {
      storageAvailable = false;
    }
  }
  notice.textContent = 'Salvataggio non disponibile. Le modifiche restano solo in questa pagina e andranno perse alla chiusura.';
}

function render(focusId) {
  const todo = document.querySelector('#todo-list');
  const done = document.querySelector('#done-list');
  todo.replaceChildren();
  done.replaceChildren();
  let doneCount = 0;

  for (const task of tasks) {
    const row = document.createElement('li');
    row.className = task.done ? 'task completed' : 'task';
    const label = document.createElement('label');
    label.className = 'task-label';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.setAttribute('aria-label', `${task.done ? 'Riporta da fare' : 'Segna come fatta'}: ${task.text}`);
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      saveTasks(task.done ? 'Task completata. Un pensiero in meno!' : 'Task riportata tra le cose da fare.');
      render(task.id);
    });
    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;
    label.append(checkbox, text);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'delete-button';
    remove.textContent = '×';
    remove.title = 'Elimina task';
    remove.setAttribute('aria-label', `Elimina: ${task.text}`);
    remove.addEventListener('click', () => {
      tasks = tasks.filter(item => item.id !== task.id);
      saveTasks('Task eliminata.');
      render();
      input.focus();
    });
    row.append(label, remove);
    (task.done ? done : todo).append(row);
    if (task.done) doneCount++;
    if (task.id === focusId) checkbox.focus();
  }

  document.querySelector('#todo-count').textContent = tasks.length - doneCount;
  document.querySelector('#done-count').textContent = doneCount;
  document.querySelector('#todo-empty').hidden = tasks.length !== doneCount;
  document.querySelector('#done-empty').hidden = doneCount !== 0;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    input.setCustomValidity('Scrivi qualcosa da fare.');
    input.reportValidity();
    return;
  }
  tasks.push({ id: crypto.randomUUID(), text, done: false });
  saveTasks('Task aggiunta.');
  input.value = '';
  render();
  input.focus();
});
input.addEventListener('input', () => input.setCustomValidity(''));
render();
