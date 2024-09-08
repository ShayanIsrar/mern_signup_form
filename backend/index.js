const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth.router');
const router = require('./routes/product.router');

require('dotenv').config();
require('./models/db');
const PORT = process.env.PORT || 8080;

// CORS Configuration
const allowedOrigins = ['https://mern-signup-form-4aww.vercel.app']; // Frontend URL

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.get('/ping', (req, res) => {
    res.send('This is the Ping Page for you...');
});

app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/products', router);

app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
});
