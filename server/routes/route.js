const express = require('express');
const router = express.Router();
const user = require("../controllers/user");
const assignment = require("../controllers/assignment");
const project = require("../controllers/project");
const test = require("../controllers/test");

// user routes

router.post('/user/create', user.create);
router.get('/user/find/:userId', user.find);
router.get('/user/find/:userId', user.findOne);
router.delete('/user/delete/:userId', user.delete);
router.post('/user/login', user.login);
router.get('/user/profile', user.profile);
router.post('/user/logout', user.logout);

// assignment routes

router.post('/assignment/create', assignment.create);
router.get('/assignment/find/:userId', assignment.find);
router.get('/assignment/find/:userId/:title', assignment.findOne);
router.put('/assignment/update/:userId/:title', assignment.findOneAndUpdate);
router.delete('/assignment/delete/:userId/:title', assignment.delete);


// project routes

router.post('/project/create', project.create);
router.get('/project/find/:userId', project.find);
router.get('/project/find/:title', project.findOne);
router.put('/project/update/:userId/:title', project.findOneAndUpdate);
router.delete('/project/delete/:userId/:title', project.delete);


// test routes

router.post('/test/create', test.create);
router.get('/test/find/:userId', test.find);
router.get('/test/find/:title', test.findOne);
router.put('/test/update/:userId/:title', test.findOneAndUpdate);
router.delete('/test/delete/:userId/:title', test.delete);

module.exports = router;