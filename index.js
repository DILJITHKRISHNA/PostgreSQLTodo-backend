const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors({
    origin: 'https://xerotodo-rosy.vercel.app',
    methods: ['GET','POST','PUT', 'PATCH'],
    credentials: true
}))
app.use(express.json()) //req.body

//ROUTES

//create a todo

app.post('/todos', async (req, res) => {
    try {
        const description = req.body
        console.log(description.display);
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description.display]
        );
        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})
//get all todo

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos)
    } catch (error) {
        console.error(error.message)
    }
})

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo)
    } catch (error) {
        console.error(error.message)
    }
})

//update a todo

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { Description } = req.body
        const updateTodo = await pool.query(`UPDATE todo SET description = $1 WHERE todo_id = $2`, [Description, id])
        res.json({success:true, updateTodo, message:"Todo was updated"})
    } catch (error) {
        console.error(error.message)
    }
})

//delete a todo

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json({success:true, deleteTodo, message: "Todo was deleted"})
    } catch (error) {
        console.error(error.message)
    }
})

let port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})