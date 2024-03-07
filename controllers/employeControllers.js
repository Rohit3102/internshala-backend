const { catchAsyncErrors } = require("../middelwares/catchAsyncErrors");
const employeModel = require("../models/employeModel");
const InternshipModel = require("../models/internshipModel");
const jobModel = require("../models/jobModel");


const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemialer");
const path = require('path');
const imagekit = require('../utils/imagekit').initImageKit()


exports.homepage = catchAsyncErrors(async (req, res, next) => {
        res.json({ message: "Secure Employe homepage!" })
});

exports.currentEmploye = catchAsyncErrors(async (req, res, next) => {
        const employe = await employeModel.findById(req.id).exec();

        res.json({ employe })
});

exports.employesignup = catchAsyncErrors(async (req, res, next) => {
        const employe = await new employeModel(req.body).save();
        sendtoken(employe, 200, res);
});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
        const employe = await employeModel.findOne({ email: req.body.email })
                .select("+password")
                .exec();

        if (!employe) return next(new ErrorHandler("employe not found with this email address", 404));

        const isMatch = employe.comparepassword(req.body.password);
        if (!isMatch) return next(new ErrorHandler("wrong password", 500))

        sendtoken(employe, 200, res);
});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {

        res.clearCookie("token");
        res.json({ message: "successfully signout" })
});

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
        const employe = await employeModel.findOne({ email: req.body.email }).exec();

        if (!employe) return next(new ErrorHandler("employe not found with this email address", 404));

        const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`

        sendmail(req, res, next, url);
        employe.resetPasswordToken = "1";
        await employe.save();

        res.json({ employe, url })
});

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
        const employe = await employeModel.findById(req.params.id).exec();

        if (!employe) return next(new ErrorHandler("employe not found with this email address", 404));

        if (employe.resetPasswordToken == "1") {
                employe.resetPasswordToken = "0"
                employe.password = req.body.password;
                await employe.save();
        } else {
                return next(new ErrorHandler("Invalid Reset Password Link Please Try Again", 500));
        }
        res.status(200).json({
                message: "password has successfully changed"
        })
});


exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
        const employe = await employeModel.findById(req.params.id).exec();

        employe.password = req.body.password;
        await employe.save();
        sendtoken(employe, 200, res);
});

exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
 employeModel.findByIdAndUpdate(req.params.id, req.body).exec()
        res.status(200).json({
                success: true,
                message: "employe updated successfully",
        });
});

exports.employeavatar = catchAsyncErrors(async (req, res, next) => {
        const employe = await employeModel.findById(req.params.id)
        const file = req.files.organizationlogo;

        const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

        if(employe.organizationlogo.fileId !== ""){
                await imagekit.deleteFile(employe.organizationlogo.fileId)
        }
        const {fileId, url} = await imagekit.upload({
                file: file.data,
                fileName: modifiedFileName,
        });
        employe.organizationlogo = { fileId, url };
        await employe.save()

        res.status(200).json({
                success: true,
                message: "profile updated successfully",
        });
});

//-------------------------------internships------------

exports.createinternship = catchAsyncErrors(async (req, res, next) => {
        const employe = await employeModel.findById(req.id).exec();

        const internship = await new InternshipModel(req.body);

        internship.employe = employe._id;
        employe.internships.push(internship._id);

        await internship.save();
        await employe.save();
        res.status(201).json({success:true, internship});
});

exports.readinternship = catchAsyncErrors(async (req, res, next) => {
        const {internships} = await employeModel.findById(req.id)
        .populate("internships").exec();
        res.status(200).json({success:true, internships});
});

exports.readsingleinternship = catchAsyncErrors(async (req, res, next) => {
        const internship = await InternshipModel.findById(req.params.id).exec();
        res.status(200).json({success:true, internship});
});


//-------------------------------JOBS------------

exports.createjob = catchAsyncErrors(async (req, res, next) => {
        const employe = await employeModel.findById(req.id).exec();

        const job = await new jobModel(req.body);

        job.employe = employe._id;
        employe.jobs.push(job._id);

        await job.save();
        await employe.save();
        res.status(201).json({success:true, job});
});

exports.readjob = catchAsyncErrors(async (req, res, next) => {
        const {jobs} = await employeModel.findById(req.id)
        .populate("jobs").exec();
        res.status(200).json({success:true, jobs});
});

exports.readsinglejob = catchAsyncErrors(async (req, res, next) => {
        const job = await jobModel.findById(req.params.id).exec();
        res.status(200).json({success:true, job});
        
});