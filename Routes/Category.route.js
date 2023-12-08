const express = require('express')
const router = express.Router()
const {createNewCategory, getCategoryById, getAllCategories, deleteCategory, updateCategory} = require('../Controllers/Category.controller')

router.route('/')
.get(getAllCategories)
.post(createNewCategory)

router
.route('/:id')
.get(getCategoryById)
.delete(deleteCategory)
.patch(updateCategory)

module.exports = router