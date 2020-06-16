const Sequelize = require('sequelize');
const sequelize = require('../config/database')
const Fridge = sequelize.define('fridge', {
     deviceid: {
        type: Sequelize.INTEGER,
        unique: true,
        model: 'devices', 
        key: 'devicesid',
    }, 
    value: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    valueType: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
})
module.exports = Fridge;