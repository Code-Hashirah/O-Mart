// importing libraries 
const express = require('express');
const sequelize=require('./database/db');
const path = require('path');
const app=express();
const User=require('./models/user')
const authRoute=require('./routes/authRoute')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}));


// Page middleware
app.use(authRoute);
// Listen to port 
sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log('Connected to port 3001')
    })
})