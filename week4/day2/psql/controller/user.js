import pool from "../config/db.js"

const createUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
            if (error) {
                console.log(error);
                // throw error;
                res.status(404).json({
                    message: "Email is already registered!"
                })
            }
            res.json({
                message: "user created!"
            })
        });
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

const getUsers = (req, res) => {
    try {
        pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
            if (error) {
                throw error;
            }
            // console.log(results);
            res.json({
                users: results.rows
            })
        });
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
}

const getUserById = (req, res) => {
    const { id } = req.params;

    try {
        pool.query("SELECT * FROM users WHERE id = $1", [id], (error, result) => {
            if (error) {
                throw err;
            }

            res.json({
                user: result.rows
            })
        })
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
}

// TODO: write update and delete controllers

const updataUserById = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        pool.query(
            "UPDATA users SET id = $1, name = $2, email = $3",
            [updataUserById.name, updataUserById.email],
            (error, result) => {
            if (error) {
                throw err;
            }
            res.json({
                user: result.rows
            })
        })
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
}

const deleteUserById = (req, res) => {
    const { id } = req.params;

    try {
        pool.query("DELETE FROM users WHERE id = $1", [deleteUserById], (error, result) => {
            if (error) {
                throw error;
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
}

export {
    createUser,
    getUsers,
    getUserById,
    updataUserById,
    deleteUserById
}