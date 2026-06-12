// --- DOM Elements ---
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filtersContainer = document.getElementById('filters');

// --- State Management ---
// Initialize state from localStorage or default to an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all'; 

// --- Core Functions ---

// 1. Save to LocalStorage and trigger a re-render
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// 2. Render tasks to the DOM based on current state and filter
function renderTasks() {
    // Clear current DOM list
    taskList.innerHTML = '';

    // Apply filtering logic
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    // Create and append DOM elements for each task
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.dataset.id = task.id; // Store ID for event delegation

        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="toggle-btn" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn">Delete</button>
        `;
        
        taskList.appendChild(li);
    });
}

// --- Event Listeners ---

// Create: Add a new task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    
    if (text) {
        const newTask = {
            id: Date.now().toString(), // Unique ID based on timestamp
            text: text,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        saveAndRender();
    }
});

// Update & Delete: Event Delegation on the parent <ul>
taskList.addEventListener('click', (e) => {
    // Find the closest parent <li> to get the task ID
    const li = e.target.closest('li');
    if (!li) return;
    
    const taskId = li.dataset.id;

    // Handle Toggle (Update)
    if (e.target.classList.contains('toggle-btn')) {
        const task = tasks.find(t => t.id === taskId);
        task.completed = !task.completed;
        saveAndRender();
    }
    
    // Handle Delete
    if (e.target.classList.contains('delete-btn')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveAndRender();
    }
});

// Filtering logic
filtersContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        // Update active class for styling
        document.querySelectorAll('#filters button').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update state and re-render
        currentFilter = e.target.dataset.filter;
        renderTasks();
    }
});

// --- Initial Render ---
renderTasks();
