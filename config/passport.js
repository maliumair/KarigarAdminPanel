const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../Models/User.model');
const passwordUtils = require('../Utils/password.utils')
const customFields = {
    usernameField: 'username',
    passwordField: 'password'
}
const verifyCallback = async(req, username, password, done) => {
    await User.findOne({username: username})
        .then((user) => {
            if (!user) {
                return done(null, false, { message: "User not found!"})
            }

            const isValid = passwordUtils.validatePassword(password, user.hash, user.salt)
            if (isValid) {
                return done(null, user)
            }
            else {
                return done(null, false, { message: "Incorrect password!"});
            }

        })
        .catch(err => {
            done(err)
        })
}

const strategy = new LocalStrategy({customFields, passReqToCallback: true}, verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (userId, done) => {
    await User.findById(userId , '_id first_name last_name email username phone role')
        .then((user) => {
            done(null, user)
        })
        .catch(err => done(err))
})