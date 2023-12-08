const express = require('express')
const {createNewService, getServiceById, getAllServices, deleteService, updateService} = require("../Controllers/Service.controller")
const router = express.Router()

router.route('/')
.get(getAllServices)
.post(createNewService)

router
.route('/:id')
.get(getServiceById)
.delete(deleteService)
.patch(updateService)

module.exports = router