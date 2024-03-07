const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First Name Is Required"],
        minLength: [4 , "first name should be atleast 4 character long"]
    },
    lastname: {
        type: String,
        required: [true, "Last Name Is Required"],
        minLength: [3 , "first name should be atleast 3 character long"]
    },
    contact: {
        type: String,
        // required: [true, "Contact Is Required"],
        minLength: [10 , "Contact should be atleast 10 character long"],
        maxLength: [10 , "Contact must not exceed 10 character"]
    },
    city: {
        type: String,
        // required: [true, "City name Is Required"],
        minLength: [3 , "Contact should be atleast 3 character long"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email Is Required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        select: false,
        maxLength: [
            15, "password should not exceed more than 15 characters"
        ],
        minLength: [
            5, "password should have atleast 5 characters"
        ],
        // match: []

    },
    resetPasswordToken: {
        type: String,
        default: "0"
        
    },
    avatar: {
        type: Object,
        default: {
            fileId: "",
            url: "https://images.unsplash.com/photo-1704869881379-4e88e66c0248?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
        }
    },
    resume: {
    education: [],
    jobs: [],
    inernships: [],
    responsibilites: [],
    courses: [],
    projects: [],
    skills: [],
    accomplishments: []
    },
    internships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'internship'
     }],
   jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job'
 }],


}, {timestamps: true});

studentModel.pre("save", function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt)
});

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

studentModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });

    
};

const student = mongoose.model("student", studentModel);
module.exports = student;