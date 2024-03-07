const express = require("express");
const router = express.Router();
const { 
    resume,
    addeducation,
    editeducation,
    deleteeducation,
    addjob,
    editjob,
    deletejob,
    addintership,
    editinernship,
    deleteinernship,
    addresponsibilites,
    editresponsibilites,
    deleteresponsibilites,
    addcourse,
    editcourse,
    deletecourse,
    addproject,
    editproject,
    deleteproject,
    addskill,
    editskill,
    deleteskill,
    addaccomplishment,
    editaccomplishment,
    deleteaccomplishment,
 } = require("../controllers/resumeControllers");
const { isAuthenticated } = require("../middelwares/auth");

//get "/"
router.get('/', isAuthenticated, resume);

//post/add-edu
router.post('/add-edu', isAuthenticated, addeducation)

//post/edit-edu/:eduid
router.post('/edit-edu/:eduid', isAuthenticated, editeducation);

//post/delete-edu/:eduid
router.post('/delete-edu/:eduid', isAuthenticated, deleteeducation);

//----------jobs------------

//post/add-job
router.post('/add-job', isAuthenticated, addjob);

//post/edit-job
router.post('/edit-job/:jobid', isAuthenticated, editjob);

//post/delete-job/:jobid
router.post('/delete-job/:jobid', isAuthenticated, deletejob);

//-------------inernships--------

//post/add-inernships
router.post('/add-inernship', isAuthenticated, addintership);

//post/edit-inernship
router.post('/edit-inernship/:inernshipid', isAuthenticated, editinernship);

//post/delete-inernship/:inernshipid
router.post('/delete-inernship/:inernshipid', isAuthenticated, deleteinernship);

//-----------------responsibilites-------------

//post/add-responsibilites
router.post('/add-responsibilites', isAuthenticated, addresponsibilites);

//post/edit-responsibilites
router.post('/edit-responsibilites/:responsibiliteid', isAuthenticated, editresponsibilites);

//post/delete-responsibilites/:responsibilites
router.post('/delete-responsibilites/:responsibilitesid', isAuthenticated, deleteresponsibilites);

//---------------------courses-----------

//post/add-courses
router.post('/add-course', isAuthenticated, addcourse);

//post/edit-course
router.post('/edit-course/:courseid', isAuthenticated, editcourse);

//post/delete-course/:courseid
router.post('/delete-course/:courseid', isAuthenticated, deletecourse);


//---------------------projects-----------

//post/add-projects
router.post('/add-project', isAuthenticated, addproject);

//post/edit-projects
router.post('/edit-project/:projectid', isAuthenticated, editproject);

//post/delete-projects/:projectid
router.post('/delete-project/:projectid', isAuthenticated, deleteproject);

//----------------skills------------------

//post/add-skills
router.post('/add-skill', isAuthenticated, addskill);

//post/edit-skills
router.post('/edit-skill/:skillid', isAuthenticated, editskill);

//post/delete-skill/:skillid
router.post('/delete-skill/:skillid', isAuthenticated, deleteskill);

//----------------accomplishment------------------

//post/add-accomplishment
router.post('/add-accomplishment', isAuthenticated, addaccomplishment);

//post/edit-accomplishment
router.post('/edit-accomplishment/:accomplishmentid', isAuthenticated, editaccomplishment);

//post/delete-accomplishment/:accomplishmentid
router.post('/delete-accomplishment/:accomplishmentid', isAuthenticated, deleteaccomplishment);


module.exports = router;