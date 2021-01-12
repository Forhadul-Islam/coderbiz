const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const db = require('./db/db');
const port = process.env.PORT || 5000;

const authRouter = require('./routes/authRouter')

const app = express();
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/v1/users', authRouter)

app.listen(port, ()=>console.log("listening to the port "+ port))