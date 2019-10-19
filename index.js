var path = require("path")
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');
var College = require('./models/college');
var passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');

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

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
// app.use(require('express-session')({
//     secret : 'WT',
//     saveUninitialized : true,
//     duration : 30 * 60 * 1000,
//     activeDuration : 5 * 60 * 1000,
//     httpOnly : true,
//     secure : true,
//     ephemeral : true,
//     resave : false,
//     cookie : {maxAge : 60000}
// }));
var sess; 
var sessmarks = 86;

app.get('/',function(req, res){
    res.render('./home/index.html');
})


app.get('/student',function(req,res){

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        username = sess;
        var dbo = db.db("WEBSHIZ");
        var query = { username: username };
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
    res.render('./Student/index',{result: result});
        })
})
})
app.get('/viewClg', function(req,res){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         var dbo = db.db("WEBSHIZ");
         dbo.collection("colleges").find({}).toArray(function(err, result) {
             if (err) throw err;
             console.log(result);
             db.close();
             console.log(result);
    res.render('./Student/viewclg.html',{result:result})
         });
    });
});

app.post('/stuviewClg2', function(req,res){
    var branch = req.body.branch;
    console.log(branch);
    console.log(sessmarks);
    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         var dbo = db.db("WEBSHIZ");
         dbo.collection("colleges").find({}).toArray(function(err, result) {
             if (err) throw err;
             console.log(result);
             db.close();
             console.log(result);
    res.render('./Student/stuviewClg2.html',{result:result,branch:branch,sessmarks:sessmarks})
         });
    });
});


app.get('/stuviewClg', function(req,res){

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("WEBSHIZ");
        dbo.collection("colleges").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
    res.render('./Student/StuClg.html',{result:result});
        });
    });
});
app.get('/login',function(req,res){
    res.render('student_login.html');
});

app.get('/signup',function(req,res){
    res.render('signup.html');
});

app.post("/updateClg",function(re){

    var name = req.body.name;
    var address = req.body.address;
    var email = req.body.email;
    var phone = req.body.phone;
    var branch1 = req.body.branch1;
    var branch2 = req.body.branch2;
    var branch3 = req.body.branch3;
    var cutoff1 = req.body.b1y;
    var cutoff2 = req.body.b2y;
    var cutoff3 = req.body.b3y;
    
    cutoff1 = ((Number(cutoff1[0])+Number(cutoff1[1])+Number(cutoff1[2]))/3); 
    cutoff2 = ((Number(cutoff2[0])+Number(cutoff2[1])+Number(cutoff2[2]))/3); 
    cutoff3 = ((Number(cutoff3[0])+Number(cutoff3[1])+Number(cutoff3[2]))/3); 

    college.findOneAndUpdate({name:name},{name:name,
        address: address,
        email: email,
        phone:phone,
    
    
    cutoffs: [{
        'branchName':branch1,
        'cutoffMarks' : cutoff1
    },
    {
        'branchName':branch2,
        'cutoffMarks' : cutoff2

    },
    {
        'branchName':branch3,
        'cutoffMarks' : cutoff2
    }]
    })
    
});

app.get('/error',function(req,res){
    res.render('error.html');
});
app.get('/admin',function(req,res){
    res.render('admin_login.html');
})

app.post("/admintest", function(req,res){
    var username = req.body.email;
    var password = req.body.pass;

    if(username == 'riya@gmail.com' && password == "riya"){
        res.redirect("/viewclg");
    }
    else{
        res.redirect("/admin");
    }
})

app.get('/addclg',function(req,res){
    res.render('./Student/addclg.html');
});

app.get('/test',function(req,res){
    res.render("/test.html");
});

app.post('/test',function(req,res){
    console.log(req.body);
    var name = req.body.name;
    var address = req.body.address;
    var email = req.body.email;
    var phone = req.body.phone;
    var branch1 = req.body.branch1;
    var branch2 = req.body.branch2;
    var branch3 = req.body.branch3;
    var cutoff1 = req.body.b1y;
    var cutoff2 = req.body.b2y;
    var cutoff3 = req.body.b3y;
    
    cutoff1 = ((Number(cutoff1[0])+Number(cutoff1[1])+Number(cutoff1[2]))/3); 
    cutoff2 = ((Number(cutoff2[0])+Number(cutoff2[1])+Number(cutoff2[2]))/3); 
    cutoff3 = ((Number(cutoff3[0])+Number(cutoff3[1])+Number(cutoff3[2]))/3); 

    var cutoffs = []
    // cutoffs.push({"branchName"})
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("WEBSHIZ");
        var query = { name: name };
        dbo.collection("colleges").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
    
    if(result==''){
        var college = new College({
            name:name,
            address: address,
            email: email,
            phone:phone,
        
        
        cutoffs: [{
            'branchName':branch1,
            'cutoffMarks' : cutoff1
        },
        {
            'branchName':branch2,
            'cutoffMarks' : cutoff2

        },
        {
            'branchName':branch3,
            'cutoffMarks' : cutoff2
        }]
    });
        college.save(college, function(err, college){
            if(err){
                console.log(err);
                res.redirect('/error');
            }else{
                console.log(college);
                res.render("./Student/addclg.html")
            }              

        })
    }
    if(result != ''){

        res.render('wait',{validate: "college already exists"});
    }
    
    });
 });
    
})

app.get('/viewstu',function(req,res){

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         var dbo = db.db("WEBSHIZ");
         dbo.collection("users").find({}).toArray(function(err, result) {
             if (err) throw err;
             console.log(result);
             db.close();
             console.log(result);
    res.render('./Student/viewstu.html',{result:result});
        });
    });
})

app.get('/updateclg',function(req,res){

    res.render('./Student/updateclg.html')
})

app.post('/updateclg',function(req,res){
    name = req.body.name;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("WEBSHIZ");
        var query = { name:name };
        dbo.collection("colleges").find(query).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            db.close();
                res.render('./Student/updateclg',{result: result});
            
        });

})
});

app.get('/updatestu',function(req,res){
    res.render('./Student/updatestu.html')
})

app.post('/login', function(req, res){
    console.log(req.body);
    sessmarks = req.body.marks;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var address = req.body.address;
    var username = req.body.username;
    var password = req.body.password;
    var marks = req.body.marks;
    var area_code = req.body.area_code;
    var phone = req.body.phone;
    var gender = req.body.exist;
    console.log(username)
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("WEBSHIZ");
        var query = { username: username };
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
    
    if(result==''){
        var newUser = {first_name : first_name, last_name : last_name, address : address, username : username, password : password, marks : marks, area_code : area_code, phone : phone, gender : gender };
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
    sess = req.body.username;
    var username = req.body.username;
    var password = req.body.password;
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("WEBSHIZ");
        var query = { username: username, password: password };
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            db.close();
            if(result==''){
                res.render('wait',{validate:'Invalid username or password'});                
            }
            else{
                res.render('./Student/index',{result: result});
                console.log(sessmarks);
            }
        });
    
    
    });
})

app.listen(8000,function(req,res){
    console.log('Server is listening!');
})