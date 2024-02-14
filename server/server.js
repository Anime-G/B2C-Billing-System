const db = require('./models');
const express = require('express');
const cors = require('cors');
const app=express();
const port=5000;
app.use(cors());
app.use(express.json());
//initialize routes
const Users=require("./Routers/Users");

//add to server
app.use('/Users',Users)

db.sequelize.sync().then(()=>{
    app.listen(5000,()=>console.log("server: ",port))
})