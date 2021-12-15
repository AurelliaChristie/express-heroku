// Import packages
const express = require("express");
const Sequelize = require("sequelize");
const {DataTypes} = require("sequelize");
const dotenv = require("dotenv");

// Import model
const {tbl_todo_lists} = require('./models/index');
// Cara 2 : const TODO_MODEL = require('./models).tbl_todo_lists

// Initialize app
const app = express();

// Add middleware
app.use(express.json());

// Add routes
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Todolist API</h1>")
})

app.get('/todos', (req, res) => {
    tbl_todo_lists.findAll().then(result => {
        res.json({
            message: "OK",
            data: [result]
        })
    }).catch(error => res.send(error))
})

app.get('/todos/:todoId', (req, res) => {
    tbl_todo_lists.findOne({
        where: {
            id: req.params.todoId
        }
    }).then(result => {
        res.json({
            message: "OK",
            data: [result]
        })
    }).catch(error => res.send(error))
})

app.post('/todos', async(req, res) => {
    const body = req.body;
    const todo = {
        name_todo: body['name_todo'],
        desc_todo: body['desc_todo']
    }

    try{
        await tbl_todo_lists.create(todo)
        res.status(201).send({
            message: "The data has been created.",
            data: todo
        })
    } catch(error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.patch('/todos/:todoId', async(req, res) => {
    const body = req.body;
    const todo = {
        name_todo: body['name_todo'],
        desc_todo: body['desc_todo']
    }

    try{
        await tbl_todo_lists.update(todo, {
            where: {
                id: req.params.todoId
            }
        })
        res.status(201).send({
            message: "The data has been updated.",
            data: todo
        })
    } catch(error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.delete('/todos/:todoId', async(req, res) => {
    try{
        await tbl_todo_lists.destroy({
            where: {
                id: req.params.todoId
            }
        })
        res.status(201).send({
            message: "The data has been deleted."
        })
    } catch(error) {
        res.status(500).send({
            message: error.message
        })
    }
})

// Start server
const port = process.env.PORT || 3000
app.listen(port, (req, res) => {
    console.log(`Listening to port ${port}.`)
})