require('dotenv').config();
const cors = require('cors');
const http = require('http');
const {setupWebSocket} = require('./websocket');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes.js');

mongoose.connect('mongodb+srv://nelson-devaround:devaround-nelson@cluster0-4s8mb.mongodb.net/devaround?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

const server = http.Server(app);

setupWebSocket(server);

app.use(cors())

app.use(express.json());

app.use(routes);

server.listen(3333);