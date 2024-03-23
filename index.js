// imports
const express = require('express');
const {check, validationResult} = require('express-validator');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Connecting to mongodb instance
mongoose.connect("mongodb://localhost:27017/EducationTemp")

// MongoDB model
const signupDetail = mongoose.model("signupInfo", {
    username: String,
    password: String
});

app.set("views", path.join(__dirname, "views"));
app.use(express.static("public")); // specify where all the css and js files are
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));

app.get('/', function(req, res){
    res.render('main');
});

app.get('/courses', function(req, res){
    res.send('courses');
});

app.get('/blog', function(req, res){
    res.send('blog');
});

app.get('/shop', function(req, res){
    res.send('shop');
});

app.get('/signup', function(req, res){
    res.send('shop');
});

// Taking values from form - Esteban
app.post("/signupForm",[
    check("username", "Username is required").notEmpty(),
    check("userpassword", "Password is not strong").isLength({min: 6}),
    check("userpasswordconfirm", "Password is not same").custom(value=>{
        return value === req.body.userpassword;
    })
],  function(req, res){
    const errors = validationResult(req);
    if (errors.isEmpty()){
        let username = req.body.username;
        let userpassword = req.body.userpassword;

        let dbObj = {
            username: username,
            useremail: userpassword,
        }

        let mongoooseDbObj = new signupDetail(dbObj); // creates the instance of the mongodb model defined above
        mongoooseDbObj.save().then(()=>{
            console.log("Signup information saved!");
        });
    }
    else {
        // res.render("contact", {errors: errors.array()})
    }
    console.log(errors);
})

app.listen('4200');
console.log("Port listening at 4200");