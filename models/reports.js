import mongoose from "mongoose";

const report = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    image: {

    }
});

const Reports = mongoose.model('Reports', report);

module.exports = Reports;