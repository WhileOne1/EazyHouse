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


io.on('connection', socket => {
    socket.on('new-device', ({ id, name }) => {
        const device = new Device(id, name, true)
        api.device[socket.id] = device
    })
    socket.on('disconnect', () => {
        api.device[socket.id].isActive = false
    })
})
server.listen().then(({ url }) => {
    console.log(`server listen at ${url}`);
});

