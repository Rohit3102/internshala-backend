const { catchAsyncErrors } = require("../middelwares/catchAsyncErrors");
const studentModel = require("../models/studentModel")
const internshipModel = require("../models/internshipModel")
const jobModel = require("../models/jobModel")
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemialer");
const path = require('path');
const imagekit = require('../utils/imagekit').initImageKit();


exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Secure homepage!" })
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
        const student = await studentModel.findById(req.id).exec();

        res.json({ student })
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
        const student = await new studentModel(req.body).save();
        sendtoken(student, 200, res);
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
        const student = await studentModel.findOne({ email: req.body.email })
                .select("+password")
                .exec();

        if (!student) return next(new ErrorHandler("Student not found with this email address", 404));

        const isMatch = student.comparepassword(req.body.password);
        if (!isMatch) return next(new ErrorHandler("wrong password", 500))

        sendtoken(student, 201, res);
});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {

        res.clearCookie("token");
        res.json({ message: "successfully signout" })
});

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
        const student = await studentModel.findOne({ email: req.body.email }).exec();

        if (!student) return next(new ErrorHandler("Student not found with this email address", 404));

        const url = `http://localhost:5173/verifyPassword/${student._id}`

        sendmail(req, res, next, url);
        student.resetPasswordToken = "1";
        await student.save();

        res.json({ student, url })
});

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
        const student = await studentModel.findById(req.params.id).exec();

        console.log(req.body)
        

        if (!student) return next(new ErrorHandler("Student not found with this email address", 404));

        if (student.resetPasswordToken == "1") {
                student.resetPasswordToken = "0"
                student.password = req.body.password;
                await student.save();
        } else {
                return next(new ErrorHandler("Invalid Reset Password Link Please Try Again", 500));
        }
        res.status(200).json({
                message: "password has successfully changed"
        })
});


exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
        const student = await studentModel.findById(req.params.id).exec();

        student.password = req.body.password;
        await student.save();
        sendtoken(student, 200, res);
});

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
 studentModel.findByIdAndUpdate(req.params.id, req.body).exec()
        res.status(200).json({
                success: true,
                message: "student updated successfully",
        });
});

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
        const student = await studentModel.findById(req.params.id)
        const file = req.files.avatar;

        const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

        if(student.avatar.fileId !== ""){
                await imagekit.deleteFile(student.avatar.fileId)
        }
        const {fileId, url} = await imagekit.upload({
                file: file.data,
                fileName: modifiedFileName,
        });
        student.avatar = { fileId, url };
        await student.save()

        res.status(200).json({
                success: true,
                message: "profile updated successfully",
        });
});


// ----------------------------APPLY INTERNSHIP-----------
exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
        const student = await studentModel.findById(req.id).exec();
        const internship = await internshipModel.findById(
                req.params.internshipid
        );

        student.internships.push(internship._id);
        internship.students.push(student._id);

        await student.save();
        await internship.save();


        res.json({ student })
});


// ----------------------------APPLY JOB-----------
exports.applyjob = catchAsyncErrors(async (req, res, next) => {
        const student = await studentModel.findById(req.id).exec();

        const job = await jobModel.findById(
                req.params.jobid
        );

        student.jobs.push(job._id);
        job.students.push(student._id);

        await student.save();
        await job.save();
        res.json({ student })
});