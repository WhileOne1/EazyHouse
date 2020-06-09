const Sequelize = require('sequelize');
const sequelize = require('../config/database')
const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isAlphanumeric: {args:true, msg: 'The username can only contain letters and numbers'},
            len: {args:[3,25], msg: 'The username needs to be between 3 and 25 characters long'},
        }
    },
    password: {
        type: Sequelize.STRING,
        validate:{
            len: {args:[8,100], msg: 'The password needs to be between 8 and 100 characters long'},
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate:{
            isEmail: {args:true, msg: 'invalid email'},
        }
    },
})
module.exports = User;