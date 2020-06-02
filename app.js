const { ApolloServer,makeExecutableSchema  } = require('apollo-server');
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
    Devices: {
        __resolveType(devices, context, info){
            if(devices.switch){
              return 'switch';
            }
      
            if(devices.thermometer){
              return 'thermometer';
            }
      
            return null;
          },

    },
    
    Query: {
        //devices: () => knex("devices").select("*"),
        devices: () => api.thermometer,
        lights: () => api.light,
        //thermometers: () => knex("thermometer").select("*"),
        thermometers: () => api.thermometer,
        switches: () => api.switch,
        fridges: () => api.fridge,
        
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
        editSwitch: async (parent, {id,name}) => {
                for (var i in api.switch){
                    if (api.switch[i].id == id){
                        if(api.switch[i].name !== 'undefined'){
                            api.switch[i].name = name
                        }
                         break;
                     }
                  }
                  return api.switch[i];

        },
        editThermometer: async (parent, {id,name}) => {
            for (var i in api.thermometer){
                if (api.thermometer[i].id == id){
                    if(api.thermometer[i].name !== 'undefined'){
                        api.thermometer[i].name = name
                    }
                     break;
                 }
              }
              return api.switch[i];

        },
        editFridge: async (parent, {id,name}) => {
            for (var i in api.fridge){
                if (api.fridge[i].id == id){
                    if(api.fridge[i].name !== 'undefined'){
                        api.fridge[i].name = name
                    }
                     break;
                 }
              }
              return api.switch[i];

        },
        
        deleteSwitch: async (parent, {id,name,status,isOn,room}) => {
                const switch1 = new Switch(id,name, status, isOn, room)
                api.switch.push(switch1)
                return switch1;

        }
    }
};
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    inheritResolversFromInterfaces: true
  });


const server = new ApolloServer({ schema });

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
class Fridge {
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
        if(type === 'fridge'){
            const result = api.fridge.find(obj => {
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
    socket.on('test', () => {            
         console.log(`działa`);
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
        
            const thermometer = new Thermometer(id,'Nowe Urządzenie', value, true, 'nie przypisano')
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
            
                const switch1 = new Switch(id,'Nowe Urządzenie', value, true, 'nie przypisano')
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
        socket.on('change-switch-value', ({id1, isOn}) => {
            console.log(`${id1}`);
            socket.broadcast.emit('value',{id1,isOn})
        })

        socket.on('old-fridge', ( id ) => { 
            console.log(`urządzenie o podanym id już istnieje`);
            for (var i in api.fridge){
                if (api.fridge[i].id == id){
                     api.fridge[i].status = true
                     break;
                 }
              }
            })
            socket.on('add-fridge', ({ id, value }) => {
                
                    const fridge = new Fridge(id,'Nowe Urządzenie', value, true, 'nie przypisano')
                    api.fridge.push(fridge)
                    console.log(`${value}`);
            })
            socket.on('send-fridge-value', ({id, value}) => {
                for (var i in api.fridge){
                    if (api.fridge[i].id == id){
                        api.fridge[i].value = value
                        break;
                    }
                }
            })
            socket.on('change-fridge-value', ({id1, value}) => {
                console.log(`${value}`);
                socket.broadcast.emit('fridge-value',{id1,value})
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
        for (var i in api.fridge){
            if (api.fridge[i].id == devicesId[socket.id]){
                api.fridge[i].status = false
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

