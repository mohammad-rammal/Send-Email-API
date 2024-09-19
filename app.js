require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const sendEmailRoute = require('./routes/sendEmail');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');

app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('<h1>Email Project</h1><a href="/api/v1/email">Send Email </a>');
});

app.use('/api/v1/email', sendEmailRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(port, () => console.log(`Server is running on port ${port}...➡️‍`));
    } catch (error) {
        console.log(error);
    }
};

start();
