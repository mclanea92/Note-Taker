
// added express from npm
const express = require('express');
const fs = require('fs');
const app = express();

// port for server and for 3001 localhost server
const PORT = process.env.PORT || 3001;

const apiRoute = require('./routes/api');
const htmlRoute = require('./routes/html');

app.use(express.urlencoded({ extended: true}));

app.use(express.json());

app.use(express.static('public'));

app.use('/api', apiRoute);

app.use('/', htmlRoute);

app.listen(PORT, () => {
    console.log(`${PORT} is the current server`)
});