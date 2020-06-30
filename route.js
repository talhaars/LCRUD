const express =require('express');
const bodyParser=require('body-parser');
const  mongoose = require('mongoose');
const path=require('path');
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
const port=3000;
app.use('/static',express.static('public'));
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
// app.get("/r/:subredditName/:id",function(req,res){
// var subre=req.params.subredditName;
// var idd=Number(req.params.id) ;
// result="";
// for(var i=0;i<idd;i++)result+=subre;
// res.send(result);
// });
var uuser={
    name:"",
    email:"",
    password:"",
    phno:0
}

app.get('/',function(req,res){
   // res.sendFile(__dirname+"/forms/login.html"); 
   res.render("login.ejs"); 
});
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
           res.render("login.ejs");
        }else{
            res.render("login.ejs");
        }
       
    })
    
    
})

app.post("/",function(req,res){
    
var chk;
    chk = {
        username: req.body.name,
        password: req.body.password,
    };

        

    User.findOne(chk,function(err,users){
        if(err){
            res.send("try again!");
        }
        if(users){
            uuser.name= users.username;
            uuser.email=users.email;
            uuser.password=users.password;
            uuser.phno=users.phno;
            res.render("home.ejs");
        }else{
            res.send("user is not registered!");
        }
        
    })
        
})

// app.post("/next.html",function(req,res){

// })


app.get("/signup.html",function(req,res){
    res.render("signup.ejs");
})
app.get("/update.html",function(req,res){
    res.render("update.ejs",{useer:uuser});
})
app.get("/updated",function(req,res){
    usernam= req.body.name;
    emai= req.body.email;
    passwor= req.body.password;
    phn=req.body.phno;

console.log(req.body.name);
    User.updateOne({username:uuser.name,password:uuser.password},{username:usernam,password:passwor,email:emai,phno:phn},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("updated")
        }
        res.render("login.ejs");
    })
})

app.get("/delete.html",function(req,res){
var chk = {
        username: uuser.name,
        password: uuser.password
    };
    User.deleteOne(chk,function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("deleted");
        }
        res.render("signup.ejs");
    })


    
})
app.get("/updated",function(req,res){
    res.send("account updated");
})


app.listen(port);

