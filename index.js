const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const sanitizer = require("express-sanitizer");
const cookieParser = require("cookie-parser");

//Import Routes
const CollegeRoutes = require("./routes/college");
const UserRoutes = require("./routes/user");

//Import Schemas
const User = require("./models/user");

const app = express();

//Middleware Setup
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sanitizer());
app.use(
  require("express-session")({
    secret: "RiyaWTProject",
    resave: false,
    saveUninitialized: false
  })
);
app.use(cookieParser("secret"));
app.use(methodOverride("_method"));

//Variables
const port = 8000;
const db = "mongodb://localhost/riya";

//Database
mongoose.connect(db);

//Auth
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes
app.use(UserRoutes);
//app.use(CollegeRoutes);

app.listen(port, () => {
  console.log("College Predictor listening on port " + port);
});
