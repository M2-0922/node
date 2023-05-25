import fs from "fs";
import User from "../model/User.js";
import { hashPassword, comparePassword } from "../util/passwordUtil.js";
import { generateToken } from "../util/jwtUtil.js";

const registerController = (req, res) => {
  try {
    const { username, email, password } = req.body; // destructuring the object of req.body

    // reading the users.json file and parsing as JSON
    const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));

    // checking if the email already exists from the users.json file
    if (usersData.find((user) => user.email === email)) {
      return res.status(400).json({
        message: "Email already exists!",
      });
    }

    // creating hashed version of my password before saving the user
    const hashedPassword = hashPassword(password);

    hashedPassword.then((password) => {
      // creating a new user object using User class/blueprint
      const newUser = new User(username, email, password);

      // pushing the new user object to the userData array
      usersData.push(newUser);

      // writing the userData array to the users.json file
      fs.writeFileSync("users.json", JSON.stringify(usersData));

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

const loginController = (req, res) => {
  try {
    const { email, password } = req.body; //destructuring the object of req.body

    const usersData = JSON.parse(fs.readFileSync("users.json", "utf-8"));

    const user = usersData.find((user) => user.email === email);

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
