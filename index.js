const express = require('express')
const dotenv = require('dotenv').config()
const HttpError = require('http-errors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const path = require('path')
require("./config/passport")
const app = express()
require('./config/db')();

const userRoutes = require('./Routes/User.route')
const categoryRoutes = require('./Routes/Category.route')
const serviceRoutes = require('./Routes/Service.route')
const viewRoutes = require('./Routes/View.route')
const authRoutes = require('./Routes/Auth.route')



/**
 * =================================Session Config================================
 */

const oneDay = 1000 * 60 * 60 * 24
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))
app.use(cookieParser())

/**
 * =================================Passport Auth Config================================
 */

app.use(passport.initialize())
app.use(passport.session())


/**
 * =================================Middlewares================================
 */

app.use(express.json())
app.use(express.urlencoded({ extended: true, }))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

/**
 * =================================ROUTES================================
 */
app.use('/', viewRoutes)
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes)
app.use('/services', serviceRoutes)
app.use('/auth', authRoutes)


/**
 * =================================Error Handler Middleware================================
 */

// 404 handler
app.use((req, res, next) => {
    next(HttpError(404, 'Not Found'))
})

// General error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message || "Unhandled Server Error"
    })
    next()
});

/**
 *  ======================Server Init========================
*/
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server Started! Listening on port ${PORT}..`))


