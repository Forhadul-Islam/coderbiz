const express = require('express');
require('dotenv').config();
const db = require('./db/db');
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))



app.listen(port, ()=>console.log("listening to the port "+ port))