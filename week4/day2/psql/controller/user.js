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
        pool.query("SELECT * FROM users WHERE id = $1", [id], (err, result) => {
            if(err) {
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

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
  
    try {
      const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
      const values = [name, email, id];
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
  
      res.json({
        message: 'User updated!',
        user: result.rows[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Server error',
      });
    }
  };
  
  const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
  
      res.json({
        message: 'User deleted!',
        user: result.rows[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Server error',
      });
    }
  };

export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}