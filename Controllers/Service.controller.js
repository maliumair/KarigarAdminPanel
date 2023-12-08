const Service = require('../Models/Service.model')
const HttpError = require('http-errors')
const mongoose = require('mongoose');

async function createNewService(req, res, next) {
    let data = req.body
    const service = new Service(data)
    try {
        let result = await service.save()
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

async function updateService(req, res, next) {
    let data = req.body
    try {
        let result = await Service.findByIdAndUpdate(req.params.id, data)
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

async function getServiceById(req, res, next) {
    try {
        let service = await Service.findById(req.params.id)
        if (!service) {
            throw HttpError(404, "Service not found")
        }
        res.json(service)
    }
    catch (err) {
        if (err instanceof mongoose.CastError) {
            next(HttpError(400, "Invalid Service ID"))
            return
        }
        next(err);
    }
}

async function getAllServices(req, res, next) {
    try {
        let services = await Service.find({},'-__v').populate({ path: "category", select: "title" })
        if (services.length === 0) {
            throw HttpError(404, 'No services Found')
        }
        else{
            res.json(services)
        }
    } catch (err) {
        next(err)
    }
}

async function deleteService(req, res, next) {
    try {
        console.log(service)
        if (!service) {
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
    createNewService,
    getServiceById,
    getAllServices,
    deleteService,
    updateService
}