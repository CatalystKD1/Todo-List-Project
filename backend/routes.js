const express = require('express'); // Import express JS framework
const connection = require('./db'); // import are database
const router = express.Router(); // create an express router for API routes

// req = request
// res = response

// define different HTTP routes for CRUD to use (router.get router.post, router.put, router.delete)

// Retrieves tasks from mySQL
router.get('/todos', (req /* reads data that is sent by the client*/ , res /*Converts Javascript objects into JSON data*/) => {
    connection.query("SELECT * FROM todos", (err, results) => { // gets tasks from MySQL
        if (err) return res.status(500).json({ error: err.message });
        res.json(results); // returns the task list as a JSON
    });
});


// Add a new Task
router.post('/todos', (req,res) => {
    const { task } = req.body;

    // runs a SQL code to insert data into the database
    connection.query("INSERT INTO todos (task) VALUES (?)", [task], (err, result) => {

        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, task, completed: false });
    });
});

// Update a task (mark as complete)
router.put('/todos/:id', (req, res) => {
    const { id } = req.params; // Get Ids from the URL

    console.log("Received PUT request for ID:", id);  // Debugging

    if (!id) { // if an ID is not in the database (for some reason, a delete without a true delete)
        console.error("Task ID is missing!");
        return res.status(400).json({ error: "Task ID is required" });
    }

    connection.query(
        "UPDATE todos SET completed = NOT completed WHERE id = ?", // changes a task to COMPLETE when toggles
        [id],
        (err, result) => {
            if (err) {
                console.error("MySQL UPDATE error:", err);
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Task not found" });
            }
            res.json({ message: "Task updated successfully" });
        }
    );
});


// Delete a task
router.delete('/todos/:id', (req, res) => {
    const { id } = req.params; // get Id, same as update

    console.log("Received DELETE request for ID:", id);

    if (!id) {
        return res.status(400).json({ error: "Task ID is required" });
    }

    connection.query("DELETE FROM todos WHERE id = ?", [id], (err, result) => { // delete the element in the database with matching ID
        if (err) {
            console.error("MySQL DELETE error:", err);
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    });
});


// export this as a module to use in script.js
module.exports = router;