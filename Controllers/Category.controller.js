const HttpError = require('http-errors')
const Category = require('../Models/Category.model')
const mongoose = require('mongoose');

async function createNewCategory(req, res, next) {
    let data = req.body
    const category = new Category(data)
    try {
        let result = await category.save()
        res.send({ status: 200, message: "OK" })
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
                errMsg += errMsgs[i].split(':')[1]
            }
            next(HttpError(422, errMsg))
        }
        else {
            errMsg = error.message;
            next(HttpError(400, errMsg))
        }
    }
}

async function updateCategory(req, res, next) {
    let data = req.body
    console.log(req.params.id)
    try {
        let result = await Category.findByIdAndUpdate(req.params.id, data)
        console.log(result)
        res.send({ status: 200, message: "OK" })
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
                errMsg += errMsgs[i].split(':')[1]
            }
            next(HttpError(422, errMsg))
        }
        else {
            errMsg = error.message;
            next(HttpError(400, errMsg))
        }
    }
}

async function getCategoryById(req, res, next) {
    try {
        let category = await Category.findById(req.params.id)
        if (category.length === 0) {
            next(HttpError(404, "Category not found"))
        }
        else {
            res.json(category)
        }
    }
    catch (err) {
        if (err instanceof mongoose.CastError) {
            next(HttpError(400, "Invalid Category ID"))
            return
        }
        next(err);
    }
}

async function getAllCategories(req, res, next) {
    try {
        let categories = await Category.find({}, '-__v')
        if (categories.length === 0) {
            next(HttpError(404, 'No Categories Found'))
        }
        else {
            res.json(categories)
        }

    } catch (err) {
        next(err)
    }
}

async function deleteCategory(req, res, next) {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            next(HttpError(404, 'Not Found'))
        } else {
            res.send({ status: 200, message: "OK" })
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    createNewCategory,
    getCategoryById,
    getAllCategories,
    deleteCategory,
    updateCategory
}