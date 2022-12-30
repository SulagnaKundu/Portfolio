const validator = require("validator");
const express = require("express");
const dotenv = require('dotenv');
const connectDB = require("./config/connectDB");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT||8080;
const mongoose = require('mongoose');
/*mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/portfoliodb").then(()=>{
    console.log("Connection is successful");
}).catch(()=>{
    console.log("connection is not successful");
})*/

//middlewares
app.use('/static' , express.static('static'));
app.use(express.urlencoded({extended:false}));

//pug specific stuff
//Set the template engine as pug.
app.set('view engine' , 'pug');


//End points
app.get("/",(req,res)=>{
    res.render('home.pug');
});
app.get("/home.pug",(req,res)=>{
    res.render('home.pug');
});
app.get("/pp.pug",(req,res)=>{
    res.render('pp.pug');
});
app.get("/contact.pug",(req,res)=>{
    res.render('contact.pug');
});
app.get("/about.pug",(req,res)=>{
    res.render('about.pug');
});
app.get("/skills.pug",(req,res)=>{
    res.render('skills.pug');
});

//Define mongoose Schema
const portfolioSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    message:{
        type:String,
        required:true
    }
});
const portfolio =  mongoose.model("users",portfolioSchema);
app.post('/contact.pug',(req,res)=>{
        var mydata = new portfolio(req.body);
        mydata.save().then(()=>{
            /*res.send("Item has been saved to the database");*/
            res.render('Thanks.pug');
            //console.log(mydata);
        }).catch(()=>{
            res.send("Item not saved");
        })
});
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})