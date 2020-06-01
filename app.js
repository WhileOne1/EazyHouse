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
        switches: () => api.switch,
        
    },
      /*  Mutation: {
            createDevice: async (parent, {device_id,name,status}) => {
                const [device] = await knex("devices")
                .returning("*")
                .insert({device_id, name, status});
                
                return device;
            }
        }*/
        Mutation: {
            createSwitch: async (parent, {id,name,status,isOn,room}) => {
                const switch1 = new Switch(id,name, status, isOn, room)
                api.switch.push(switch1)
                return switch1;

        },
            editSwitch: async (parent, {id,name,room, isOn}) => {
                for (var i in api.switch){
                    if (api.switch[i].id == id){
                        if(api.switch[i].name !== 'undefined'){
                            api.switch[i].name = name
                        }
                        

                        if(api.switch[i].room !== 'undefined'){
                            api.switch[i].room = room
                        }
                        if(api.switch[i].isOn !== 'undefined'){
                            api.switch[i].isOn = isOn
                        }
                         break;
                     }
                  }
                  //return api.switch[i];

        },
        editSwitchValue: async (parent, {id, isOn}) => {
            for (var i in api.switch){
                if (api.switch[i].id == id){
                    
                    if(api.switch[i].isOn !== 'undefined'){
                        api.switch[i].isOn = isOn

                    }
                     break;
                 }
              }
             // return api.switch[i];
            },
            deleteSwitch: async (parent, {id,name,status,isOn,room}) => {
                const switch1 = new Switch(id,name, status, isOn, room)
                api.switch.push(switch1)
                return switch1;

        }
    }
};


const server = new ApolloServer({ typeDefs, resolvers });

//socket.io
const io = require('socket.io')(2000)

class Switch {
    constructor(id, name,isOn, status,room) {
        this.id = id
        this.name = name
        this.isOn = isOn
        this.status = status
        this.room = room
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
    socket.on('check-id', ( {id,type} ) => {

        devicesId[socket.id] = id
        console.log(`${id}`);
        if(type === 'thermometer'){
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
        }
        if(type === 'switch'){
            const result = api.switch.find(obj => {
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

    socket.on('old-switch', ( id ) => { 
        console.log(`urządzenie o podanym id już istnieje`);
        for (var i in api.switch){
            if (api.switch[i].id == id){
                 api.switch[i].status = true
                 break;
             }
          }
        })
        socket.on('add-switch', ({ id, value }) => {
            
                const switch1 = new Switch(id,'Null', value, true, 'brak')
                api.switch.push(switch1)
                console.log(`${value}`);
        })
        socket.on('send-switch-value', ({id, value}) => {
            for (var i in api.switch){
                if (api.switch[i].id == id){
                    api.switch[i].isOn = value
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
        for (var i in api.switch){
            if (api.switch[i].id == devicesId[socket.id]){
                api.switch[i].status = false
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

