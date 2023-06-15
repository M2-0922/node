# https://redis.io/
# https://redis.io/docs/

# Redis in Node.js: Efficient Caching and Data Storage with Node Express

## Introduction to Redis

Redis is an open-source, in-memory data structure store that can be used as a cache, database, or message broker. It provides fast and efficient data storage and retrieval by keeping the data in-memory, making it ideal for use cases that require high-speed data access. Redis supports various data structures, such as strings, lists, sets, hashes, and more, offering flexibility in storing and manipulating data.

## Integrating Redis with Node.js

When it comes to integrating Redis with Node.js, developers can use the **ioredis** library. **ioredis** is a robust Redis client for Node.js that provides a simple and intuitive API for interacting with Redis servers. It offers features like connection pooling, Pub/Sub messaging, transactions, and Lua scripting.

## Example: Using Node Express with Redis

Let's explore an example of using Redis in a Node.js application built with the Express framework.

### Step 1: Setting Up the Project

Begin by setting up a new Node.js project and installing the necessary dependencies. Open your terminal and run the following commands:

```bash
mkdir node-express-redis
cd node-express-redis
npm init -y
npm install express ioredis
```

### Step 2: Establishing a Connection to Redis

Create a new file called `db.js` and add the following code to establish a connection to the Redis server:

```javascript
const Redis = require('ioredis');

const redis = new Redis({
  host: 'localhost',
  port: 6379, // default Redis port
});

module.exports = redis;
```

### Step 3: Creating an Express API Endpoint with Redis Caching

Now, let's create an Express API endpoint that demonstrates the usage of Redis for caching. In your main file (e.g., `index.js`), add the following code:

```javascript
const express = require('express');
const redis = require('./db');

const app = express();
const port = 3000;

// Middleware to check Redis cache
const checkCache = async (req, res, next) => {
  const { key } = req.params;
  const cachedData = await redis.get(key);
  
  if (cachedData) {
    res.json({ data: cachedData });
  } else {
    next();
  }
};

// Route with Redis caching
app.get('/data/:key', checkCache, async (req, res) => {
  const { key } = req.params;
  const data = await fetchDataFromDatabase(key);
  
  if (data) {
    await redis.set(key, data);
    res.json({ data });
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
});

// Function to simulate fetching data from a database
const fetchDataFromDatabase = async (key) => {
  // Simulated asynchronous database query
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data for key '${key}'`);
    }, 2000);
  });
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

In this example, we define an API endpoint `/data/:key` that fetches data from a database. The `checkCache` middleware checks if the requested data is already cached in Redis. If the data is found in the cache, it is immediately returned. Otherwise, the request continues to the route handler, where the data is fetched from the database. After retrieving the data, it is stored in Redis with the provided `key`.

### Step 4: Testing the API Endpoint

To test the

 API endpoint, start the server by running `node index.js` in the terminal. Then, open your browser or use a tool like Postman and make a GET request to `http://localhost:3000/data/:key`, where `:key` is a unique identifier for the data you want to fetch. On the first request, the data will be fetched from the database, and subsequent requests with the same key will retrieve the cached data from Redis.

## Additional Examples and Use Cases

### Example 1: Counting Page Views

You can use Redis to count and track the number of page views for your website. Here's an example:

```javascript
app.get('/page/:id', async (req, res) => {
  const { id } = req.params;
  const pageKey = `page:${id}`;
  
  // Increment the page view count in Redis
  await redis.incr(pageKey);
  
  const views = await redis.get(pageKey);
  res.json({ pageId: id, views });
});
```

In this example, every time the `/page/:id` endpoint is accessed, Redis increments the view count for that page in Redis. Subsequent requests will fetch the updated view count.

### Example 2: Storing User Sessions

Redis is often used for session storage due to its in-memory nature and fast access times. Here's a simplified example:

```javascript
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Authenticate user and generate a session token
  const sessionToken = await authenticateUser(username, password);
  
  if (sessionToken) {
    // Store the session token in Redis with an expiration time
    await redis.set(`session:${sessionToken}`, username, 'EX', 3600); // Expire in 1 hour
    
    res.json({ message: 'Login successful', sessionToken });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
```

In this example, after authenticating the user, a session token is generated. The session token is then stored in Redis with an expiration time, creating a user session that can be used for subsequent authenticated requests.

## Conclusion

In this comprehensive guide, we explored the integration of Redis with Node.js using the **ioredis** library and demonstrated building a simple API with Node Express. By establishing connections, utilizing Redis for caching and data storage, developers can create efficient and scalable applications that leverage the power of Redis for faster data access.

Remember, Redis acts as a versatile data store, capable of serving as a cache, database, or message broker. When combined with Node.js and Express, it provides seamless integration and enhances the performance and functionality of your applications. With Redis and Node.js, developers can build high-speed, data-driven applications that deliver an exceptional user experience.

---

# Redis and Redis CLI Installation and Basic Command Guide on MacOS

**Part 1: Installation**

**Step 1: Install Homebrew**

If you haven't installed Homebrew, do it by using the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

**Step 2: Install Redis**

Once you have Homebrew installed, you can install Redis:

```bash
brew install redis
```

**Step 3: Start Redis Server**

Start the Redis server with this command:

```bash
redis-server /usr/local/etc/redis.conf
# /opt/homebrew/Cellar/redis/7.0.11
```

**Step 4: Run Redis on System Startup**

If you want Redis to boot at startup:

```bash
ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents
```

Then load Redis:

```bash
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

**Part 2: Using Redis CLI and Basic Commands**

The Redis CLI, redis-cli, is the command line interface to interact with Redis server.

**Step 1: Start Redis CLI**

To start Redis CLI:

```bash
redis-cli
```

This should connect to the server and give you the redis command line prompt.

**Step 2: Test Connection**

Once in the Redis CLI, you can check if the connection is working:

```bash
ping
```

If the server is reachable and functioning, it will return "PONG".

**Step 3: Check Hostname and Port**

By default, Redis server runs on localhost (127.0.0.1) and port 6379. To check these settings, you can use:

```bash
redis-cli
```

Once in the CLI:

```bash
config get bind
config get port
```

**Step 4: Set Password**

To set a password, you'll need to edit the Redis configuration file:

```bash
nano /usr/local/etc/redis.conf
```

Find the line that starts with `# requirepass`, remove the `#`, and after `requirepass`, add your desired password:

```bash
requirepass yourpassword
```

Save and exit the file. Then, restart Redis:

```bash
brew services restart redis
```

**Step 5: Use Password**

Now, when you want to connect to the server, you'll need to provide the password:

```bash
redis-cli -a yourpassword
```

**Part 3: Basic Redis Commands**

Here are the commands I've provided in the previous guide. The usage of these commands remains the same irrespective of the OS.

**Part 4: Exiting Redis CLI**

To exit Redis CLI:

```bash
exit
```

This is just the very basics of Redis. Redis has many more commands and functionalities like Hashes, Sets, Sorted sets, Transactions, and more. You can find a complete list of commands in the [Redis documentation](https://redis.io/commands).