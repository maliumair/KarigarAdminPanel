const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/login', passport.authenticate('local', {failureMessage: true, failureRedirect :"/login"}), (req,res, next)=>{
    res.redirect('/')
})

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/login')
    });
})

module.exports = router