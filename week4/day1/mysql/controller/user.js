import db from "../config/db.js"

const getUsers = async (req, res, next) => {
    db.query("SELECT * FROM users", (error, results) => {
        if(error) {
            console.error(error);
            res.status(500).json({
                error: "Error occurred!"
            })
            return;
        }

        res.json({
            results
        })
    })
};

const getUserById = async (req, res, next) => {
    const { id } = req.params;

    console.log(id);

    db.query(`SELECT * FROM users WHERE id = ${id}`, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({
                error: "Error occurred!"
            })
            return;
        }

        res.json({
            result
        })
    })
}

const createUser = async (req, res, next) => {
    const data = req.body;

    db.query("INSERT INTO users SET ?", data, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({
                error: "Error occurred!"
            })
            return;
        }

        res.json({
            result
        })
    })
}

const updateUser = async(req, res, next) => {
    const { id } = req.params;
    let data = req.body;

    db.query(`UPDATE users SET ? WHERE id = ${id}`, [data, id], (err) => {
        if(err) {
            console.log(err);
            res.status(500).json({
                error: "Error occurred!"
            })
            return;
        }

        res.json({
            message: "user updated successfully!"
        })
    })
}

const deleteUser = async(req, res, next) => {
    const { id } = req.params;

    db.query(`DELETE FROM users WHERE id = ${id}`, (err) => {
        if(err) {
            console.log(err);
            res.status(500).json({
                error: "Error occurred!"
            })
            return;
        }

        res.json({
            message: "user deleted successfully!"
        })
    })
}

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}