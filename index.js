// Imports

require('dotenv').config()

const express = require('express');

const mongoose = require('mongoose');

const app = express();

if (process.env.INTERNAL_CORS == "true") {
    var cors = require('cors')
    app.use(cors())
}

// Files

const routers = require('./routes/routers');
const upload = require('./routes/upload')(app);
const retrieve = require('./routes/retrieve')(app);
const deletion = require('./routes/delete')(app);

// Routers

app.use('/upload', routers.uploadRouter);
app.use('/files', routers.filesRouter);
app.use('/delete', routers.deleteRouter)

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

// Redirect to home

app.get('/', async function (req, res) {
    res.redirect('https://lightspeed.blue');
});

// Listen on port

app.listen(process.env.WEBSERVER_PORT, process.env.WEBSERVER_HOST, () => {
    console.log(`Server is listening on port ${
        process.env.WEBSERVER_PORT
    }`);
});