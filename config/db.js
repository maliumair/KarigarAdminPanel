const mongoose = require('mongoose')
function init() {
    mongoose
        .connect(
            process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            useUnifiedTopology: true,
        }
        )
        .then(() => {
            console.log('Mongodb Connected')
        })
        .catch(err => console.error(err.message))

    mongoose.connection.on('connected', () => {
        console.log('Mongoose Connected to DB')
    })

    mongoose.connection.on('error', err => console.error(err.message))

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose Disconnected')
    })

    process.on('SIGINT', () => {
        mongoose.connection.close()
            .then(() => {
                process.exit(0)
            })
    })
}

module.exports = init