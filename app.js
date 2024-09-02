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


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});