const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    personalInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        address: { type: String }
    },
    education: [{
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date }
    }],
    experience: [{
        jobTitle: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date },
        responsibilities: { type: String }
    }],
    skills: [{ type: String }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resume', resumeSchema);