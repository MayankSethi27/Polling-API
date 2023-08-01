require('dotenv').config();


const Port=process.env.PORT  || 8000
const express=require('express')
const bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
const connectWithDb=require('./config/mongoose');

//database connected
connectWithDb();
// Routes
app.use('/',require('./routes/index'));
   
app.listen(process.env.PORT||8000 ,function(err){
    if(err){
        console.log(err);
    }
    console.log(`Server is running on port ${Port}`);
})