const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        trim: true,
        required: [true, "First Name is required"]
    },
    last_name: {
        type: String,
        trim: true,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email address"],
        required: [true, "Email is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone Number is required"],
        unique: true,
        match: [/^03[0-9]{9}$/, 'Phone number should be 11 digits long like 03xxxxxxxxx']
    },
    username: {
        type: String,
        match: [/^[a-zA-Z0-9]{4,30}$/, "Username should be at least 4 characters long and must only contain letters and numbers"],
        unique: true,
        required: [true, "Username is required"]
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'employee'],
        required: true,
    },
    created_at: {
        type: Date,
        default: Date(),
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User