const express = require('express');
const app = express();
app.use(express.json());

let users = [];

app.post('/users', (req, res) => {
     const { name, email } = req.body;
     if (!name || !email) {
         return res.status(400).json({ error: "Name and email are required" });
     }
     const newUser = { id: users.length + 1, name, email };
     users.push(newUser);
     res.status(201).json({ message: "User added", success: true });
 });
 
 // Route to get all users
 app.get('/users', (req, res) => {
     res.status(200).json({ message: "Users retrieved", success: true, users: users });
 });

 app.put('/users/:id', (req, res) => {
     const userId = parseInt(req.params.id);
     const { name, email } = req.body;
     const userIndex = users.findIndex(user => user.id === userId);
     if (userIndex === -1) {
         return res.status(404).json({ error: "User not found" });
     }
 
     // Update user details
     users[userIndex].name = name;
     users[userIndex].email = email;
 
     res.status(200).json({ message: "User updated", success: true });
 });

 app.get('/users/:id', (req, res) => {
     const userId = parseInt(req.params.id); // Convert URL parameter to integer
 
     // Find the user by ID
     const user = users.find(user => user.id === userId);
     if (!user) {
         return res.status(404).json({ error: "User not found" });
     }
 
     res.status(200).json({ message: "User retrieved", success: true, user: user });
 });
 

 module.exports = app;