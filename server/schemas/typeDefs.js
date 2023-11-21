const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Type {
    id: ID!
    name: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    role: String!
    dogs: [PetProfile]
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

  type PetProfile {
    id: ID!
    petName: String!  
    petBreed: String!  
    petAge: Int!  
    petSize: String!  
    petGender: String!
    petDescription: String
    petImage: String
    owner: User! 
  }

  type Query {
    walkers: [Walker]
    users: [User]
    user(username: String!): User
    walker(username: String!): Walker
    getPetProfile(petId: ID!): PetProfile  # Add a query for fetching a single pet profile
    getPetProfiles: [PetProfile]  # Add a query for fetching all pet profiles
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, role: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addComment(text: String!): Comment
    removeComment(id: ID!): Comment
    removeUser(id: ID!): User

    addPetProfile(
      name: String!
      breed: String!
      age: Int!
      size: String!
    ): PetProfile  
  }
`;

module.exports = typeDefs;