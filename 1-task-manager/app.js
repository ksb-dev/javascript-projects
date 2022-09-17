// Define UI Variables

const form = document.querySelector('#task-form')
const taskInput = document.querySelector('#task')
const addTaskBtn = document.querySelector('.addBtn')
const filterInput = document.querySelector('#filter')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')

const editBox = document.querySelector('.box-3')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit')
const editBtn = document.querySelector('.editBtn')
const cancelBtn = document.querySelector('.cancelBtn')

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

    // Create span element
    const spanElement = document.createElement('span')
    spanElement.className = 'edit-delete'

    // --------------

    // Create edit link
    const editLink = document.createElement('a')
    // Add Class
    editLink.className = 'edit-item'
    // Add Icon
    editLink.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'

    // Append edit link to span element
    spanElement.appendChild(editLink)

    // --------------

    // Create delete link
    const deleteLink = document.createElement('a')
    // Add Class
    deleteLink.className = 'delete-item'
    // Add Icon
    deleteLink.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

    // Append delete link to span element
    spanElement.appendChild(deleteLink)

    // --------------

    // Append span to li element
    li.appendChild(spanElement)

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
    return
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

  // Create span element
  const spanElement = document.createElement('span')
  spanElement.className = 'edit-delete'

  // --------------

  // Create edit link
  const editLink = document.createElement('a')
  // Add Class
  editLink.className = 'edit-item'
  // Add Icon
  editLink.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'

  // Append edit link to span element
  spanElement.appendChild(editLink)

  // --------------

  // Create delete link
  const deleteLink = document.createElement('a')
  // Add Class
  deleteLink.className = 'delete-item'
  // Add Icon
  deleteLink.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

  // Append delete link to span element
  spanElement.appendChild(deleteLink)

  // --------------

  // Append span to li element
  li.appendChild(spanElement)

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
      e.target.parentElement.parentElement.parentElement.remove()

      // 7. Remove tasks from Local Storage
      removeTasksFromLocalStorage(
        e.target.parentElement.parentElement.parentElement
      )
    }
  }
}

// 9. Update Task (Using Event Delegation)

taskList.addEventListener('click', editTask)

function editTask (e) {
  if (e.target.parentElement.classList.contains('edit-item')) {
    editBox.classList.add('show')

    editInput.value =
      e.target.parentElement.parentElement.parentElement.textContent
    // if (confirm('Are you sure?')) {
    //   e.target.parentElement.parentElement.remove()

    //   // 7. Remove tasks from Local Storage
    //   //removeTasksFromLocalStorage(e.target.parentElement.parentElement)
    // }
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
      task.style.display = 'flex'
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

// Buttons
cancelBtn.addEventListener('click', function (e) {
  e.preventDefault()

  editBox.classList.remove('show')
})
