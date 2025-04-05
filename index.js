const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/logindatabase", {
autoIndex: true,
useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('Database Connection Error :', error));
db.once('open', () => console.log('connected to database'));

app.post("/createUser", (req, res) => {
    console.log("Received data:", req.body);
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});
app.listen(3001, () => {
    console.log("Server is Running")
})
