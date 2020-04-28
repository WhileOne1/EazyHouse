const { ApolloServer } = require('apollo-server');

const api = require('./server/api');

const typeDefs = require('./server/schema');

const resolvers = {
    Query: {
        devices: () => api.device
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const io = require('socket.io')(2000)

class Device {
    constructor(id, name, isActive) {
        this.id = id
        this.name = name
        this.isActive = isActive
    }
}
const devicesId = {}

io.on('connection', socket => {
    socket.on('check-id', ( id ) => {
        devicesId[socket.id] = id
        if(typeof api.device[id] === 'undefined') {
            socket.emit('new-id', id)
        }
        else
        {
            socket.emit('old-id', id)
        }
    })
    socket.on('new-device', ({ id, name }) => {
        
        
            const device = new Device(id, name, true)
            api.device[id] = device
            console.log(`${api.device[id]}`);
    })
    socket.on('old-device', ( id ) => {
        
            console.log(`urządzenie o podanym id już istnieje`);
            api.device[id].isActive = true

    })
    socket.on('disconnect', () => {
        api.device[devicesId[socket.id]].isActive = false
    })
})
console.log(`${api.device[0].name}`);

server.listen().then(({ url }) => {
    console.log(`server listen at ${url}`);
    
});

