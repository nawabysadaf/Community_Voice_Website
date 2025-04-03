import mongoose from "mongoose";

const report = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        default: 'Infrastructural',
    },
    address: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Reports = mongoose.model('Report', report);

export default Reports;