const Sequelize = require('sequelize');
module.exports = new Sequelize('EazyHouse', 'postgres', 'admin1', {
    host: '127.0.0.1',
    dialect:  'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  });

  /* const knex = require('knex')({
    client: 'pg',
    connection: {
        user: "postgres",
        password: "JUWvMc~y[wX<2.9J",
        host: "127.0.0.1",
        port: 5432,
        database: "SmartHouse"
    }
  });
 */
//thermometers: () => knex("thermometer").select("*"),
//devices: () => knex("devices").select("*"), .then().catch(err => console.log(err))
 /*  Mutation: {
            createDevice: async (parent, {device_id,name,status}) => {
                const [device] = await knex("devices")
                .returning("*")
                .insert({device_id, name, status});
                
                return device;
            }
        }*/