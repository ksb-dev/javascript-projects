// Define UI Variables

const form = document.querySelector('#task-form')
const taskInput = document.querySelector('#task')
const addTaskBtn = document.querySelector('.add-task')
const filterInput = document.querySelector('#filter')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')

// 6. On document load get tasks from Local Storage
document.addEventListener('DOMContentLoaded', getTasks)

function getTasks () {
  let tasks

  if (localStorage.getItem('storedTasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('storedTasks'))
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li')
    // Add Class
    li.className = 'collection-item'
    // Create text node
    const textNode = document.createTextNode(task)

    // Append textNode to li element
    li.appendChild(textNode)

    // --------------

    // Create link element
    const deleteLink = document.createElement('a')
    // Add Class
    deleteLink.className = 'delete-item secondary-content'
    // Add Icon
    deleteLink.innerHTML = '<i class="fa fa-remove"><i>'

    // Append deleteLink to li element
    li.appendChild(deleteLink)

    // ---------------

    // Append li element to taskList
    taskList.appendChild(li)
  })
}

// -----------------------------------------------------------------

// 1. Add Task

form.addEventListener('submit', addTask)

function addTask (e) {
  e.preventDefault()

  if (taskInput.value === '') {
    alert('Please Enter Task')
  }

  // Create li element
  const li = document.createElement('li')
  // Add Class
  li.className = 'collection-item'
  // Create text node
  const textNode = document.createTextNode(taskInput.value)

  // Append textNode to li element
  li.appendChild(textNode)

  // --------------

  // Create link element
  const deleteLink = document.createElement('a')
  // Add Class
  deleteLink.className = 'delete-item secondary-content'
  // Add Icon
  deleteLink.innerHTML = '<i class="fa fa-remove"><i>'

  // Append deleteLink to li element
  li.appendChild(deleteLink)

  // ---------------

  // Append li element to taskList
  taskList.appendChild(li)

  // 5. Store in Local Storage
  storeTaskInLocalStorage(taskInput.value)

  // Clear Input
  taskInput.value = ''
}

// -----------------------------------------------------------------

// 2. Remove Task (Using Event Delegation)

taskList.addEventListener('click', removeTask)

function removeTask (e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove()

      // 7. Remove tasks from Local Storage
      removeTasksFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// -----------------------------------------------------------------

// 3. Clear tasks

clearBtn.addEventListener('click', clearTasks)

function clearTasks () {
  // taskList.innerHTML = ''

  // Faster Way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  // 8. Clear tasks from Local Storage
  clearTasksFromLocalStorage()
}

// -----------------------------------------------------------------

// 4. Filter Tasks

filterInput.addEventListener('keyup', filterTasks)

function filterTasks (e) {
  const typedText = e.target.value.toLowerCase()

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent

    if (item.toLowerCase().indexOf(typedText) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}

// -----------------------------------------------------------------

// 5. Store in Local Storage

function storeTaskInLocalStorage (task) {
  let tasks

  if (localStorage.getItem('storedTasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('storedTasks'))
  }

  tasks.push(task)

  localStorage.setItem('storedTasks', JSON.stringify(tasks))
}

// -----------------------------------------------------------------

// 7. Remove tasks from Local Storage

function removeTasksFromLocalStorage (taskToBeDelete) {
  let tasks

  if (localStorage.getItem('storedTasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('storedTasks'))
  }

  tasks.forEach(function (task, index) {
    if (taskToBeDelete.textContent === task) {
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('storedTasks', JSON.stringify(tasks))
}

// -----------------------------------------------------------------

// 8. Clear tasks from Local Storage

function clearTasksFromLocalStorage () {
  localStorage.clear()
}
