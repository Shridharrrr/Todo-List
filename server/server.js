const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/db")
const Todo = require("./models/todoModel")

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", async(req,res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post("/", async(req,res) => {
    const newTodo =  new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
});

app.put("/:id", async(req,res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(updatedTodo);
})

app.delete("/:id", async(req,res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({message : "Todo deleted"});
})

app.listen(8080, ()=>{
    console.log("Server running on port 8080")
})