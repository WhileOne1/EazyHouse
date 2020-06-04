const { gql } = require('apollo-server');

const typeDefs = gql`
     interface Devices {
        id: ID!
        name: String!
        room: String!
     }
      type light {
      id: ID!
      name: String!
      isActive: Boolean!
      isOn: Boolean!
      }
      type switch implements Devices  {
         id: ID!
         name: String! 
         status: Boolean!
         isOn: Boolean!
         room: String!
         }
      type rgb implements Devices  {
         id: ID!
         name: String! 
         status: Boolean!
         isOn: Boolean!
         room: String!
         color: String
         }
      type thermometer implements Devices {
         id: ID!
         name: String!
         value: Int!
         room: String!
         status: Boolean!
      }
      type fridge implements Devices {
         id: ID!
         name: String!
         value: Int!
         room: String!
         status: Boolean!
      }
     type Query {
        devices: [Devices!]!,
        lights: [light!]!,
        thermometers: [thermometer!]!,
        switches: [switch!]!,
        rgbs: [rgb!]!,
        fridges: [fridge!]!,

        
     }
     type Mutation {
        
        createSwitch(id: ID!,name: String,status: Boolean!,isOn: Boolean!,room: String): switch,
        editSwitch(id: ID,name: String): switch,
        createRgb(id: ID!,name: String,status: Boolean!,isOn: Boolean!,room: String,color: String): rgb,
        editRgb(id: ID,name: String): rgb,
        editThermometer(id: ID,name: String): thermometer,
        editFridge(id: ID,name: String): fridge,
        deleteSwitch(id: ID!,name: String,status: Boolean!,isOn: Boolean!,room: String): switch,
     }
`;

module.exports = typeDefs;
