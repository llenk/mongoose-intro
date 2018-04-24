const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 5000;

const Book = require('./models/book.schema');

//CONNECTING TO MONGO START
const databaseUrl = 'mongodb://localhost:27017/library';
mongoose.connect(databaseUrl);

mongoose.connection.on('connected', () => {
    console.log(`mongoose connected to ${databaseUrl}`);
});
mongoose.connection.on('error', (error) => {
    console.log('mongoose connection error', error);
});
//CONNECTING TO MONGO END

app.get('/book', (req, res) => {
    Book.find({})
        .then((dataFromDatabase) => {
            console.log('data from database', dataFromDatabase);
            res.send(dataFromDatabase);
        })
        .catch((error) => {
            console.log('error with Book.find', error);
            res.send(500);
        });
});

app.listen(PORT, () => {
    console.log(`Up and listening on port ${PORT}`);
});