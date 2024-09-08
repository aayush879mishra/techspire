const express = require('express');
const app=express();

const dotenv=require ('dotenv');
dotenv.config();

const port = process.env.PORT || 9000;

const connectDB = require('./src/config/db');
app.use(express.json());
connectDB();

// Use the admin routes
const adminRoutes = require("./src/routes/adminRoutes");
app.use('/api/admin', adminRoutes);
 
// Use the service routes
const serviceRoutes = require("./src/routes/serviceRoutes");
app.use('/api/admin', serviceRoutes);

// Use the project routes
const projectRoutes = require("./src/routes/projectRoutes");
app.use('/api/admin', projectRoutes);

// Use the career routes
const careerRoutes = require("./src/routes/careerRoutes");
app.use('/api/admin', careerRoutes);

// Use the contact routes
const contactRoutes = require("./src/routes/contactRoutes");
app.use('/api/admin', contactRoutes);

// Use the gallery routes
const galleryRoutes = require('./src/routes/galleryRoutes');
app.use('/api/admin', galleryRoutes);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});