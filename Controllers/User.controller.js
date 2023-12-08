const User = require('../Models/User.model')
const passwordUtils = require('../Utils/password.utils')
const HttpError = require('http-errors')
const mongoose = require('mongoose');

async function createNewUser(req, res, next) {
    let data = req.body
    const saltAndHash = passwordUtils.generatePassword(data.password)
    data.hash = saltAndHash.hash;
    data.salt = saltAndHash.salt
    const user = new User(data)
    try {
        let result = await user.save()
        res.send({ status: 201, message: "OK" })
    }
    catch (error) {
        let errMsg;
        if (error.code == 11000) {
            errMsg = Object.keys(error.keyValue)[0] + " already exists."
            next(HttpError(409, errMsg))

        }
        else if (error.name == "ValidationError") {
            let errMsgs = error.message.split(',')
            errMsg = errMsgs[0].split(':')[2];
            for (let i = 1; i < errMsgs.length; i++) {
                errMsg += "\n"+errMsgs[i].split(':')[1]
            }
            next(HttpError(422, errMsg))
        }
        else {
            errMsg = error.message;
            next(HttpError(400, errMsg))
        }
    }
}
async function getAllUsers(req, res, next) {
    try {
        res.json(await User.find({}))
    } catch (err) {
        next(err)
    }
}
async function getUserById(req, res, next) {
    try {
        let user = await User.findById(req.params.id)
        if (!user) {
            throw HttpError(404, "User not found")
        }
        res.json(user)
    }
    catch (err) {
        if (err instanceof mongoose.CastError) {
            next(HttpError(400, "Invalid user ID"))
            return
        }
        next(err);
    }
}
module.exports = {
    createNewUser,
    getAllUsers,
    getUserById,
}