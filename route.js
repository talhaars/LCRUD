const express =require('express');
const bodyParser=require('body-parser');
const  mongoose = require('mongoose');
const path=require('path');
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
const port=3000;
app.use('/ststic',express.static('public'));
//app.use(express.static(path.join(__dirname,"css")));
mongoose.connect("mongodb://localhost:27017/accounts", {useNewUrlParser: true, useUnifiedTopology: true});

const accountSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phno:Number
});

const User = mongoose.model('User', accountSchema);

app.get('/',function(req,res){
    res.sendFile(__dirname+"/forms/login.html");  
})
app.get('/login.html',function(req,res){
    
    const user = new User(
        {
            username: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phno:req.body.phno
        }
    );
    user.save(function (err) {
        if (err) {
           // return next(err);
           res.sendFile(__dirname+"/forms/login.html");
        }else{
            res.sendFile(__dirname+"/forms/login.html");
        }
       
    })
    
    
})

app.post("/",function(req,res){
    var name=req.body.name;
    var emaill=req.body.email;
    var passwor=req.body.password;
var chk;
    chk = {
        username: name,
        password: passwor
    };
    User.findOne(chk,function(err,users){
        if(err){
            res.send("try again!");
        }
        if(users){
            res.sendFile(__dirname+"/forms/next.html");
        }else{
            res.send("user is not registered!");
        }
        
    })
        
})

// app.post("/next.html",function(req,res){

// })


app.get("/signup.html",function(req,res){
    res.sendFile(__dirname+"/forms/signup.html");
})
app.get("/update.html",function(req,res){
    res.sendFile(__dirname+"/forms/update.html");
})
app.get("/delete.html",function(req,res){
    res.sendFile(__dirname+"/forms/delete.html");
})
app.get("/updated",function(req,res){
    res.send("account updated");
})


app.listen(port);

