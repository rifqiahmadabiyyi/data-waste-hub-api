const express = require('express');
const dotenv = require('dotenv');
// const indexRoutes = require('./routes/v1/index');
const userRoutes = require('./routes/v1/userRoutes');

dotenv.config();
const app = express();

app.use(express.json());
// app.use('/', indexRoutes);
app.use('/api/v1/users', userRoutes);

module.exports = app;