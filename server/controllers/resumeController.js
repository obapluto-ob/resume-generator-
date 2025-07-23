const Resume = require('../models/Resume');

exports.createResume = async (req, res) => {
    try {
        const newResume = new Resume(req.body);
        await newResume.save();
        res.status(201).json(newResume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find();
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateResume = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedResume = await Resume.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(200).json(updatedResume);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedResume = await Resume.findByIdAndDelete(id);
        if (!deletedResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};