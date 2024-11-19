const express = require('express');
const dotenv = require('dotenv');
// const indexRoutes = require('./routes/v1/index');
const userRoutes = require('./routes/v1/userRoutes');
const wasteCategoryRoutes = require('./routes/v1/wasteCategoryRoutes');
const wasteRecordRoutes = require('./routes/v1/wasteRecordRoutes.js');
const departementRoutes = require('./routes/v1/departementRoutes');
const authRoutes = require('./routes/v1/authRoutes');
const swaggerDocs = require('./docs/swagger');

dotenv.config();
const app = express();

app.use(express.json());
// app.use('/', indexRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/waste-categories', wasteCategoryRoutes);
app.use('/api/v1/waste-records', wasteRecordRoutes);
app.use('/api/v1/departements', departementRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1/uploads', express.static('uploads'));
swaggerDocs(app);

module.exports = app;