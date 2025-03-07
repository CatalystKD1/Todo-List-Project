# Todo-List-Project

This is a Project made using Node.js, MySQL, HTML, CSS and JavaScript to create a database that will help me orginize myself with a digital todo list.

## Description

In this was a project to learn Node.js and work on my skills with SQL. It is a database project that stores different tasks. Users can add tasks, remove tasks and toggle tasks as completed!

### Dependencies

This Project requires you to have downloaded [Node.js](https://nodejs.org/en/download) and [MySQL](https://www.mysql.com/downloads/).
Make sure that you have a MySQL account as it will be necessary to access databases

### Installing

* Download the Project folder to your local device or network
* Run MySQL and create a new database into the MySQL Command Line, then run these commands:
```
CREATE DATABASE todo_db;

USE todo_db;

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false
);
```
* Go to the .env file found in the backend directory and change the necessary information so that the server can connect to your MySQL account and access the correct database
  
![image](https://github.com/user-attachments/assets/7d12e6c7-bc8e-4650-8daa-a8e6e47cac54)


### Executing program

* To run the program, in a terminal of your choice, go to the Project directory, then go into the backend directory and
```
node server.js
```
* Then, while the server is running, navigate to the frontend directory and run the index.html file in your local browser
* Now you will be able to orginize your task is a nice todo list like I do!

![image](https://github.com/user-attachments/assets/727e5c30-225e-4f13-be05-b7ee4f9ab20f)


