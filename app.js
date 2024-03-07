require('dotenv').config({path: './.env'})
const express = require('express');
const app = express();


const  cors = require("cors");
app.use(cors({ credentials:true, origin: true}))


//db connect
require("./models/database").connectDatabase()

//logger
const logger = require('morgan');
app.use(logger("tiny"));


//body parser
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}));

//express file-upload
const fileupload = require('express-fileupload');
app.use(fileupload());

app.use(cookieparser());

//routes
app.use('/', require("./routes/indexRoutes"))
app.use('/resume', require("./routes/resumeRoutes"))
app.use('/employe', require("./routes/employeRoutes"))


//error handling
const ErrorHandler = require('./utils/ErrorHandler');
const { genetatedErrors } = require('./middelwares/error');
app.all("*", (req, res, next)=>{
    next(new ErrorHandler(`requested url not found ${req.url}`, 404))
});
app.use(genetatedErrors);


app.listen(
    process.env.PORT,
     console.log(`server is running on PORT ${process.env.PORT}`))