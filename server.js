const express = require('express');
const http = require('http');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const {authRoutes, userRoutes} = require('./routes');
const auth = require("./middleware/auth")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(function (req, res, next) {
    console.log("Body: ", req.body);
    next()
})

// Configuration

server.listen(process.env.PORT || 8000, () => {
    console.log(`[ server.js ] Listening on port ${server.address().port}`);
});

app.use('/web_api/api/v1/users', auth, userRoutes);
app.use('/web_api/api/v1/auth', authRoutes);

app.get('/web_api/', (req, res) => {
    res.send(`<h1>Welcome, ${process.env.APP_NAME}!</h1>`);
});

io.on('connection', (socket) => {
    console.log(`[ server.js ] ${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`[ server.js ] ${socket.id} disconnected`);
    });
});