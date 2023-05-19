import express from "express";
import { v4 } from "uuid";

const router = express.Router();

let todos = [];

router.get("/todo", (req, res, next) => {
    res.render("pages/todo", { todos })
})

router.post("/todo", (req, res, next) => {
    const { title } = req.body;
    const newTodo = {
        id: v4(),
        title, 
        completed: false
    }

    todos.push(newTodo);
    res.redirect("/todo");
});

router.post("/todo/:id", (req, res, next) => {
    const { id } = req.params;
    todos = todos.filter((todo) => todo.id !== id);
    res.redirect("/todo");
});

router.post("/todo/:id/update", (req, res, next) => {
    const { id } = req.params;

    todos = todos.map((todo) => {
        if(todo.id == id){
            return { ...todo, completed: !todo.completed }
        }
        return todo;
    }) 

    console.log(todos);
    res.redirect("/todo");
});
export default router;