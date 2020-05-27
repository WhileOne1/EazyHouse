const { gql } = require('apollo-server');

const typeDefs = gql`
     type device {
        device_id: ID!
        name: String!
        status: Boolean!
     }
     input DeviceInput {
      id: ID!
      name: String!
      isActive: Boolean!
     }
      type light {
      id: ID!
      name: String!
      isActive: Boolean!
      isOn: Boolean!
      }
      type thermometer {
         thermometer_id: ID!
         name: String
         value: Int!
         room: String
         status: Boolean!
      }
     type Query {
        devices: [device!]!,
        lights: [light!]!,
        thermometers: [thermometer!]!,
        
     }
     type Mutation {
        createDevice(device_id: ID!, name: String!, status: Boolean!): device,
     }
`;

module.exports = typeDefs;
