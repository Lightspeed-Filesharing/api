// Imports

require('dotenv').config()

const express = require('express');

const mongoose = require('mongoose');

const app = express();

// const minify = require('express-minify');
// app.use(minify());

// Files

const routers = require('./routes/routers');
const upload = require('./routes/upload')(app);
const retrieve = require('./routes/retrieve')(app);

app.use('/upload', routers.uploadRouter);
app.use('/files', routers.filesRouter);

// Connect to database
mongoose.connect(`mongodb://${
    process.env.DB_HOST
}:${
    process.env.DB_PORT
}/${
    process.env.DB_NAME
}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB.");
});

app.get('/', async function (req, res) {
    res.redirect('https://horizon.pics');
});

// Listen on port

app.listen(process.env.WEBSERVER_PORT, process.env.WEBSERVER_HOST, () => {
    console.log(`Server is listening on port ${
        process.env.WEBSERVER_PORT
    }`);
});