var path = require("path")
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');
//var College = require('./models/college');
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost:27017/WEBSHIZ');
const viewsPath = path.join(__dirname+"/views")
var app = express();
app.set('view engine','html');
app.set('views',viewsPath)
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"/views")))
app.engine('html', require('ejs').__express);
app.use(bodyParser.urlencoded({ 
    extended: true
})); 

app.use(require('express-session')({
    secret : 'WT',
    saveUninitialized : true,
    duration : 30 * 60 * 1000,
    activeDuration : 5 * 60 * 1000,
    httpOnly : true,
    secure : true,
    ephemeral : true,
    resave : false,
    cookie : {maxAge : 60000}
}));


app.get('/',function(req, res){
    res.render('./home/index.html');
})

app.get('/student',function(req,res){
    res.render('./Student/index.html')
})

app.get('/viewClg', function(req,res){
    res.render('./Student/StuClg.html')
});
app.get('/login',function(req,res){
    res.render('student_login.html');
});

app.get('/signup',function(req,res){
    res.render('signup.html');
});

app.get('/error',function(req,res){
    res.render('error.html');
});
app.get('/admin',function(req,res){
    res.render('admin_login.html');
})



app.post('/login', function(req, res){
    console.log(req.body);
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var address = req.body.address;
    var email = req.body.email;
    var password = req.body.check_password;
    var marks = req.body.marks;
    var area_code = req.body.area_code;
    var phone = req.body.phone;
    var gender = req.body.exist;
    console.log(email)
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("WEBSHIZ");
        var query = { email: email };
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
    
    if(result==''){
        var newUser = {first_name : first_name, last_name : last_name, address : address, email : email, password : password, marks : marks, area_code : area_code, phone : phone, gender : gender };
        User.create(newUser, function(err, newUSer){
            if(err){
                console.log(err);
                res.redirect('/error');
            }else{
                console.log(newUSer);
                res.redirect('/login');
            }              

        })
    }
    if(result != ''){

        res.render('wait',{validate: "user already exists"});
    }
    
    });
 });
});

app.get('/wait',function(req,res){
    res.render('wait.html');
});

app.post('/wait',function(req,res){
    console.log(req.body);
    var address = req.body.address;
    var email = req.body.email;
    var password = req.body.pass;
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("WEBSHIZ");
        var query = { email: email, password: password };
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            if(result==''){
                res.render('wait',{validate:'Invalid username or password'});                
            }
            else{
                res.render('./Student/index',{result: result});
            }
        });
    });
})

app.listen(8000,function(req,res){
    console.log('Server is listening!');
})