const { catchAsyncErrors } = require("../middelwares/catchAsyncErrors");
const studentModel = require("../models/studentModel")
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require('uuid');

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const {resume} = await studentModel.findById(req.id)
    res.json({ message: "Secure resume page!", resume })
});

exports.addeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Education Added!" })
});

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
        );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
         ...req.body,
        };
    await student.save();
    res.json({ message: "Education Updated!" })
});

exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
        );
    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Education Deleted!" })
});

//-------------------ADD-JOBS--------------

exports.addjob = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    student.resume.jobs.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "job Added!" })
});

exports.editjob = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const jobIndex = student.resume.jobs.findIndex(
        (i) => i.id === req.params.jobid
        );
    student.resume.jobs[jobIndex] = {
        ...student.resume.jobs[jobIndex],
         ...req.body,
        };
    await student.save();
    res.json({ message: "jobs Updated!" })
});

exports.deletejob = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const filteredjob = student.resume.jobs.filter(
        (i) => i.id !== req.params.jobid
        );
    student.resume.jobs = filteredjob;
    await student.save();
    res.json({ message: "jobs Deleted!" })
});

//-------------inernships--------

exports.addintership = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    student.resume.inernships.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "inernships Added!" })
});

exports.editinernship = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const inernshipIndex = student.resume.inernships.findIndex(
        (i) => i.id === req.params.inernshipid
        );
    student.resume.inernships[inernshipIndex] = {
        ...student.resume.inernships[inernshipIndex],
         ...req.body,
        };
    await student.save();
    res.json({ message: "inernships Updated!" })
});

exports.deleteinernship = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const filteredjob = student.resume.inernships.filter(
        (i) => i.id !== req.params.inernshipid
        );
    student.resume.inernships = filteredjob;
    await student.save();
    res.json({ message: "inernships Deleted!" })
});

//------------responsibilites----------

exports.addresponsibilites = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    student.resume.responsibilites.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "responsibilites Added!" })
});

exports.editresponsibilites = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const responsibilitesIndex = student.resume.responsibilites.findIndex(
        (i) => i.id === req.params.responsibiliteid
        );
    student.resume.responsibilites[responsibilitesIndex] = {
        ...student.resume.responsibilites[responsibilitesIndex],
         ...req.body,
        };
    await student.save();
    res.json({ message: "responsibilites Updated!" })
});

exports.deleteresponsibilites = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const filteredresponsibilites = student.resume.responsibilites.filter(
        (i) => i.id !== req.params.responsibilitesid
        );
    student.resume.responsibilites = filteredresponsibilites;
    await student.save();
    res.json({ message: "responsibilites Deleted!" })
});

//---------------------courses-----------

exports.addcourse = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    student.resume.courses.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "courses Added!" })
});

exports.editcourse = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const courseIndex = student.resume.courses.findIndex(
        (i) => i.id === req.params.courseid
        );
    student.resume.courses[courseIndex] = {
        ...student.resume.courses[courseIndex],
         ...req.body,
        };
    await student.save();
    res.json({ message: "courses Updated!" })
});

exports.deletecourse = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const filteredcourse = student.resume.courses.filter(
        (i) => i.id !== req.params.courseid
        );
    student.resume.courses = filteredcourse;
    await student.save();
    res.json({ message: "courses Deleted!" })
});

//---------------------projects-----------

exports.addproject = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "projects Added!" })
});

exports.editproject = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const projectIndex = student.resume.projects.findIndex(
        (i) => i.id === req.params.projectid
        );
    student.resume.projects[projectIndex] = {
        ...student.resume.projects[projectIndex],
         ...req.body,
        };
    await student.save();
    res.json({ message: "projects Updated!" })
});

exports.deleteproject = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const filteredproject = student.resume.projects.filter(
        (i) => i.id !== req.params.projectid
        );
    student.resume.projects = filteredproject;
    await student.save();
    res.json({ message: "projects Deleted!" })
});

//---------------------skills-----------

exports.addskill = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "skills Added!" })
});

exports.editskill = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const skillIndex = student.resume.skills.findIndex(
        (i) => i.id === req.params.skillid
        );
    student.resume.skills[skillIndex] = {
        ...student.resume.skills[skillIndex],
         ...req.body,
        };
    await student.save();
    res.json({ message: "skills Updated!" })
});

exports.deleteskill = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const filteredskill = student.resume.skills.filter(
        (i) => i.id !== req.params.skillid
        );
    student.resume.skills = filteredskill;
    await student.save();
    res.json({ message: "skills Deleted!" })
});

//---------------------accomplishment-----------

exports.addaccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "accomplishment Added!" })
});

exports.editaccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const accomplishmentIndex = student.resume.accomplishments.findIndex(
        (i) => i.id === req.params.accomplishmentid
        );
    student.resume.accomplishments[accomplishmentIndex] = {
        ...student.resume.accomplishments[accomplishmentIndex],
         ...req.body,
        };
    await student.save();
    res.json({ message: "accomplishment Updated!" })
});

exports.deleteaccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findById(req.id).exec()

    const filteredaccomplishment = student.resume.accomplishments.filter(
        (i) => i.id !== req.params.accomplishmentid
        );
    student.resume.accomplishments = filteredaccomplishment;
    await student.save();
    res.json({ message: "accomplishment Deleted!" })
});