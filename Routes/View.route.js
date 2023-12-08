const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {

        res.render('index')
    }
    else {
        res.status(301).redirect('/login');
    }
})
router.get('/login', (req, res, next) => {
    if (req.session.messages) {
        res.render('login', { error: req.session.messages[req.session.messages.length - 1] });
    }
    else {
        res.render('login', { error: "" });
    }
})
router.get('/register', (req, res, next) => {
    res.render('register')
})
router.get('/manage-services', (req, res, next) => {
    res.render('services')
})
router.get('/manage-users', (req, res, next) => {
    res.render('users')

})
router.get('/manage-orders', (req, res, next) => {
    res.render('orders')

})
router.get('/manage-categories', (req, res, next) => {
    res.render('categories')

})

module.exports = router