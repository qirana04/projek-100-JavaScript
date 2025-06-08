const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const emptyMsg = document.getElementById('empty');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    if(tasks.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    }

emptyMsg.style.display = 'none';
          tasks.forEach((task, i) => {
            const taskE1 = document.createElement('div');
            taskE1.className = `py-3 px-2 flex items-center ${task.done ? 'opacity-60' : '' }`;
            taskE1.innerHTML = `
                <input type="checkbox" ${task.done ? 'checkbox' : ''} class="mr-3 h-s w-s">
                <span class="flex-1 ${task.done ? 'line-through' : ''}">${task.text}</span>
                <button data-idx="${i}" class="text-red-400 hover:text-red-600">x</button>
             `;
             taskList.appendChild(taskE1);
             taskE1.querySelector('input').addEventListener('change', () => toggleDone(i));
             taskE1.querySelector('button').addEventListener('click', () => deleteTask(i));
          });
      }

      function addTask() {
          const text = taskInput.value.trim();
          if(!text) return;
          tasks.push({
              text,
              done: false,
              date: new Date().toLocaleString()
          });
          taskInput.value = '';
          saveTasks();
          renderTasks();
      }

      function toggleDone(i) {
          tasks[i].done = !tasks[i].done;
          saveTasks();
          renderTasks();
      }

      function deleteTask(i) {
          tasks.splice(i, 1);
          saveTasks();
          renderTasks();
      }

      function saveTasks() {
          localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      addBtn.addEventListener('click', addTask);
      taskInput.addEventListener('keypress', e => e.key === 'Enter' && addTask());

      renderTasks();