const express = require("express");
const {
    homepage,
    currentUser,
    studentsignup,
    studentsignin,
    studentsignout,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
    applyinternship,
    applyjob,
 } = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middelwares/auth");
const router = express.Router();

//get "/"
router.get('/', homepage);

//POST "/student"
router.post('/student', isAuthenticated, currentUser);

// post /student/signup
router.post('/student/signup', studentsignup);

// post /student/signin
router.post('/student/signin', studentsignin);

// get /student/signout
router.get('/student/signout', isAuthenticated, studentsignout);

// POST/student/send-mail
router.post('/student/send-mail',  studentsendmail);

// GET/student/forget-link/:studentid
router.post('/student/forget-link/:id',  studentforgetlink);

// POST/student/Reset-password/:studentid
router.post('/student/reset-password/:id', isAuthenticated, studentresetpassword);

// POST/student/update/:studentid
router.post('/student/update/:id', isAuthenticated, studentupdate);

// POST/student/avatar/:studentid
router.post('/student/avatar/:id', isAuthenticated, studentavatar);


// ----------------------------APPLY INTERNSHIP-----------

// POST/student/apply/internship/:internshipid
router.post('/student/apply/internship/:internshipid', isAuthenticated, applyinternship);

// ----------------------------APPLY JOB-----------
// POST/student/apply/job/:jobid
router.post('/student/apply/job/:jobid', isAuthenticated, applyjob);

module.exports = router;