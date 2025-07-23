const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// Route to create a new resume
router.post('/', resumeController.createResume);

// Route to get all resumes for a user
router.get('/', resumeController.getResumes);

// Route to get a specific resume by ID
router.get('/:id', resumeController.getResumeById);

// Route to update a specific resume by ID
router.put('/:id', resumeController.updateResume);

// Route to delete a specific resume by ID
router.delete('/:id', resumeController.deleteResume);

module.exports = router;