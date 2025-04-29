// C:\Users\Shira - Tevetwater\Downloads\work\GraphQL\mock-backend\server.js
const express = require('express');
const app = express();
const port = 3000; // Port for the mock REST backend

// Minimal hardcoded data
const data = {
    users: [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
    ],
    products: [
        { id: 'p1', name: 'Laptop' },
        { id: 'p2', name: 'Mouse' },
    ]
};

// Middleware to enable CORS - essential for client/gateway access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET'); // We only need GET for this PoC
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// --- Define REST Endpoints ---

// Get all users
app.get('/users', (req, res) => {
    console.log('Mock Backend: GET /users called');
    res.json(data.users);
});

// Get a user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    console.log(`Mock Backend: GET /users/${userId} called`);
    const user = data.users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Get all products
app.get('/products', (req, res) => {
    console.log('Mock Backend: GET /products called');
    res.json(data.products);
});

// *** MISSING ENDPOINT ADDED HERE ***
// Get a product by ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    console.log(`Mock Backend: GET /products/${productId} called`);
    const product = data.products.find(p => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});
// *** END ADDED SECTION ***


// --- Start the server ---
app.listen(port, () => {
    console.log(`Mock REST backend listening at http://localhost:${port}`);
});