import express from "express";

const router = express.Router();

router.get("/todo", (req, res, next) => {
    let todos = [
        {
            id: 1,
            title: "First Todo",
            completed: false
        },
        {
            id: 2,
            title: "Second Todo",
            completed: false
        },
        {
            id: 3,
            title: "Third Todo",
            completed: false
        }
    ];

    res.render("pages/todo", { todos })
})

export default router;