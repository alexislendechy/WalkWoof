const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Type {
    id: ID!
    name: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: String!
    address: String!
  }

  type Walker {
    id: ID!
    name: String!
    email: String!
    password: String!
    location: String!
  }

  type Admin {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    walker: Walker!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    walkers: [Walker]
    users: [User]
    user(username: String!): User
    walker(username: String!): Walker
  }
  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      role: String!
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addComment(text: String!): Comment
    removeComment(id: ID!): Comment
    removeUser(id: ID!): User
  }
`;

module.exports = typeDefs;
