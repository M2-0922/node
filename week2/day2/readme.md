### Registration

1. Collect user credentials (username, password):

```javascript
const bcrypt = require('bcrypt');

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Your code to handle user registration

  //Hash and store the password securely:
  const hashedPassword = await bcrypt.hash(password, 10);

  // Your code to store the hashed password
  // Your code for additional validation (e.g., email verification)
});
```

### Login

1. Verify the provided credentials:

```javascript
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Your code to verify the credentials
});
```

2. Create a session or issue an authentication token:

```js
const jwt = require("jsonwebtoken");

// Inside the login route
const user = { id: userId, username: username };
const token = jwt.sign(user, "yourSecretKey", { expiresIn: "1h" });

// Your code to handle the authentication token
```

### Access Control

1. Protect routes or resources with authentication middleware:

```javascript
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, 'yourSecretKey', (err, user) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    req.user = user;
    next();
  });
};

// Apply the middleware to protected routes
app.get('/protected', authenticateUser, (req, res) => {
  // Your code for protected route logic
});

2.Check if the user is authenticated before granting access:

// Inside the protected route
if (req.user) {
  // User is authenticated, proceed with the logic
} else {
  res.status(401).send('Unauthorized');
}

3.Implement role-based or permission-based access control to restrict certain actions:

// Inside the protected route
if (req.user.role === 'admin') {
  // Only allow admin actions
} else {
  res.status(403).send('Forbidden');
}
```

Remember to customize the code according to your specific requirements and security considerations. Make sure to replace 'yourSecretKey' with a strong secret key for JWT.

These examples demonstrate the usage of token-based authentication (JWT) and cover the common authentication scenarios you mentioned. Please adapt the code as per your project's structure and needs.
