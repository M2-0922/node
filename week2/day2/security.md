# Security - Encryption & Hashing (JWT & Bcrypt)

it is crucial to understand these concepts to ensure the protection of sensitive data in your applications. We will explore two popular techniques: JSON Web Tokens (JWT) for encryption and Bcrypt for hashing.

## Encryption with JSON Web Tokens (JWT)

Encryption is the process of converting data into a secure format that can only be accessed with a decryption key. JSON Web Tokens (JWT) is a widely-used method for securely transmitting information between parties as a JSON object. It consists of three parts: a header, a payload, and a signature.

The header contains information about the type of token and the algorithm used for encryption. The payload contains the claims or statements about the entity (user, application, etc.) and additional data. The signature is created using the header, payload, and a secret key, ensuring the integrity of the token.

jsonwebtoken includes signing and verification methods for generating and verifying JWTs also while signing the token we can set the expiration time for the token. Not only that we can also set the payload for the token.

To work with JWT in a Node.js application, you can use the `jsonwebtoken` library. Install it by running the following command:

```bash
npm install jsonwebtoken
```

Here's an example of how you can use JWT for user authentication in an Express.js application:

```javascript
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const secretKey = "your_secret_key";

// Endpoint for user login
app.post("/login", (req, res) => {
  // Check user credentials and generate a token
  const user = {
    id: 1,
    username: "john_doe",
    role: "admin",
  };

  jwt.sign(user, secretKey, (err, token) => {
    if (err) {
      res.status(500).json({ error: "Failed to generate token." });
    } else {
      res.json({ token });
    }
  });
});

// Protected route
app.get("/dashboard", verifyToken, (req, res) => {
  // Authorized users can access this route
  res.json({ message: "Welcome to the dashboard!" });
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (typeof token !== "undefined") {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(403).json({ error: "Invalid token." });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized." });
  }
}

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
```

In the example above, the `/login` endpoint generates a JWT upon successful authentication, and the `/dashboard` route is protected using the `verifyToken` middleware. The `verifyToken` function verifies the token and attaches the decoded user information to the `req` object for further processing.

Remember to store the `secretKey` securely, preferably in an environment variable.

## Hashing with Bcrypt (https://www.npmjs.com/package/bcrypt)

Hashing is the process of converting data into a fixed-length string of characters using a mathematical algorithm. Unlike encryption, hashing is a one-way process, meaning the original data cannot be derived from the hash.

Bcrypt is a popular library for hashing passwords securely. It incorporates a salt, which adds a random value to the password before hashing, making it more resistant to rainbow table attacks. Bcrypt also includes a work factor (cost factor), allowing you to adjust the computational cost required to calculate the hash, making it slower and more secure against brute-force attacks.

To use Bcrypt in a Node.js application, install the `bcrypt` library:

```bash
npm install bcrypt
```

Here's an example of how you can use Bcrypt to hash and verify passwords:

```javascript
const bcrypt = require("bcrypt");

const password = "my_password";

// Hashing a password
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed password:", hash);

    // Verifying a password
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
      } else {
        console.log("Password match:", result);
      }
    });
  }
});
```

In the example above, we use `bcrypt.hash` to generate a hash of the password. The second argument, `10`, represents the cost factor or the number of rounds the hashing algorithm will be executed. Higher values increase the time required to hash the password, making it more secure.

To verify a password, we use `bcrypt.compare` to compare the entered password with the stored hash. The `result` variable will be `true` if the passwords match.

Also you can use genSalt to generate a salt and then use it to hash the password. Salt is a random string that is added to the password before hashing. This makes the hash more secure and resistant to rainbow table attacks.

```javascript
const bcrypt = require("bcrypt");

const password = "my_password";

// Generating a salt
bcrypt.genSalt(10, (err, salt) => {
  if (err) {
    console.error("Error generating salt:", err);
  } else {
    // Hashing a password
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
      } else {
        console.log("Hashed password:", hash);

        // Verifying a password
        bcrypt.compare(password, hash, (err, result) => {
          if (err) {
            console.error("Error comparing passwords:", err);
          } else {
            console.log("Password match:", result);
          }
        });
      }
    });
  }
});
```


## Tips for Becoming a Better Developer in the Market

1. **Continuous Learning**: Stay updated with the latest trends, frameworks, and libraries in the field of full-stack development. Regularly invest time in learning new technologies to enhance your skill set.

2. **Code Review and Collaboration**: Engage in code reviews with your peers or colleagues. Embrace feedback and suggestions to improve the quality of your code. Collaborate on projects with other developers to learn from their experiences and share your knowledge.

3. **Best Practices**: Follow best practices for code organization, documentation, and version control. Write clean, maintainable, and modular code. Utilize design patterns and adhere to industry standards to make your code more readable and understandable for others.

4. **Problem-Solving**: Develop your problem-solving skills by tackling coding challenges and participating in programming contests. Practice breaking down complex problems into smaller, manageable tasks. Improve your algorithmic and data structure knowledge to optimize code efficiency.

5. **Communication and Soft Skills**: Effective communication is vital for working in a team or interacting with clients. Enhance your written and verbal communication skills. Develop strong interpersonal skills and empathy to collaborate effectively with colleagues and clients.

6. **Building Projects**: Build real-world projects to showcase your skills and create a portfolio. It helps you demonstrate your expertise and allows you to gain hands-on experience in various technologies.

7. **Open Source Contributions**: Contribute to open source projects to expand your network and gain recognition in the developer community. It provides opportunities to collaborate with experienced developers and learn from their expertise.

Remember, becoming a better developer requires consistent effort, a growth mindset, and a passion for learning. Stay curious and embrace challenges as they come. Happy coding!
