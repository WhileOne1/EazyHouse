const { gql } = require('apollo-server');

const typeDefs = gql`
     type device {
        id: ID!
        name: String!
        isActive: Boolean!
     }
     type Query {
        devices: [device],
     }
`;

module.exports = typeDefs;
