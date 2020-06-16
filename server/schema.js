const { gql } = require('apollo-server');

const typeDefs = gql`
     type Device {
         id: ID!
        deviceid: Int!
        name: String!
        room: String!
        status: Boolean!
     }
      type User {
      id: ID!
      username: String!
      email: Boolean!
      deviceid: Int!
      }
      type switch   {
         id: ID!
         isOn: Boolean!
         deviceid: Int!
         device: Device
         }
      type thermometer  {
         id: ID!
         value: Int!
         deviceid: Int!
         device: Device
         valueType: String!
      }
      type fridge  {
         id: ID!
         value: Int!
         deviceid: Int!
         device: Device
         valueType: String!
      }
      type switchwithvalue  {
         id: ID!
         value: Int!
         deviceid: Int!
         device: Device
         valueType: String!
         isOn: Boolean!
      }
      type Error {
         path: String!
         message: String
      }
      type RegisterResponse {
         ok: Boolean!
         user: User
         errors: [Error!]
      }
     type Query {
        devices: [Device!]!,
        devicesbyroom(room: String! ): [Device!]!,
        thermometers: [thermometer!]!,
        switches: [switch!]!,
        fridges: [fridge!]!,
        thermometersbyroom(room: String! ): [thermometer!]!,
        switchesbyroom(room: String! ): [switch!]!,
        fridgesbyroom(room: String! ): [fridge!]!,
        distinctRoom: [Device!]!,
        switchesWithValues: [switchwithvalue!]!
        switchesWithValuesbyroom(room: String! ): [thermometer!]!,

        
     }
     type LoginResponse {
        ok: Boolean!
        token: String
        refreshToken: String
        errors: [Error!]
     }
     type Mutation {
         createDevice(deviceid: Int!): Device,
         deleteDevice(deviceid: Int!): Device,
         editDevice(deviceid: Int!,name: String!): Device,
         editDeviceRoom(deviceid: Int!,room: String!): Device,

         register(username: String!, email: String!, password: String!): RegisterResponse!
         login(email: String!, password: String!): LoginResponse!
     }
`;

module.exports = typeDefs;
/* createSwitch(id: ID!,name: String,status: Boolean!,isOn: Boolean!,room: String,deviceid: Int!): switch,
createThermometer(id: ID,name: String,status: Boolean,value: Int!,room: String,deviceid: Int!): thermometer,

editSwitch(deviceid: Int!,name: String!): switch,
editThermometer(deviceid: Int!,name: String!): thermometer,
editFridge(deviceid: Int!,name: String!): fridge,

editSwitchRoom(deviceid: Int!,room: String!): switch,
editThermometerRoom(deviceid: Int!,room: String!): thermometer,
editFridgeRoom(deviceid: Int!,room: String!): fridge,

deleteSwitch(id: ID!,name: String,status: Boolean!,isOn: Boolean!,room: String): switch,
register(username: String!, email: String!, password: String!): User!
login(email: String!, password: String!): String! */