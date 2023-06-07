import User from "../model/User.js";

const getAllUsers = async (req, res) => {
    try {
        let users = await User.findAll();

        res.json({
            users
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

const createUser = async (req, res) => {
    const { id, name, email } = req.body;

    try {
        const user = await User.create({ id, name, email });
        console.log(user);

        res.json({
            message: "user created!"
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

const updateUser = async (req, res) => {
    // logic of update
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        let user = await User.update({ name: name, email: email }, { where: { id }})

        res.json({
            message: `user, id: ${id} is updated`,
            user
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
    
}

const deleteUser = async ( req, res ) => {
    const { id } = req.params;
    // logic of delete
    try {
        let user = await User.destroy({ where: { id }});

        res.json({
            message: `user, id: ${id} is deleted`,
            user
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

export { getAllUsers, createUser, updateUser, deleteUser }