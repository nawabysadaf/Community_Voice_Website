import mongoose from "mongoose";

const users = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        default: 'German',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Users = mongoose.model('User', users);

module.exports = Users;