const toDoList = [];

const form = document.querySelector('form');
const search = document.querySelector('#search');
const input = document.querySelector('#add');
const ul = document.querySelector('ul');
let tasksNumber = document.querySelector('h1 span');
const listItems = document.querySelectorAll('li.task');

const renderList = function() {
    ul.textContent = '';
    toDoList.forEach((toDoElement, index) => {
        toDoElement.dataset.key = index;
        ul.appendChild(toDoElement);
    });
};

const removeTask = function(e) {
    const index = e.target.parentNode.dataset.key;
    toDoList.splice(index, 1);
    tasksNumber.textContent--;
    search.value = '';
    renderList();
};

const addTask = function(e) {
    e.preventDefault();
    const titleTask = input.value;
    if (!titleTask == '') {
        const newTask = document.createElement('li');
        newTask.className = 'task';
        tasksNumber.textContent++;
        newTask.innerHTML = titleTask + '<button>Usuń</button>';

        toDoList.push(newTask);
        renderList();

        ul.appendChild(newTask);
        input.value = '';
        search.value = '';
        newTask.querySelector('button').addEventListener('click', removeTask);
    };
};

const searchTasks = function(e) {
    const searchText = e.target.value.toLowerCase();
    let tasks = [...toDoList];
    tasks = tasks.filter(li => li.textContent.toLowerCase().includes(searchText));

    ul.textContent = '';
    tasks.forEach(li => ul.appendChild(li));
};

search.addEventListener('input', searchTasks);
form.addEventListener('submit', addTask);