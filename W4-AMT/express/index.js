const express = require('express');

const app = express();

const routeDfiner = [
    ['/user', require('./routes/userRoutes')],
]

for (const route of routeDfiner){
    app.use(route[0], route[0])
}

module.exports = app;
