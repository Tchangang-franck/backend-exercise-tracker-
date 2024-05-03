const express = require("express");
const cors =require("cors");
const mongoose= require("mongoose");
require('dotenv').config();
const app= express();

app.use(cors());

//middleware pour parse le corps de la requette en json 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const uri=process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const connection=mongoose.connection;
    connection.once('open',()=>{
        console.log("MongoDB database connection established successfully");
    })

const exerciseRouter=require('./Routes/exercise');
const userRouter=require('./Routes/user');

app.use('/exercises',exerciseRouter);
app.use('/users',userRouter);



//demarrer le serveur 
const port =process.env.PORT || 5000;
app.listen(port,()=>{
    console.log( `le serveur a demarrer sur le port : ${port}`);
});

 