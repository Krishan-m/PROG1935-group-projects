// Group members:
// - Dharma Witt
// - Esteban 
// - Krishan Singh
// - Sameer
// - Sahil Mansibhai
// - Ryjo Kollely Mathew

// imports
const express = require('express');
const {check, validationResult} = require('express-validator');
const path = require('path');
const mongoose = require('mongoose');
const { log } = require('console');

const app = express();

// Connecting to mongodb instance
mongoose.connect("mongodb://localhost:27017/EducationTemp")

// MongoDB model
const signupDetail = mongoose.model("signupInfo", {
    username: String,
    email: String,
    password: String,
    confirmPassword: String
});

app.set("views", path.join(__dirname, "views"));
app.use(express.static("public")); // specify where all the css and js files are
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));

app.get('/', function(req, res){
    res.render('main');
});

app.get('/courses', function(req, res){
    res.render('courses');
});

app.get('/blog', function(req, res){
    res.render('blog');
});

app.get('/shop', function(req, res){
    res.render('shop');
});

app.get('/signup', function(req, res){
    res.render('signup');
});

// Taking values from form - Esteban
app.post("/signupForm",[
    check("username", "Username is required").notEmpty(),
    check("email", "Email is invalid!").isEmail(),
    check("password", "Password is not strong").isLength({min: 6}),
    check("confirmPassword", "Confirmed password is not same").custom((value, {req})=>{
        return value === req.body.password;
    })
],  function(req, res){
    const errors = validationResult(req);
    if (errors.isEmpty()){
        console.log(req.body);
        let mongoooseDbObj = new signupDetail({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }); // creates the instance of the mongodb model defined above
        mongoooseDbObj.save().then(()=>{
            console.log("Signup information saved!");
            res.render('thanks');
        });
    }
    else {
        res.render("error", {errors: errors.array()})
        console.log(errors);
    }
})

let port = 4200;
app.listen(`${port}`);
console.log(`Listening at http://localhost:${port}/`);
