let taskManager = (function () {
    let tasks = [];

    function addTask(task) {
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks)); //stores tasks in localStorage
        displayTasks(); //call to update the list when a new task is added
    }

    function displayTasks() {
        let taskList = document.getElementById("taskList"); //gets the unordered list element
        taskList.innerHTML = ""; //clear the existing list

        for (let i = 0; i < tasks.length; i++) {
            let taskItem = document.createElement("li"); //creates a new list item element
            taskItem.textContent = tasks[i]; //sets the text content to the task
            taskItem.addEventListener("click", function () { //click event listener to remove task when clicked
                tasks.splice(i, 1); //removes the task from the tasks array
                displayTasks(); //call to update the list after task is removed
                localStorage.setItem('tasks', JSON.stringify(tasks)); //stores updated tasks array in local storage

            });
            taskList.appendChild(taskItem); //appends the list item to the unordered list
            console.log(taskItem.textContent);
        }
    }

    //loads tasks from local storage if available
    let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = storedTasks;
    displayTasks(); //displays tasks from local storage

    return {
        addTask: addTask,
        displayTasks: displayTasks
    };
})();

//input and button elements
let inputTask = document.getElementById("inputTask");
let addButton = document.getElementById("addButton");

//event listener to the add button
addButton.addEventListener("click", function () {
    let newTask = inputTask.value; //gets the value of the input box
    if (newTask !== "") { //adds task only if input is not empty
        taskManager.addTask(newTask); //calls addTask with the new task
        inputTask.value = ""; //clears the input box
    }
});
