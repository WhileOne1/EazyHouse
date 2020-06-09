const Sequelize = require('sequelize');
const db = require('../config/database');
const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    }
})

/*  User.associate = (models) => {
    User.belongsTo(models.Users, {
        through: 'device',
        foreignKey: 'userId'
    })
    

    }  */

    module.exports = User;