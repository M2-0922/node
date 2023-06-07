// import fs from "fs";
// import User from "../model/User.js";
import User from "../model/User.js";
import { hashPassword, comparePassword } from "../util/passwordUtil.js";
import { generateToken } from "../util/jwtUtil.js";

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body; // destructuring the object of req.body

    // finding the user with the same email in mongoDB
    let user = await User.findOne({ email: email });

    if(user){
      return res.status(400).json({
        message: "Email already exists!",
      });
    }

    // creating hashed version of my password before saving the user
    const hashedPassword = hashPassword(password);

    hashedPassword.then((hashedPassword) => {

      // creating a new user object
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      // saving the user to the database
      newUser.save();

      // sending the response to the client if everything is okay.
      res.status(201).json({
        message: "User created successfully!",
        user: {
          username: newUser.username,
          email: newUser.email,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body; //destructuring the object of req.body

    // finding the user with the same email in mongoDB
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password!",
      });
    }

    const compareResult = comparePassword(password, user.password);

    compareResult.then((compared) => {
      if (!compared) {
        return res.status(401).json({
          message: "Invalid email or password!",
        });
      }

      const token = generateToken({
        username: user.username,
        email: user.email,
      });

      res.status(200).json({
        message: "Login successful!",
        token,
        user: {
          username: user.username,
          email: user.email,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

export { registerController, loginController };
