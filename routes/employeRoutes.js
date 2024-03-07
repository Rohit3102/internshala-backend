const express = require("express");
const {
    homepage,
    currentEmploye,
    employesignup,
    employesignin,
    employesignout,
    employesendmail,
    employeforgetlink,
    employeresetpassword,
    employeupdate,
    employeavatar,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob,
 } = require("../controllers/employeControllers");
const { isAuthenticated } = require("../middelwares/auth");
const router = express.Router();

//get "/"
router.get('/', homepage);

//POST "/employe"
router.post('/', isAuthenticated, currentEmploye);

// post /employe/signup
router.post('/signup', employesignup);

// post /employe/signin
router.post('/signin', employesignin);

// get /employe/signout
router.get('/signout', isAuthenticated, employesignout);

// POST/employe/send-mail
router.post('/send-mail',  employesendmail);

// GET/employe/forget-link/:employeid
router.get('/forget-link/:id',  employeforgetlink);

// POST/employe/Reset-password/:employeid
router.post('/reset-password/:id', isAuthenticated, employeresetpassword);

// POST/employe/update/:employeid
router.post('/update/:id', isAuthenticated, employeupdate);

// POST/employe/avatar/:employeid
router.post('/avatar/:id', isAuthenticated, employeavatar);


//-------------------------------internships------------

// POST/employe/internship/create
router.post('/internship/create', isAuthenticated, createinternship);

// POST/employe/internship/read
router.post('/internship/read', isAuthenticated, readinternship);

// POST/employe/internship/read/:id
router.post('/internship/read/:id', isAuthenticated, readsingleinternship);


//-------------------------------JOBS------------

// POST/employe/job/create
router.post('/job/create', isAuthenticated, createjob);

// POST/employe/job/read
router.post('/job/read', isAuthenticated, readjob);

// POST/employe/job/read/:id
router.post('/job/read/:id', isAuthenticated, readsinglejob);

module.exports = router;