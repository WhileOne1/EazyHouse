const { ApolloServer } = require('apollo-server');

const api = require('./server/api');

const typeDefs = require('./server/schema');

const resolvers = {
    Query: {
        books: () => api.books,
        authors: () => api.authors
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const io = require('socket.io')(2000)

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnected', users[socket.id])
        delete users[socket.id]
    })
})
server.listen().then(({ url }) => {
    console.log(`server listen at ${url}`);
});

