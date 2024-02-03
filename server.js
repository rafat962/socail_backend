const express = require('express')
const mongoose = require('mongoose')
const app = require('./app')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });




mongoose.connect(process.env.DB).then(() => console.log('DB connection successfully'));

PORT = 3000 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
