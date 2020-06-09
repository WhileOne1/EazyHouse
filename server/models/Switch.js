const Sequelize = require('sequelize');
const db = require('../config/database');
const Switch = db.define('switches', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    isOn: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
    },
    room: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        
    },
    deviceid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        defaultValue: -1
        
    }
})
/*  Switch.associate = (models) => {
    Switch.belongsTo(models.Users, {
        through: 'device',
        foreignKey: 'deviceId'
    })
    
        //return Switch;
    }  */
module.exports = Switch;