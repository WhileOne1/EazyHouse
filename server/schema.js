const { gql } = require('apollo-server');

const typeDefs = gql`
     type book {
        title: String!
        genre: String!
        idAuthor: String!
     }
     type author{
        name: String!
        age: String!
        id : String!
     }
     type Query {
        books: [book],
        authors: [author],
     }
`;

module.exports = typeDefs;
