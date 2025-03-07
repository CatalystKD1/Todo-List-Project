// This is the URL to the backend server
// the front end (this script) will communicate with this url (server) to make requests with the backend
const API_URL = "http://localhost:5000/api/todos";

// Displays the tasks, if there are no taks then the li table will no display
// this is called whenever something is doene: Adding and element, deleting and updating
async function fetchTasks() {
    const response = await fetch(API_URL); // fetches data from the backend and waits a response
    const tasks = await response.json(); // takes a json file and turns it into an array

    document.getElementById('taskList').innerHTML = tasks.map(task => //.map will look through the tasks given by the json file
        `<li>
            <span>${task.task} ${task.completed ? "✔" : ""}</span>
            <div class="button-group">
                <button onclick="toggleTask(${task.id})">Toggle</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </li>`
    ).join("");
}

// Add tasks to the the list
async function addTask() {
    const taskInput = document.getElementById("taskInput"); // retrieves tasks from the input in the HTML document

    // the input is empty
    if (!taskInput) {
        // Do nothing and send message to the server
        console.error("taskInput element not found!");
        return;
    }
    
    // get the task and removes any extra space bars (after the final word)
    const task = taskInput.value.trim();
    if (!task) { // if the trim is empty, then they just entered space bars
        alert("Please enter a task!");
        return;
    }

    // Communicates to the backend
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // this connects to the backend with json
        body: JSON.stringify({ task })
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to add task");
        }

        return response.json();

    }).then(() => {
        // element is added to the back end

        taskInput.value = ""; // Clear input field
        fetchTasks(); // Refresh list / update the html page

    }).catch(error => console.error("Error:", error)); // if an error is thrown go here
}

// Toggle task will mark a task as complete or not
async function toggleTask(id) {
    // PUT toggles the completion status in the Backend / SQL
    await fetch(`${API_URL}/${id}`, { method: "PUT" });
    fetchTasks();
}

// Remove a task from the list
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" }); // json file formate to remove the data
    fetchTasks();
}

// explicite call to print data when script is run
fetchTasks();