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
      type switch {
         id: ID!
         name: String 
         status: Boolean!
         isOn: Boolean!
         room: String
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
        switches: [switch!]!,
        
     }
     type Mutation {
        createDevice(device_id: ID!, name: String!, status: Boolean!): device,
        createSwitch(id: ID!,name: String,status: Boolean!,isOn: Boolean!,room: String): switch,
        editSwitch(id: ID,name: String,room: String): switch,
        deleteSwitch(id: ID!,name: String,status: Boolean!,isOn: Boolean!,room: String): switch,
        editSwitchValue(id: ID!,isOn: Boolean!): switch,
     }
`;

module.exports = typeDefs;
