const Sequelize = require('sequelize');
const sequelize = require('../config/database')
const SwitchWitchValue = sequelize.define('switchwithvalue', {
     deviceid: {
        type: Sequelize.INTEGER,
        unique: true,
        model: 'devices', 
          key: 'devicesid',
    }, 
    isOn: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
module.exports = SwitchWitchValue;