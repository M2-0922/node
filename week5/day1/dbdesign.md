Here are two examples of database schemas for different scenarios using SQL in Node.js with Node Express:

## Example 1: E-commerce Application

**users Table**
- id (INT, Primary Key)
- name (VARCHAR)
- email (VARCHAR)
- password (VARCHAR)

**products Table**
- id (INT, Primary Key)
- name (VARCHAR)
- price (DECIMAL)
- description (TEXT)

**orders Table**
- id (INT, Primary Key)
- user_id (INT, Foreign Key referencing users table)
- product_id (INT, Foreign Key referencing products table)
- quantity (INT)
- total_amount (DECIMAL)

In this example, we have three tables: `users`, `products`, and `orders`. The `users` table stores user information, the `products` table stores product information, and the `orders` table represents the orders placed by users, with references to the `users` and `products` tables.

## Example 2: Blogging Platform

**users Table**
- id (INT, Primary Key)
- username (VARCHAR)
- email (VARCHAR)
- password (VARCHAR)

**posts Table**
- id (INT, Primary Key)
- title (VARCHAR)
- content (TEXT)
- user_id (INT, Foreign Key referencing users table)
- created_at (DATETIME)

**comments Table**
- id (INT, Primary Key)
- post_id (INT, Foreign Key referencing posts table)
- user_id (INT, Foreign Key referencing users table)
- content (TEXT)
- created_at (DATETIME)

In this example, we have three tables: `users`, `posts`, and `comments`. The `users` table stores user information, the `posts` table represents blog posts written by users, and the `comments` table stores comments made on blog posts, with references to the `posts` and `users` tables.

These examples provide a starting point for designing the database schema for specific applications. The actual schema may vary depending on the requirements and additional entities or relationships needed.

Remember, a well-designed database schema is essential for organizing and managing data effectively, ensuring data integrity, and optimizing query performance.

---

Here's how you can create the tables described in the previous examples using MySQL, PostgreSQL, Redis, and MongoDB.

### Creating Tables in MySQL

To create the tables in MySQL, you can use the SQL `CREATE TABLE` statements. Here's an example for the e-commerce application:

```sql
-- users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- products Table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT
);

-- orders Table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT,
  total_amount DECIMAL(10, 2),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Creating Tables in PostgreSQL

To create the tables in PostgreSQL, you can also use the SQL `CREATE TABLE` statements. Here's an example for the e-commerce application:

```sql
-- users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- products Table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT
);

-- orders Table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  product_id INT NOT NULL REFERENCES products(id),
  quantity INT,
  total_amount DECIMAL(10, 2)
);
```

### Creating Data Structures in Redis

Redis is a key-value store and does not have tables like traditional SQL databases. Instead, you can use Redis data structures to store and organize your data. Here's an example for the e-commerce application:

```
# Hash for users
HMSET users:1 name "John Doe" email "johndoe@example.com" password "password123"

# Hash for products
HMSET products:1 name "Product 1" price 19.99 description "Description 1"
HMSET products:2 name "Product 2" price 29.99 description "Description 2"

# List for orders
LPUSH orders:user_id:1 product_id:1 quantity:2 total_amount:39.98
```

In Redis, we can use hashes to store user and product data, and lists to represent orders. Each user and product has a unique identifier (`1` and `2` in this example). The orders are stored as items in a list, with the details stored as key-value pairs.

### Creating Collections in MongoDB

In MongoDB, you can create collections to store your data. Here's an example for the e-commerce application:

```javascript
// Users collection
db.createCollection("users");
db.users.insertOne({
  name: "John Doe",
  email: "johndoe@example.com",
  password: "password123"
});

// Products collection
db.createCollection("products");
db.products.insertOne({
  name: "Product 1",
  price: 19.99,
  description: "Description 1"
});
db.products.insertOne({
  name: "Product 2",
  price: 29.99,
  description: "Description 2"
});

// Orders collection
db.createCollection("orders");
db.orders.insertOne({
  user_id:

 ObjectId("user_id_here"),
  product_id: ObjectId("product_id_here"),
  quantity: 2,
  total_amount: 39.98
});
```

In MongoDB, we use the `db.createCollection()` method to create collections and the `db.collection.insertOne()` method to insert documents into the collections. The user and product data are stored as documents in their respective collections, and the orders reference the user and product documents using their unique identifiers (`user_id_here` and `product_id_here` in this example).

These examples demonstrate how to create tables in MySQL and PostgreSQL, and how to create data structures in Redis and collections in MongoDB. Remember to adapt the code to match your specific database configurations and requirements.