// Save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Display a task in the list
  function displayTask(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = task.name;
  
    if (task.status === 'Completed') {
      li.classList.add('completed');
    }
  
    const taskButtons = document.createElement('div');
    taskButtons.classList.add('task-buttons');
  
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.classList.add('task-button', 'complete-button');
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('task-button', 'delete-button'); 
    
    deleteButton.onclick = () => deleteTaskCondition(task); 
  
    taskButtons.appendChild(completeButton);
    taskButtons.appendChild(deleteButton);
  
    li.appendChild(taskButtons);
    taskList.appendChild(li);
  }
  
  // Add a new task
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
  
    if (taskName === '') {
      alert('Please enter a valid task!');
      return;
    } else {
      // Task object
      const task = {
        name: taskName,
        status: 'Pending'
      };
  
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      saveTasks(tasks);
  
      displayTask(task);
      taskInput.value = ''; 
    }
  }
  
  
  function completeTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(t => t.name === task.name);
  
    if (taskIndex > -1) {
      tasks[taskIndex].status = 'Completed';
      saveTasks(tasks);
      location.reload(); 
    }
  }
  
  
  function deleteTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(t => t.name === task.name);
  
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1); 
      saveTasks(tasks);
      location.reload(); 
    }
  }
  
  
  function deleteTaskCondition(task) {
   
    const isConfirmed = confirm('Are you sure you want to delete this task?');
  
    if (isConfirmed) {
      deleteTask(task); 
    }
   
  }
  
  
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      displayTask(task);
    });
  }
  

  window.onload = loadTasks;
  