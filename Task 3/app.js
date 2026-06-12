document.addEventListener('DOMContentLoaded', () => {
    // 1. State Management
    // Initialize state from localStorage or default to an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';

    // 2. DOM Elements
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filters = document.getElementById('filters');

    // 3. Core Functions
    function saveAndRender() {
        // Persist to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Update the UI
        renderTasks();
    }

    // CREATE
    function addTask(text) {
        const newTask = {
            id: Date.now().toString(), // Simple unique ID
            text: text.trim(),
            completed: false
        };
        tasks.push(newTask);
        saveAndRender();
    }

    // UPDATE (Toggle Completion)
    function toggleTask(id) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveAndRender();
    }

    // UPDATE (Edit Text)
    function editTask(id, newText) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, text: newText } : task
        );
        saveAndRender();
    }

    // DELETE
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveAndRender();
    }

    // READ (Render to DOM)
    function renderTasks() {
        todoList.innerHTML = ''; // Clear current list
        
        // Apply Filters
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }

        // Generate DOM Elements
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task complete">
                <span class="task-text">${task.text}</span>
                <button class="btn-icon btn-edit" aria-label="Edit task">✏️</button>
                <button class="btn-icon btn-delete" aria-label="Delete task">🗑️</button>
            `;
            todoList.appendChild(li);
        });
    }

    // 4. Event Listeners

    // Form Submission (Add Task)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value.trim() !== '') {
            addTask(input.value);
            input.value = ''; // Reset input
        }
    });

    // EVENT DELEGATION: Listen to the parent UL for clicks on dynamic children
    todoList.addEventListener('click', (e) => {
        const item = e.target.closest('.todo-item');
        if (!item) return;
        
        const taskId = item.dataset.id;

        // Handle Checkbox Click
        if (e.target.classList.contains('task-checkbox')) {
            toggleTask(taskId);
        }

        // Handle Delete Click
        if (e.target.classList.contains('btn-delete') || e.target.closest('.btn-delete')) {
            deleteTask(taskId);
        }

        // Handle Edit Click
        if (e.target.classList.contains('btn-edit') || e.target.closest('.btn-edit')) {
            const span = item.querySelector('.task-text');
            const currentText = span.textContent;
            
            // Replace span with an input field
            span.outerHTML = `<input type="text" class="edit-input" value="${currentText}">`;
            const editInput = item.querySelector('.edit-input');
            editInput.focus();

            // Save on blur (clicking outside) or pressing Enter
            const saveEdit = () => {
                if (editInput.value.trim() !== '') {
                    editTask(taskId, editInput.value);
                } else {
                    renderTasks(); // Revert if empty
                }
            };

            editInput.addEventListener('blur', saveEdit);
            editInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') saveEdit();
            });
        }
    });

    // Filter Buttons
    filters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Update active styling
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update state and render
            currentFilter = e.target.dataset.filter;
            renderTasks();
        }
    });

    // Initial load
    renderTasks();
});