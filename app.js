const { ApolloServer } = require('apollo-server');
const api = require('./server/api');
const {Client} = require('pg');
const typeDefs = require('./server/schema');
const knex = require('knex')({
    client: 'pg',
    connection: {
        user: "postgres",
        password: "JUWvMc~y[wX<2.9J",
        host: "127.0.0.1",
        port: 5432,
        database: "SmartHouse"
    }
  });
const resolvers = {
    Query: {
        devices: () => knex("devices").select("*"),
        lights: () => api.light,
        //thermometers: () => knex("thermometer").select("*"),
        thermometers: () => api.thermometer,
        
    },
    Mutation: {
        createDevice: async (parent, {device_id,name,status}) => {
            const [device] = await knex("devices")
            .returning("*")
            .insert({device_id, name, status});
            
            return device;
        }
    }
};


const server = new ApolloServer({ typeDefs, resolvers });

//socket.io
const io = require('socket.io')(2000)

class Device {
    constructor(id, name, isActive) {
        this.id = id
        this.name = name
        this.isActive = isActive
    }
}
class Thermometer {
    constructor(id, name, value, status, room) {
        this.id = id
        this.name = name
        this.value = value
        this.status = status
        this.room = room
    }
}
const devicesId = {}

io.on('connection', socket => {
    socket.on('check-id', ( id ) => {
        devicesId[socket.id] = id
        console.log(`${id}`);

        const result = api.thermometer.find(obj => {
            return obj.id === id
          })
          console.log(`${result}`);
        if(typeof result === 'undefined') {
            socket.emit('new-id', id)
        }
        else
        {
            socket.emit('old-id', id)
        }
    })
    socket.on('old-thermometer', ( id ) => {
        
            console.log(`urządzenie o podanym id już istnieje`);
            for (var i in api.thermometer){
                if (api.thermometer[i].id == id){
                    api.thermometer[i].status = true
                    break;
                }
            }

    })
    socket.on('add-thermometer', ({ id, value }) => {
        
            const thermometer = new Thermometer(id,'Null', value, true, 'brak')
            api.thermometer.push(thermometer)
            console.log(`${value}`);
    })
    socket.on('send-thermometer-value', ({id, value}) => {
        for (var i in api.thermometer){
            if (api.thermometer[i].id == id){
                api.thermometer[i].value = value
                break;
            }
        }
    })


    socket.on('disconnect', () => {
        for (var i in api.thermometer){
            if (api.thermometer[i].id == devicesId[socket.id]){
                api.thermometer[i].status = false
                break;
            }
        }


        //if(typeof api.device[devicesId[socket.id]] !== 'undefined') {
        //api.device[devicesId[socket.id]].isActive = false
        //}
        delete devicesId[socket.id]
    })
})

server.listen().then(({ url }) => {
    console.log(`server listen at ${url}`);
    
});

