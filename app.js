const express = require('express');
const dotenv = require('dotenv');
// const indexRoutes = require('./routes/v1/index');
const userRoutes = require('./routes/v1/userRoutes');
const wasteCategoryRoutes = require('./routes/v1/wasteCategoryRoutes');

dotenv.config();
const app = express();

app.use(express.json());
// app.use('/', indexRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/waste-categories', wasteCategoryRoutes);

module.exports = app;